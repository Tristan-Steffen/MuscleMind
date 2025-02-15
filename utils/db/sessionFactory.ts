import {
  Exercise,
  ExerciseInstance,
  Session,
  Set,
} from "@/Interfaces/sessionInterfaces";
import { SQLiteDatabase } from "expo-sqlite";
import { addExercise, getAllExercises } from "./exercise";
import { addSession } from "./session";
import { createMuscle } from "./muscles";

export const createTestData = async (db: SQLiteDatabase) => {
  // Define the muscles
  const muscles = {
    chest: await createMuscle(db, { name: "Chest" }),
    shoulders: await createMuscle(db, { name: "Shoulders" }),
    triceps: await createMuscle(db, { name: "Triceps" }),
    back: await createMuscle(db, { name: "Back" }),
    biceps: await createMuscle(db, { name: "Biceps" }),
    hamstrings: await createMuscle(db, { name: "Hamstrings" }),
    quads: await createMuscle(db, { name: "Quadriceps" }),
    calves: await createMuscle(db, { name: "Calves" }),
  };

  // Define the exercises and associate muscles at the same time
  const saveExercises = [
    {
      exercise: {
        name: "Bench Press",
        description: "Chest exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep your back flat on the bench",
          "Lower the bar slowly to your chest",
          "Push the bar up explosively",
        ],
      },
      primaryMuscles: [muscles.chest],
      secondaryMuscles: [muscles.triceps, muscles.shoulders],
    },
    {
      exercise: {
        name: "Overhead Press",
        description: "Shoulder exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep your core tight",
          "Press overhead and lock out your elbows",
          "Do not let your lower back arch",
        ],
      },
      primaryMuscles: [muscles.shoulders],
      secondaryMuscles: [muscles.triceps],
    },
    {
      exercise: {
        name: "Dumbbell Flyes",
        description: "Chest isolation exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep a slight bend in your elbows",
          "Lower the dumbbells in a wide arc",
          "Squeeze your chest as you bring the dumbbells together",
        ],
      },
      primaryMuscles: [muscles.chest],
      secondaryMuscles: [],
    },
    {
      exercise: {
        name: "Triceps Pushdown",
        description: "Triceps exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep your elbows close to your body",
          "Push the bar straight down",
          "Squeeze your triceps at the bottom of the movement",
        ],
      },
      primaryMuscles: [muscles.triceps],
      secondaryMuscles: [],
    },

    // Pull Day Exercises
    {
      exercise: {
        name: "Deadlift",
        description: "Back exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep your chest up and back flat",
          "Drive through your heels",
          "Lock out your hips at the top of the movement",
        ],
      },
      primaryMuscles: [muscles.back, muscles.hamstrings],
      secondaryMuscles: [],
    },
    {
      exercise: {
        name: "Pull-Ups",
        description: "Back and biceps exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Engage your lats at the start",
          "Pull with your elbows, not your hands",
          "Control the descent",
        ],
      },
      primaryMuscles: [muscles.back],
      secondaryMuscles: [muscles.biceps],
    },
    {
      exercise: {
        name: "Barbell Rows",
        description: "Back and biceps exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep your back straight and core engaged",
          "Row the bar towards your belly button",
          "Squeeze your back at the top of the movement",
        ],
      },
      primaryMuscles: [muscles.back],
      secondaryMuscles: [muscles.biceps],
    },
    {
      exercise: {
        name: "Bicep Curls",
        description: "Biceps exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep your elbows close to your sides",
          "Curl the weight up in a controlled motion",
          "Squeeze your biceps at the top of the movement",
        ],
      },
      primaryMuscles: [muscles.biceps],
      secondaryMuscles: [],
    },

    // Leg Day Exercises
    {
      exercise: {
        name: "Squat",
        description: "Leg exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep your chest up",
          "Push through your heels",
          "Do not let your knees cave in",
        ],
      },
      primaryMuscles: [muscles.quads],
      secondaryMuscles: [muscles.hamstrings],
    },
    {
      exercise: {
        name: "Leg Press",
        description: "Leg exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Place your feet shoulder-width apart",
          "Lower the platform slowly",
          "Push through your heels to return to the starting position",
        ],
      },
      primaryMuscles: [muscles.quads],
      secondaryMuscles: [],
    },
    {
      exercise: {
        name: "Lunges",
        description: "Leg exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep your chest up and core tight",
          "Step forward and lower your hips until both knees are bent at 90 degrees",
          "Push back to the starting position",
        ],
      },
      primaryMuscles: [muscles.quads],
      secondaryMuscles: [muscles.hamstrings],
    },
    {
      exercise: {
        name: "Leg Curls",
        description: "Hamstring exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Keep your hips on the pad",
          "Curl your legs as high as you can",
          "Squeeze your hamstrings at the top",
        ],
      },
      primaryMuscles: [muscles.hamstrings],
      secondaryMuscles: [],
    },
    {
      exercise: {
        name: "Calf Raises",
        description: "Calf exercise",
        createdAt: new Date(),
        updatedAt: new Date(),
        cues: [
          "Stand with your feet shoulder-width apart",
          "Raise your heels off the ground",
          "Squeeze your calves at the top",
        ],
      },
      primaryMuscles: [muscles.calves],
      secondaryMuscles: [],
    },
  ];

  // Save the exercises and associate the muscles
  for (const { exercise, primaryMuscles, secondaryMuscles } of saveExercises) {
    await addExercise(db, exercise, primaryMuscles, secondaryMuscles);
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
      { reps: 12, weight: 50 + i * 5, rest: 90, exerciseInstanceId: null, repsInReserve: 2 },
      { reps: 10, weight: 55 + i * 5, rest: 90, exerciseInstanceId: null, repsInReserve: null },
      { reps: 8, weight: 60 + i * 5, rest: 90, exerciseInstanceId: null, repsInReserve: 4 },
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
