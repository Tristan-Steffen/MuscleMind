import { Exercise } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";

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

export async function getExerciseById(
  db: SQLiteDatabase,
  id: number
): Promise<Exercise | undefined> {
  console.log("Getting exercise by id", id);
  const result = await db.getAllAsync<Exercise>(
    "SELECT * FROM exercises WHERE id = $id",
    {
      $id: id,
    }
  );

  return result[0]; // Return the exercise found, if any
}

export async function getAllExercises(db: SQLiteDatabase): Promise<Exercise[]> {
  return db.getAllSync<Exercise>("SELECT * FROM exercises");
}
