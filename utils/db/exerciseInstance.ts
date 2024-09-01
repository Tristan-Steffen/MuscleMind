import { Exercise, ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";

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

export async function getExercise(
  db: SQLiteDatabase
): Promise<ExerciseInstance | undefined> {
  const result = await db.getAllSync<ExerciseInstance>(
    "SELECT * FROM exerciseInstances"
  );

  return result[0];
}
