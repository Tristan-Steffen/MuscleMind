import {
  Session,
  ExerciseInstance,
  Set,
  Exercise,
} from "@/Interfaces/sessionInterfaces";

export function useSession() {
  const createEmptySession = (): Session => {
    return {
      name: "",
      description: "",
      date: new Date(),
      isPreset: false,
      exercise_instances: [] as ExerciseInstance[],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const createEmptyExerciseInstance = (): ExerciseInstance => {
    return {
      sets: [] as Set[],
      exercise: {
        name: "",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      sessionId: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const createExerciseInstanceWithExercise = (
    exercise: Exercise
  ): ExerciseInstance => {
    return {
      sets: [] as Set[],
      exercise: exercise,
      sessionId: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const createEmptySet = (): Set => {
    return {
      reps: 0,
      weight: 0,
      rest: 0,
      exerciseInstanceId: null,
    };
  };

  return {
    createEmptySession,
    createEmptyExerciseInstance,
    createExerciseInstanceWithExercise,
    createEmptySet,
  };
}
