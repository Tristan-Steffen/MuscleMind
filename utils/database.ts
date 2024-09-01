import {
  Exercise,
  ExerciseInstance,
  Session,
} from "@/Interfaces/sessionInterfaces";
import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("fitness.db");

export const initDatabase = async () => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reps INTEGER NOT NULL,
      weight REAL NOT NULL,
      rest INTEGER
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS exerciseInstances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exerciseId INTEGER,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY(exerciseId) REFERENCES exercises(id)
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      isPreset INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS sessionExerciseInstances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sessionId INTEGER,
      exerciseInstanceId INTEGER,
      FOREIGN KEY(sessionId) REFERENCES sessions(id),
      FOREIGN KEY(exerciseInstanceId) REFERENCES exerciseInstances(id)
    );`
  );
};

export async function addExercise(exercise: Exercise): Promise<number> {
  const result = await db.runAsync(
    `INSERT INTO exercises (name, description, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?)`,
    exercise.name,
    exercise.description,
    exercise.createdAt.toISOString(),
    exercise.updatedAt.toISOString()
  );
  return result.lastInsertRowId;
}

export async function updateExercise(exercise: Exercise): Promise<void> {
  if (!exercise.id) throw new Error("Exercise ID is required");

  await db.runAsync(
    `UPDATE exercises 
         SET name = ?, description = ?, createdAt = ?, updatedAt = ? 
         WHERE id = ?`,
    exercise.name,
    exercise.description,
    exercise.createdAt.toISOString(),
    exercise.updatedAt.toISOString(),
    exercise.id
  );
}

export async function deleteExercise(exerciseId: number): Promise<void> {
  await db.runAsync(
    `DELETE FROM exercises 
         WHERE id = ?`,
    exerciseId
  );
}

export async function addExerciseInstance(
  exerciseInstance: ExerciseInstance,
  exerciseId: number
): Promise<number> {
  const result = await db.runAsync(
    `INSERT INTO exerciseInstances (exerciseId, createdAt, updatedAt) 
         VALUES (?, ?, ?)`,
    exerciseId,
    exerciseInstance.createdAt.toISOString(),
    exerciseInstance.updatedAt.toISOString()
  );

  const exerciseInstanceId = result.lastInsertRowId;

  for (const set of exerciseInstance.sets) {
    await db.runAsync(
      `INSERT INTO sets (reps, weight, rest, exerciseInstanceId) 
           VALUES (?, ?, ?, ?)`,
      set.reps,
      set.weight,
      set.rest,
      exerciseInstanceId
    );
  }

  return exerciseInstanceId;
}

export async function updateExerciseInstance(
  exerciseInstance: ExerciseInstance
): Promise<void> {
  if (!exerciseInstance.id) throw new Error("ExerciseInstance ID is required");

  await db.runAsync(
    `UPDATE exerciseInstances 
         SET createdAt = ?, updatedAt = ? 
         WHERE id = ?`,
    exerciseInstance.createdAt.toISOString(),
    exerciseInstance.updatedAt.toISOString(),
    exerciseInstance.id
  );

  await db.runAsync(
    `DELETE FROM sets WHERE exerciseInstanceId = ?`,
    exerciseInstance.id
  );

  for (const set of exerciseInstance.sets) {
    await db.runAsync(
      `INSERT INTO sets (reps, weight, rest, exerciseInstanceId) 
           VALUES (?, ?, ?, ?)`,
      set.reps,
      set.weight,
      set.rest,
      exerciseInstance.id
    );
  }
}

export async function deleteExerciseInstance(
  exerciseInstanceId: number
): Promise<void> {
  await db.runAsync(
    `DELETE FROM sets WHERE exerciseInstanceId = ?`,
    exerciseInstanceId
  );
  await db.runAsync(
    `DELETE FROM exerciseInstances WHERE id = ?`,
    exerciseInstanceId
  );
}

export async function addSession(session: Session): Promise<number> {
  const result = await db.runAsync(
    `INSERT INTO sessions (name, description, date, isPreset, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?)`,
    session.name,
    session.description,
    session.date,
    session.isPreset ? 1 : 0,
    session.createdAt.toISOString(),
    session.updatedAt.toISOString()
  );

  const sessionId = result.lastInsertRowId;

  for (const exerciseInstance of session.exercise_instances.data) {
    const exerciseInstanceId = await addExerciseInstance(
      exerciseInstance,
      sessionId
    );
    await db.runAsync(
      `INSERT INTO sessionExerciseInstances (sessionId, exerciseInstanceId) 
           VALUES (?, ?)`,
      sessionId,
      exerciseInstanceId
    );
  }

  return sessionId;
}

export async function updateSession(session: Session): Promise<void> {
  if (!session.id) throw new Error("Session ID is required");

  await db.runAsync(
    `UPDATE sessions 
         SET name = ?, description = ?, date = ?, isPreset = ?, createdAt = ?, updatedAt = ? 
         WHERE id = ?`,
    session.name,
    session.description,
    session.date,
    session.isPreset ? 1 : 0,
    session.createdAt.toISOString(),
    session.updatedAt.toISOString(),
    session.id
  );

  await db.runAsync(
    `DELETE FROM sessionExerciseInstances WHERE sessionId = ?`,
    session.id
  );

  for (const exerciseInstance of session.exercise_instances.data) {
    const exerciseInstanceId = await addExerciseInstance(
      exerciseInstance,
      session.id
    );
    await db.runAsync(
      `INSERT INTO sessionExerciseInstances (sessionId, exerciseInstanceId) 
           VALUES (?, ?)`,
      session.id,
      exerciseInstanceId
    );
  }
}

export async function deleteSession(sessionId: number): Promise<void> {
  const exerciseInstances: { exerciseInstanceId: number }[] =
    await db.getAllAsync(
      `SELECT exerciseInstanceId FROM sessionExerciseInstances WHERE sessionId = ?`,
      sessionId
    );

  for (const instance of exerciseInstances) {
    await deleteExerciseInstance(instance.exerciseInstanceId);
  }

  await db.runAsync(`DELETE FROM sessions WHERE id = ?`, sessionId);
}
