import {
  Exercise,
  ExerciseInstance,
  Session,
  Set,
} from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";
import { addExercise, getAllExercises } from "./exercise";
import { addSession } from "./session";

export const createTestData = async (db: SQLiteDatabase) => {
  // Define the exercises for push, pull, and leg day
  const saveExercises: Exercise[] = [
    // Push Day Exercises
    {
      name: "Bench Press",
      description: "Chest exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Overhead Press",
      description: "Shoulder exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Dumbbell Flyes",
      description: "Chest isolation exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Triceps Pushdown",
      description: "Triceps exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Pull Day Exercises
    {
      name: "Deadlift",
      description: "Back exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Pull-Ups",
      description: "Back and biceps exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Barbell Rows",
      description: "Back and biceps exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Bicep Curls",
      description: "Biceps exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Leg Day Exercises
    {
      name: "Squat",
      description: "Leg exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Leg Press",
      description: "Leg exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Lunges",
      description: "Leg exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Leg Curls",
      description: "Hamstring exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Calf Raises",
      description: "Calf exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Save the exercises to the database
  for (const exercise of saveExercises) {
    await addExercise(db, exercise);
  }

  // Fetch all saved exercises from the database
  const exercises = await getAllExercises(db);

  // Create Exercise Instances for each session (Push, Pull, Legs)
  const exerciseInstances: ExerciseInstance[] = [];
  for (let i = 0; i < exercises.length; i++) {
    const exerciseInstance: ExerciseInstance = {
      exercise: exercises[i],
      sessionId: 0,
      sets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const sets: Set[] = [
      { reps: 12, weight: 50 + i * 5, rest: 90, exerciseInstanceId: null },
      { reps: 10, weight: 55 + i * 5, rest: 90, exerciseInstanceId: null },
      { reps: 8, weight: 60 + i * 5, rest: 90, exerciseInstanceId: null },
    ];

    exerciseInstances.push({
      ...exerciseInstance,
      sets,
    });
  }

  // Create realistic sessions: Push Day, Pull Day, Leg Day
  const sessions: Session[] = [
    {
      name: "Push Day",
      description: "Chest, shoulders, and triceps workout",
      date: new Date(),
      isPreset: true, // Set as a preset session
      isExample: true, // Set as an example session
      exercise_instances: [
        exerciseInstances[0], // Bench Press
        exerciseInstances[1], // Overhead Press
        exerciseInstances[2], // Dumbbell Flyes
        exerciseInstances[3], // Triceps Pushdown
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Pull Day",
      description: "Back and biceps workout",
      date: new Date(),
      isPreset: true, // Set as a preset session
      isExample: true, // Set as an example session
      exercise_instances: [
        exerciseInstances[4], // Deadlift
        exerciseInstances[5], // Pull-Ups
        exerciseInstances[6], // Barbell Rows
        exerciseInstances[7], // Bicep Curls
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Leg Day",
      description: "Full leg workout",
      date: new Date(),
      isPreset: true, // Set as a preset session
      isExample: true, // Set as an example session
      exercise_instances: [
        exerciseInstances[8], // Squat
        exerciseInstances[9], // Leg Press
        exerciseInstances[10], // Lunges
        exerciseInstances[11], // Leg Curls
        exerciseInstances[12], // Calf Raises
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Save the sessions to the database
  for (const session of sessions) {
    await addSession(db, session);
  }

  console.log("Preset test data created successfully.");
};
