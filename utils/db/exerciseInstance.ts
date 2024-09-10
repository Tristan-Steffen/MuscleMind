import { Exercise, ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";
import { Set } from "@/Interfaces/sessionInterfaces";
import { getExerciseById } from "./exercise";

export async function addExerciseInstance(
  db: SQLiteDatabase,
  exerciseInstance: ExerciseInstance
): Promise<number> {
  const statement = await db.prepareAsync(
    "INSERT INTO exerciseInstances (exerciseId, createdAt, updatedAt, sessionId) VALUES ($exerciseId, $createdAt, $updatedAt, $sessionId)"
  );

  try {
    const result = await statement.executeAsync({
      $exerciseId: exerciseInstance.exercise.id!,
      $sessionId: exerciseInstance.sessionId,
      $createdAt: exerciseInstance.createdAt.toISOString(),
      $updatedAt: exerciseInstance.updatedAt.toISOString(),
    });

    return result.lastInsertRowId;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add exercise instance");
  } finally {
    await statement.finalizeAsync();
  }
}

export async function updateExerciseInstance(
  db: SQLiteDatabase,
  exerciseInstance: ExerciseInstance,
  sessionId: number,
  exerciseId: number
): Promise<void> {
  if (!exerciseInstance.id) throw new Error("ExerciseInstance ID is required");

  const statement = await db.prepareAsync(
    "UPDATE exerciseInstances SET createdAt = $createdAt, updatedAt = $updatedAt, sessionId = $sessionId, exerciseId = $exerciseId WHERE id = $id"
  );

  try {
    await statement.executeAsync({
      $createdAt: exerciseInstance.createdAt.toISOString(),
      $updatedAt: exerciseInstance.updatedAt.toISOString(),
      $id: exerciseInstance.id,
      $sessionId: sessionId,
      $exerciseId: exerciseId,
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

export async function getExerciseInstancesForSession(
  db: SQLiteDatabase,
  sessionId: number
): Promise<ExerciseInstance[]> {
  const exerciseInstances = await db.getAllAsync<ExerciseInstance>(
    "SELECT * FROM exerciseInstances WHERE sessionId = $sessionId",
    {
      $sessionId: sessionId,
    }
  );

  for (const exerciseInstance of exerciseInstances) {
    exerciseInstance.sets = await getSetsForExerciseInstance(
      db,
      exerciseInstance.id!
    );
    const exercise = await getExerciseById(db, exerciseInstance.exerciseId!);
    if (exercise) {
      exerciseInstance.exercise = exercise;
    } else {
      throw new Error("Exercise not found");
    }
  }

  return exerciseInstances;
}

async function getSetsForExerciseInstance(
  db: SQLiteDatabase,
  exerciseInstanceId: number
): Promise<Set[]> {
  return await db.getAllSync<Set>(
    "SELECT * FROM sets WHERE exerciseInstanceId = $exerciseInstanceId",
    {
      $exerciseInstanceId: exerciseInstanceId,
    }
  );
}

export async function getAllExerciseInstances(
  db: SQLiteDatabase
): Promise<ExerciseInstance[]> {
  return await db.getAllSync<ExerciseInstance>(
    "SELECT * FROM exerciseInstances"
  );
}
