import {
  Session,
  ExerciseInstance,
  Set,
  Muscle,
  Exercise,
} from "@/Interfaces/sessionInterfaces";

export function useSession() {
  const createEmptySession = (): Session => {
    return {
      id: undefined,
      name: "",
      description: "",
      date: new Date(),
      isPreset: false,
      isExample: false,
      exercise_instances: [] as ExerciseInstance[],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const createExerciseInstanceWithExercise = (
    exercise: Exercise
  ): ExerciseInstance => {
    return {
      id: undefined,
      exercise: exercise,
      sessionId: undefined,
      sets: [
        {
          id: undefined,
          reps: 12,
          weight: 50,
          rest: null,
          exerciseInstanceId: null,
        },
        {
          id: undefined,
          reps: 12,
          weight: 50,
          rest: null,
          exerciseInstanceId: null,
        },
        {
          id: undefined,
          reps: 12,
          weight: 50,
          rest: null,
          exerciseInstanceId: null,
        },
      ] as Set[],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const createEmptySet = (): Set => {
    return {
      id: undefined,
      reps: null,
      weight: null,
      rest: null,
      exerciseInstanceId: null,
    };
  };

  return {
    createEmptySession,
    createExerciseInstanceWithExercise,
    createEmptySet,
  };
}
