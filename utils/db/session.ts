import { Session } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite/build/SQLiteDatabase";

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
