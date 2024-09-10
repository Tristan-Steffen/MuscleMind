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
  // Define the exercises
  const saveExercises: Exercise[] = [
    {
      name: "Squat",
      description: "Leg exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Bench Press",
      description: "Chest exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Deadlift",
      description: "Back exercise",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const exercise of saveExercises) {
    await addExercise(db, exercise);
  }

  // I need to create the exercises first before creating the exercise instances in order for the foreign key constraint to work
  const exercises = await getAllExercises(db);

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
      { reps: 10, weight: 100, rest: 60, exerciseInstanceId: null },
      { reps: 8, weight: 110, rest: 60, exerciseInstanceId: null },
    ];

    exerciseInstances.push({
      ...exerciseInstance,
      sets,
    });
  }

  const sessions: Session[] = [
    {
      name: "Morning Workout",
      description: "Full body workout",
      date: new Date(),
      isPreset: false,
      exercise_instances: [exerciseInstances[0], exerciseInstances[1]],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Evening Workout",
      description: "Leg and back workout",
      date: new Date(),
      isPreset: false,
      exercise_instances: [exerciseInstances[2]],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const session of sessions) {
    await addSession(db, session);
  }

  console.log("Test data created successfully.");
};
