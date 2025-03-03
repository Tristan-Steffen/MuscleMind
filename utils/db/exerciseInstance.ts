import { Exercise, ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";
import { Set } from "@/Interfaces/sessionInterfaces";
import { getExerciseById } from "./exercise";
import { updateSet, addSet, deleteSet } from "./set";

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
      $sessionId: exerciseInstance.sessionId!,
      $createdAt: Date.now().toString(),
      $updatedAt: Date.now().toString(),
    });

    exerciseInstance.id = result.lastInsertRowId;
    await updateSetsForExerciseInstance(db, exerciseInstance);
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
      $createdAt: exerciseInstance.createdAt!.toISOString(),
      $updatedAt: Date.now().toString(),
      $id: exerciseInstance.id,
      $sessionId: sessionId,
      $exerciseId: exerciseId,
    });
  } finally {
    await statement.finalizeAsync();
  }
  updateSetsForExerciseInstance(db, exerciseInstance);
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
    exerciseInstance.createdAt = new Date(exerciseInstance.createdAt);
    exerciseInstance.updatedAt = new Date(exerciseInstance.updatedAt);
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

export async function getAllExerciseInstances(
  db: SQLiteDatabase
): Promise<ExerciseInstance[]> {
  const instaces = await db.getAllSync<ExerciseInstance>(
    "SELECT * FROM exerciseInstances"
  );

  for (let i = 0; i < instaces.length; i++) {
    instaces[i].createdAt = new Date(instaces[i].createdAt);
    instaces[i].updatedAt = new Date(instaces[i].updatedAt);
  }
  return instaces;
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

async function updateSetsForExerciseInstance(
  db: SQLiteDatabase,
  exerciseInstance: ExerciseInstance
): Promise<void> {
  const existingSets: Set[] = await getSetsForExerciseInstance(
    db,
    exerciseInstance.id!
  );

  // Delete sets that are no longer in the exercise instance
  for (const set of existingSets) {
    if (!exerciseInstance.sets.some((s) => s.id === set.id)) {
      await deleteSet(db, set.id!);
    }
  }

  for (const set of exerciseInstance.sets) {
    if (set.id) {
      await updateSet(db, set);
    } else {
      set.exerciseInstanceId = exerciseInstance.id!;
      await addSet(db, set);
    }
  }
}
