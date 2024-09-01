import {
  Exercise,
  ExerciseInstance,
  Session,
  Set,
} from "@/Interfaces/sessionInterfaces";
import { type SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 1;

export async function initDatabase(db: SQLiteDatabase) {
  let user_version = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  if (user_version && user_version.user_version >= DATABASE_VERSION) {
    return; // Database is up-to-date
  }

  // Initial migration or any updates
  if (user_version && user_version.user_version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS sets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reps INTEGER NOT NULL,
        weight REAL NOT NULL,
        rest INTEGER
      );

      CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS exerciseInstances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exerciseId INTEGER,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY(exerciseId) REFERENCES exercises(id)
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        isPreset INTEGER NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sessionExerciseInstances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sessionId INTEGER,
        exerciseInstanceId INTEGER,
        FOREIGN KEY(sessionId) REFERENCES sessions(id),
        FOREIGN KEY(exerciseInstanceId) REFERENCES exerciseInstances(id)
      );
    `);
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function addExercise(
  db: SQLiteDatabase,
  exercise: Exercise
): Promise<number> {
  const statement = await db.prepareAsync(
    "INSERT INTO exercises (name, description, createdAt, updatedAt) VALUES ($name, $description, $createdAt, $updatedAt)"
  );

  try {
    const result = await statement.executeAsync({
      $name: exercise.name,
      $description: exercise.description,
      $createdAt: exercise.createdAt.toISOString(),
      $updatedAt: exercise.updatedAt.toISOString(),
    });
    return result.lastInsertRowId;
  } finally {
    await statement.finalizeAsync();
  }
}

export async function updateExercise(
  db: SQLiteDatabase,
  exercise: Exercise
): Promise<void> {
  if (!exercise.id) throw new Error("Exercise ID is required");

  const statement = await db.prepareAsync(
    "UPDATE exercises SET name = $name, description = $description, createdAt = $createdAt, updatedAt = $updatedAt WHERE id = $id"
  );

  try {
    await statement.executeAsync({
      $name: exercise.name,
      $description: exercise.description,
      $createdAt: exercise.createdAt.toISOString(),
      $updatedAt: exercise.updatedAt.toISOString(),
      $id: exercise.id,
    });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function deleteExercise(
  db: SQLiteDatabase,
  exerciseId: number
): Promise<void> {
  const statement = await db.prepareAsync(
    "DELETE FROM exercises WHERE id = $id"
  );

  try {
    await statement.executeAsync({ $id: exerciseId });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function addExerciseInstance(
  db: SQLiteDatabase,
  exerciseInstance: ExerciseInstance,
  exerciseId: number
): Promise<number> {
  const statement = await db.prepareAsync(
    "INSERT INTO exerciseInstances (exerciseId, createdAt, updatedAt) VALUES ($exerciseId, $createdAt, $updatedAt)"
  );

  try {
    const result = await statement.executeAsync({
      $exerciseId: exerciseId,
      $createdAt: exerciseInstance.createdAt.toISOString(),
      $updatedAt: exerciseInstance.updatedAt.toISOString(),
    });

    return result.lastInsertRowId;
  } finally {
    await statement.finalizeAsync();
  }
}

export async function updateExerciseInstance(
  db: SQLiteDatabase,
  exerciseInstance: ExerciseInstance
): Promise<void> {
  if (!exerciseInstance.id) throw new Error("ExerciseInstance ID is required");

  const statement = await db.prepareAsync(
    "UPDATE exerciseInstances SET createdAt = $createdAt, updatedAt = $updatedAt WHERE id = $id"
  );

  try {
    await statement.executeAsync({
      $createdAt: exerciseInstance.createdAt.toISOString(),
      $updatedAt: exerciseInstance.updatedAt.toISOString(),
      $id: exerciseInstance.id,
    });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function deleteExerciseInstance(
  db: SQLiteDatabase,
  exerciseInstanceId: number
): Promise<void> {
  const statement = await db.prepareAsync(
    "DELETE FROM exerciseInstances WHERE id = $id"
  );

  try {
    await statement.executeAsync({ $id: exerciseInstanceId });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function addSession(
  db: SQLiteDatabase,
  session: Session
): Promise<number> {
  const statement = await db.prepareAsync(
    "INSERT INTO sessions (name, description, date, isPreset, createdAt, updatedAt) VALUES ($name, $description, $date, $isPreset, $createdAt, $updatedAt)"
  );

  try {
    const result = await statement.executeAsync({
      $name: session.name,
      $description: session.description,
      $date: session.date,
      $isPreset: session.isPreset ? 1 : 0,
      $createdAt: session.createdAt.toISOString(),
      $updatedAt: session.updatedAt.toISOString(),
    });

    return result.lastInsertRowId;
  } finally {
    await statement.finalizeAsync();
  }
}

export async function updateSession(
  db: SQLiteDatabase,
  session: Session
): Promise<void> {
  if (!session.id) throw new Error("Session ID is required");

  const statement = await db.prepareAsync(
    "UPDATE sessions SET name = $name, description = $description, date = $date, isPreset = $isPreset, createdAt = $createdAt, updatedAt = $updatedAt WHERE id = $id"
  );

  try {
    await statement.executeAsync({
      $name: session.name,
      $description: session.description,
      $date: session.date,
      $isPreset: session.isPreset ? 1 : 0,
      $createdAt: session.createdAt.toISOString(),
      $updatedAt: session.updatedAt.toISOString(),
      $id: session.id,
    });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function deleteSession(
  db: SQLiteDatabase,
  sessionId: number
): Promise<void> {
  const statement = await db.prepareAsync(
    "DELETE FROM sessions WHERE id = $id"
  );

  try {
    await statement.executeAsync({ $id: sessionId });
  } finally {
    await statement.finalizeAsync();
  }
}
