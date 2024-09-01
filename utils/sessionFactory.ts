import {
  Exercise,
  ExerciseInstance,
  Session,
} from "@/Interfaces/sessionInterfaces";
import {
  addExercise,
  addExerciseInstance,
  addSession,
  initDatabase,
} from "./database";

export const createTestData = async () => {
  await initDatabase();

  const exercises: Exercise[] = [
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

  // Add Exercises to the database
  const exerciseIds = [];
  for (const exercise of exercises) {
    const exerciseId = await addExercise(exercise);
    exerciseIds.push(exerciseId);
  }

  // Sample Exercise Instances
  const exerciseInstances: ExerciseInstance[] = exerciseIds.map((index) => ({
    exercise: {
      data: exercises[index],
    },
    sets: [
      { reps: 10, weight: 100, rest: 60 },
      { reps: 8, weight: 110, rest: 60 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  // Add Exercise Instances to the database
  const exerciseInstanceIds = [];
  for (let i = 0; i < exerciseInstances.length; i++) {
    const exerciseInstanceId = await addExerciseInstance(
      exerciseInstances[i],
      exerciseIds[i]
    );
    exerciseInstanceIds.push(exerciseInstanceId);
  }

  // Sample Sessions
  const sessions: Session[] = [
    {
      name: "Morning Workout",
      description: "Full body workout",
      date: new Date().toISOString(),
      isPreset: false,
      exercise_instances: {
        data: [exerciseInstances[0], exerciseInstances[1]],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Evening Workout",
      description: "Leg and back workout",
      date: new Date().toISOString(),
      isPreset: false,
      exercise_instances: {
        data: [exerciseInstances[2]],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Add Sessions to the database
  for (const session of sessions) {
    await addSession(session);
  }

  console.log("Test data created successfully.");
};
