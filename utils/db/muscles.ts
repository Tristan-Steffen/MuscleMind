import { SQLiteDatabase } from "expo-sqlite";

export async function createMuscle(
  db: SQLiteDatabase,
  muscle: { name: string }
): Promise<number> {
  const statement = await db.prepareAsync(
    "INSERT INTO muscles (name) VALUES ($name)"
  );

  try {
    const muscleId = await statement.executeAsync({
      $name: muscle.name,
    });

    return muscleId.lastInsertRowId;
  } finally {
    await statement.finalizeAsync();
  }
}

export async function updateMuscle(
  db: SQLiteDatabase,
  muscle: { id: number; name: string }
): Promise<void> {
  if (!muscle.id) throw new Error("Muscle ID is required");

  const statement = await db.prepareAsync(
    "UPDATE muscles SET name = $name WHERE id = $id"
  );

  try {
    await statement.executeAsync({
      $name: muscle.name,
      $id: muscle.id,
    });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function deleteMuscle(
  db: SQLiteDatabase,
  muscleId: number
): Promise<void> {
  if (!muscleId) throw new Error("Muscle ID is required");

  const statement = await db.prepareAsync("DELETE FROM muscles WHERE id = $id");

  try {
    await statement.executeAsync({
      $id: muscleId,
    });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function addMuscleToExercise(
  db: SQLiteDatabase,
  exerciseId: number,
  muscleId: number,
  isPrimary: boolean
): Promise<void> {
  const statement = await db.prepareAsync(
    "INSERT INTO exercise_muscles (exerciseId, muscleId, isPrimary) VALUES ($exerciseId, $muscleId, $isPrimary)"
  );

  try {
    await statement.executeAsync({
      $exerciseId: exerciseId,
      $muscleId: muscleId,
      $isPrimary: isPrimary ? 1 : 0,
    });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function updateMuscleForExercise(
  db: SQLiteDatabase,
  exerciseId: number,
  muscleId: number,
  isPrimary: boolean
): Promise<void> {
  const statement = await db.prepareAsync(
    "UPDATE exercise_muscles SET isPrimary = $isPrimary WHERE exerciseId = $exerciseId AND muscleId = $muscleId"
  );

  try {
    await statement.executeAsync({
      $isPrimary: isPrimary ? 1 : 0,
      $exerciseId: exerciseId,
      $muscleId: muscleId,
    });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function removeMuscleFromExercise(
  db: SQLiteDatabase,
  exerciseId: number,
  muscleId: number
): Promise<void> {
  const statement = await db.prepareAsync(
    "DELETE FROM exercise_muscles WHERE exerciseId = $exerciseId AND muscleId = $muscleId"
  );

  try {
    await statement.executeAsync({
      $exerciseId: exerciseId,
      $muscleId: muscleId,
    });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function deleteAllMusclesForExercise(
  db: SQLiteDatabase,
  exerciseId: number
): Promise<void> {
  const statement = await db.prepareAsync(
    "DELETE FROM exercise_muscles WHERE exerciseId = $exerciseId"
  );

  try {
    await statement.executeAsync({
      $exerciseId: exerciseId,
    });
  } finally {
    await statement.finalizeAsync();
  }
}
