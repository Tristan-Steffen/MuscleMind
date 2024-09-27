import {
  deleteExerciseInstance,
  getExerciseInstancesForSession,
  updateExerciseInstance,
} from "./exerciseInstance";
import { ExerciseInstance, Session } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";
import { addExerciseInstance } from "./exerciseInstance";
import { addSet, deleteSet } from "./set";

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
      $date: session.date.toISOString(),
      $isPreset: session.isPreset ? 1 : 0,
      $createdAt: session.createdAt.toISOString(),
      $updatedAt: session.updatedAt.toISOString(),
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
    "UPDATE sessions SET name = $name, description = $description, date = $date, isPreset = $isPreset, createdAt = $createdAt, updatedAt = $updatedAt WHERE id = $id"
  );

  try {
    await statement.executeAsync({
      $name: session.name,
      $description: session.description,
      $date: session.date.toISOString(),
      $isPreset: session.isPreset ? 1 : 0,
      $createdAt: session.createdAt.toISOString(),
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

export async function getAllPopulatedSessions(
  db: SQLiteDatabase
): Promise<Session[]> {
  const sessions = await db.getAllAsync<Session>("SELECT * FROM sessions");

  for (let i = 0; i < sessions.length; i++) {
    // Convert string dates to Date objects
    sessions[i].date = new Date(sessions[i].date);
    sessions[i].createdAt = new Date(sessions[i].createdAt);
    sessions[i].updatedAt = new Date(sessions[i].updatedAt);

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
  const result = await db.getAllSync<Session>(
    "SELECT * FROM sessions WHERE id = $id",
    {
      $id: sessionId,
    }
  );

  if (result.length > 0) {
    const session = result[0];

    // Convert string dates to Date objects
    session.date = new Date(session.date);
    session.createdAt = new Date(session.createdAt);
    session.updatedAt = new Date(session.updatedAt);

    session.exercise_instances = await getExerciseInstancesForSession(
      db,
      session.id!
    );

    return session;
  }

  return undefined;
}
