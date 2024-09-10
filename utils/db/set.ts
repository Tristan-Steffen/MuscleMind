import { Set } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";

// Add a new set to the database
export async function addSet(db: SQLiteDatabase, set: Set): Promise<number> {
  const statement = await db.prepareAsync(
    "INSERT INTO sets (reps, weight, rest, exerciseInstanceId) VALUES ($reps, $weight, $rest, $exerciseInstanceId)"
  );

  try {
    const result = await statement.executeAsync({
      $reps: set.reps,
      $weight: set.weight,
      $rest: set.rest,
      $exerciseInstanceId: set.exerciseInstanceId,
    });

    return result.lastInsertRowId;
  } finally {
    await statement.finalizeAsync();
  }
}

// Update an existing set in the database
export async function updateSet(db: SQLiteDatabase, set: Set): Promise<void> {
  if (!set.id) throw new Error("Set ID is required");

  const statement = await db.prepareAsync(
    "UPDATE sets SET reps = $reps, weight = $weight, rest = $rest, exerciseInstanceId = $exerciseInstanceId WHERE id = $id"
  );

  try {
    await statement.executeAsync({
      $reps: set.reps,
      $weight: set.weight,
      $rest: set.rest,
      $exerciseInstanceId: set.exerciseInstanceId,
      $id: set.id,
    });
  } finally {
    await statement.finalizeAsync();
  }
}

// Delete a set from the database
export async function deleteSet(
  db: SQLiteDatabase,
  setId: number
): Promise<void> {
  const statement = await db.prepareAsync("DELETE FROM sets WHERE id = $id");

  try {
    await statement.executeAsync({ $id: setId });
  } finally {
    await statement.finalizeAsync();
  }
}

// Get all sets for a specific exercise instance
export async function getSetsForExerciseInstance(
  db: SQLiteDatabase,
  exerciseInstanceId: number
): Promise<Set[]> {
  return db.getAllSync<Set>(
    "SELECT * FROM sets WHERE exerciseInstanceId = $exerciseInstanceId",
    {
      $exerciseInstanceId: exerciseInstanceId,
    }
  );
}

// Get a specific set by its ID
export async function getSet(
  db: SQLiteDatabase,
  setId: number
): Promise<Set | undefined> {
  const result = await db.getAllSync<Set>("SELECT * FROM sets WHERE id = $id", {
    $id: setId,
  });

  return result[0];
}

export async function getAllSets(db: SQLiteDatabase): Promise<Set[]> {
  return db.getAllSync<Set>("SELECT * FROM sets");
}
