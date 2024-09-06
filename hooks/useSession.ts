import { Session, ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";

export function useSession() {
  const createEmptySession = (): Session => {
    return {
      name: "",
      description: "",
      date: new Date().toISOString(),
      isPreset: false,
      exercise_instances: {
        data: [] as ExerciseInstance[],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const createEmptyExerciseInstance = (): ExerciseInstance => {
    return {
      sets: [] as Set[],
      exercise: {
        data: {
          name: "",
          description: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const createEmptySet = (): Set => {
    return {
      reps: 0,
      weight: 0,
      rest: 0,
    };
  };

  return {
    createEmptySession,
    createEmptyExerciseInstance,
    createEmptySet,
  };
}
