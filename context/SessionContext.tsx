import React, { createContext, useState, ReactNode } from "react";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";

type SessionContextType = {
  workoutTitle: string;
  workoutDescription: string;
  selectedExerciseInstances: ExerciseInstance[];
  editSelectedExerciseInstance: (exerciseInstance: ExerciseInstance) => void;
  setWorkoutTitle: (title: string) => void;
  setWorkoutDescription: (description: string) => void;
  addExerciseInstance: (exerciseInstance: ExerciseInstance) => void;
  removeExerciseInstance: (index: number) => void;
  clearContext: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [workoutTitle, setWorkoutTitle] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");
  const [selectedExerciseInstances, setSelectedExerciseInstances] = useState<
    ExerciseInstance[]
  >([]);

  const addExerciseInstance = (exerciseInstance: ExerciseInstance) => {
    setSelectedExerciseInstances((prevInstances) => [
      ...prevInstances,
      exerciseInstance,
    ]);
  };

  const removeExerciseInstance = (index: number) => {
    console.log(index);
    setSelectedExerciseInstances((prevInstances) =>
      prevInstances.filter((_, i) => i !== index)
    );
  };

  const editSelectedExerciseInstance = (exerciseInstance: ExerciseInstance) => {
    setSelectedExerciseInstances((prevInstances) =>
      prevInstances.map((instance) =>
        instance.exercise.id === exerciseInstance.exercise.id
          ? exerciseInstance
          : instance
      )
    );
  };

  const clearContext = () => {
    setWorkoutTitle("");
    setWorkoutDescription("");
    setSelectedExerciseInstances([]);
  };

  return (
    <SessionContext.Provider
      value={{
        workoutTitle,
        workoutDescription,
        selectedExerciseInstances,
        clearContext,
        editSelectedExerciseInstance,
        setWorkoutTitle,
        setWorkoutDescription,
        addExerciseInstance,
        removeExerciseInstance,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
