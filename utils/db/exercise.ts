import { Exercise, Muscle } from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";
import { addMuscleToExercise } from "./muscles";

export async function addExercise(
  db: SQLiteDatabase,
  exercise: Exercise,
  primaryMuscles: number[], // Array of primary muscle IDs
  secondaryMuscles: number[] // Array of secondary muscle IDs
): Promise<number> {
  const statement = await db.prepareAsync(
    "INSERT INTO exercises (name, description, createdAt, updatedAt, cues, image) VALUES ($name, $description, $createdAt, $updatedAt, $cues, $image)"
  );

  try {
    // Insert the exercise into the exercises table
    const result = await statement.executeAsync({
      $name: exercise.name,
      $description: exercise.description,
      $cues: JSON.stringify(exercise.cues) || null,
      $image: exercise.image || null,
      $createdAt: exercise.createdAt.toISOString(),
      $updatedAt: exercise.updatedAt.toISOString(),
    });

    const exerciseId = result.lastInsertRowId;

    // Associate primary muscles with the exercise
    for (const muscleId of primaryMuscles) {
      await addMuscleToExercise(db, exerciseId, muscleId, true);
    }

    // Associate secondary muscles with the exercise
    for (const muscleId of secondaryMuscles) {
      await addMuscleToExercise(db, exerciseId, muscleId, false);
    }

    return exerciseId; // Return the exercise ID after insertion
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
): Promise<Exercise | null> {
  // Fetch the exercise with image and cues fields included
  const exercise = await db.getFirstAsync<Exercise>(
    "SELECT id, name, description, createdAt, updatedAt, image, cues FROM exercises WHERE id = $id",
    {
      $id: id,
    }
  );

  if (!exercise) return null;

  // Convert date fields
  exercise.createdAt = new Date(exercise.createdAt);
  exercise.updatedAt = new Date(exercise.updatedAt);

  // Parse the cues field from JSON
  if (exercise.cues) {
    exercise.cues = JSON.parse(exercise.cues as unknown as string);
  }

  // Fetch associated muscles
  const muscles: Muscle[] = await db.getAllAsync(
    `SELECT m.id, m.name, em.isPrimary
     FROM muscles m
     JOIN exercise_muscles em ON m.id = em.muscleId
     WHERE em.exerciseId = $exerciseId`,
    {
      $exerciseId: id,
    }
  );

  // Group muscles into primary and secondary categories
  const targetMuscles = {
    primary: muscles.filter((m: any) => m.isPrimary === 1),
    secondary: muscles.filter((m: any) => m.isPrimary === 0),
  };

  // Assign target muscles to the exercise
  exercise.targetMuscles = {
    primary: targetMuscles.primary,
    secondary: targetMuscles.secondary,
  };

  return exercise;
}

export async function getAllExercises(db: SQLiteDatabase): Promise<Exercise[]> {
  // Fetch all exercises
  const exercises = await db.getAllAsync<Exercise>("SELECT * FROM exercises");

  for (let i = 0; i < exercises.length; i++) {
    exercises[i].createdAt = new Date(exercises[i].createdAt);
    exercises[i].updatedAt = new Date(exercises[i].updatedAt);

    // Fetch associated muscles for each exercise
    const muscles: Muscle[] = await db.getAllAsync(
      `SELECT m.id, m.name, em.isPrimary
       FROM muscles m
       JOIN exercise_muscles em ON m.id = em.muscleId
       WHERE em.exerciseId = $exerciseId`,
      {
        $exerciseId: exercises[i].id!,
      }
    );

    exercises[i].cues = JSON.parse(exercises[i].cues as unknown as string);

    // Group muscles into primary and secondary categories
    const targetMuscles = {
      primary: muscles.filter((m: any) => m.isPrimary === 1),
      secondary: muscles.filter((m: any) => m.isPrimary === 0),
    };

    // Assign target muscles to the exercise
    exercises[i].targetMuscles = {
      primary: targetMuscles.primary,
      secondary: targetMuscles.secondary,
    };
  }

  return exercises;
}
