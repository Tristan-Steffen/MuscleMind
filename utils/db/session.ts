import {
  deleteExerciseInstance,
  getExerciseInstancesForSession,
  updateExerciseInstance,
} from "./exerciseInstance";
import { ExerciseInstance, Session } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";
import { addExerciseInstance } from "./exerciseInstance";

export async function addSession(
  db: SQLiteDatabase,
  session: Session
): Promise<number> {
  const statement = await db.prepareAsync(
    "INSERT INTO sessions (name, description, date, isPreset, isExample, createdAt, updatedAt) VALUES ($name, $description, $date, $isPreset, $isExample, $createdAt, $updatedAt)"
  );

  try {
    const result = await statement.executeAsync({
      $name: session.name,
      $description: session.description,
      $date: session.date.toISOString(),
      $isPreset: session.isPreset ? 1 : 0,
      $isExample: session.isExample ? 1 : 0,
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
    });

    const sessionId = result.lastInsertRowId;

    for (const exerciseInstance of session.exercise_instances) {
      exerciseInstance.sessionId = sessionId;
      await addExerciseInstance(db, exerciseInstance);
    }

    return sessionId;
  } finally {
    await statement.finalizeAsync();
  }
}

export async function updateSession(
  db: SQLiteDatabase,
  oldSession: Session,
  session: Session
): Promise<void> {
  if (!session.id) throw new Error("Session ID is required");

  const statement = await db.prepareAsync(
    "UPDATE sessions SET name = $name, description = $description, date = $date, isPreset = $isPreset, isExample = $isExample, createdAt = $createdAt, updatedAt = $updatedAt WHERE id = $id"
  );

  try {
    await statement.executeAsync({
      $name: session.name,
      $description: session.description,
      $date: session.date.toISOString(),
      $isPreset: session.isPreset ? 1 : 0,
      $isExample: session.isExample ? 1 : 0,
      $createdAt: session.createdAt!.toISOString(),
      $updatedAt: Date.now().toString(),
      $id: session.id,
    });
  } finally {
    await statement.finalizeAsync();
  }

  // Create a map of old exercise instances for easier comparison, converting IDs to strings
  const oldExerciseInstanceMap = new Map<string, ExerciseInstance>(
    oldSession.exercise_instances.map((ei) => [String(ei.id!), ei])
  );

  // Track IDs of the exercise instances in the new session, also converting to strings
  const newExerciseInstanceIds = new Set<string>(
    session.exercise_instances.map((ei) => String(ei.id!))
  );

  // Delete exercise instances not present in the new session
  for (const [id, oldExerciseInstance] of oldExerciseInstanceMap) {
    if (!newExerciseInstanceIds.has(id)) {
      await deleteExerciseInstance(db, Number(id)); // This deletes the exercise instance and its associated sets
    }
  }

  // Update or add exercise instances in the new session
  for (const exerciseInstance of session.exercise_instances) {
    if (exerciseInstance.id) {
      await updateExerciseInstance(
        db,
        exerciseInstance,
        session.id,
        exerciseInstance.exercise.id!
      );
    } else {
      exerciseInstance.sessionId = session.id;
      await addExerciseInstance(db, exerciseInstance);
    }
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

export async function getAllSessions(db: SQLiteDatabase): Promise<Session[]> {
  const sessions = await db.getAllAsync<Session>("SELECT * FROM sessions");

  for (let i = 0; i < sessions.length; i++) {
    // Convert string dates to Date objects ints to booleans
    sessions[i].date = new Date(sessions[i].date);
    sessions[i].createdAt = sessions[i].createdAt;
    sessions[i].updatedAt = sessions[i].updatedAt;
    sessions[i].isPreset = Boolean(sessions[i].isPreset);
    sessions[i].isExample = Boolean(sessions[i].isExample);

    sessions[i].exercise_instances = await getExerciseInstancesForSession(
      db,
      sessions[i].id!
    );
  }

  return sessions;
}

export async function getSessionsForWeek(
  db: SQLiteDatabase,
  weekStart: Date,
  weekEnd: Date
): Promise<Session[]> {
  // Convert week boundaries to ISO strings.
  const startStr = weekStart.toISOString();
  const endStr = weekEnd.toISOString();

  const sessions = await db.getAllAsync<Session>(
    "SELECT * FROM sessions WHERE date >= $start AND date < $end AND isPreset = 0",
    { $start: startStr, $end: endStr }
  );

  for (let i = 0; i < sessions.length; i++) {
    sessions[i].date = new Date(sessions[i].date);
    sessions[i].createdAt = sessions[i].createdAt;
    sessions[i].updatedAt = sessions[i].updatedAt;
    sessions[i].isPreset = Boolean(sessions[i].isPreset);
    sessions[i].isExample = Boolean(sessions[i].isExample);

    sessions[i].exercise_instances = await getExerciseInstancesForSession(
      db,
      sessions[i].id!
    );
  }

  return sessions;
}


export async function getExamplePresetSessions(
  db: SQLiteDatabase
): Promise<Session[]> {
  const sessions = await db.getAllAsync<Session>(
    "SELECT * FROM sessions WHERE isExample = 1 AND isPreset = 1"
  );

  for (let i = 0; i < sessions.length; i++) {
    // Convert string dates to Date objects and ints to booleans
    sessions[i].date = new Date(sessions[i].date);
    sessions[i].createdAt = sessions[i].createdAt;
    sessions[i].updatedAt = sessions[i].updatedAt;
    sessions[i].isPreset = Boolean(sessions[i].isPreset);
    sessions[i].isExample = Boolean(sessions[i].isExample);

    sessions[i].exercise_instances = await getExerciseInstancesForSession(
      db,
      sessions[i].id!
    );
  }

  return sessions;
}

export async function getCustomPresetSessions(
  db: SQLiteDatabase
): Promise<Session[]> {
  const sessions = await db.getAllAsync<Session>(
    "SELECT * FROM sessions WHERE isExample = 0 AND isPreset = 1"
  );

  for (let i = 0; i < sessions.length; i++) {
    // Convert string dates to Date objects and ints to booleans
    sessions[i].date = new Date(sessions[i].date);
    sessions[i].createdAt = sessions[i].createdAt;
    sessions[i].updatedAt = sessions[i].updatedAt;
    sessions[i].isPreset = Boolean(sessions[i].isPreset);
    sessions[i].isExample = Boolean(sessions[i].isExample);

    sessions[i].exercise_instances = await getExerciseInstancesForSession(
      db,
      sessions[i].id!
    );
  }

  return sessions;
}

export async function getSession(
  db: SQLiteDatabase,
  sessionId: number
): Promise<Session | undefined> {
  const result = await db.getAllAsync<Session>(
    "SELECT * FROM sessions WHERE id = $id",
    {
      $id: sessionId,
    }
  );

  if (result.length > 0) {
    const session = result[0];

    // Convert string dates to Date objects ints to booleans
    session.date = new Date(session.date);
    session.createdAt = session.createdAt;
    session.updatedAt = session.updatedAt;
    session.isPreset = Boolean(session.isPreset);
    session.isExample = Boolean(session.isExample);

    session.exercise_instances = await getExerciseInstancesForSession(
      db,
      session.id!
    );

    return session;
  }

  return undefined;
}
