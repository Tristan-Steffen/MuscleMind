import { getExerciseInstancesForSession } from "./exerciseInstance";
import { Session } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";
import { addExerciseInstance } from "./exerciseInstance";
import { addSet } from "./set";

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
      const exerciseInstanceId = await addExerciseInstance(
        db,
        exerciseInstance
      );

      for (const set of exerciseInstance.sets) {
        set.exerciseInstanceId = exerciseInstanceId;
        await addSet(db, set);
      }
    }

    return sessionId;
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
      $date: session.date.toISOString(),
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

export async function getAllPopulatedSessions(
  db: SQLiteDatabase
): Promise<Session[]> {
  const sessions = await db.getAllAsync<Session>("SELECT * FROM sessions");

  for (let i = 0; i < sessions.length; i++) {
    console.log("looping through sessions", i);
    sessions[i].exercise_instances = await getExerciseInstancesForSession(
      db,
      sessions[i].id!
    );
  }

  console.log("returning sessions", sessions);
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
    session.exercise_instances = await getExerciseInstancesForSession(
      db,
      session.id!
    );

    return session;
  }

  return undefined;
}
