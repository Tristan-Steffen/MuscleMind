import React, { createContext, useState, ReactNode } from "react";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";

type SessionContextType = {
  workoutTitle: string;
  workoutDescription: string;
  selectedExerciseInstances: ExerciseInstance[];
  newSelections: ExerciseInstance[];
  editSelectedExerciseInstance: (exerciseInstance: ExerciseInstance) => void;
  setWorkoutTitle: (title: string) => void;
  setWorkoutDescription: (description: string) => void;
  addSelectionExerciseInstance: (exerciseInstance: ExerciseInstance) => void;
  removeExerciseInstance: (exerciseName: string) => void;
  removeSelectionExerciseInstance: (exerciseName: string) => void;
  isSelectionNew: () => boolean;
  applyNewSelections: () => void;
  revertNewSelections: () => void;
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
  const [newSelections, setNewSelections] = React.useState<ExerciseInstance[]>(
    []
  );

  const removeExerciseInstance = (exerciseName: string) => {
    setSelectedExerciseInstances((prevInstances) =>
      prevInstances.filter(
        (instance) => instance.exercise.name !== exerciseName
      )
    );
    setNewSelections((prevInstances) =>
      prevInstances.filter(
        (instance) => instance.exercise.name !== exerciseName
      )
    );
  };

  const addSelectionExerciseInstance = (exerciseInstance: ExerciseInstance) => {
    setNewSelections((prevInstances) => [...prevInstances, exerciseInstance]);
  };

  const removeSelectionExerciseInstance = (exerciseName: string) => {
    setNewSelections((prevInstances) =>
      prevInstances.filter(
        (instance) => instance.exercise.name !== exerciseName
      )
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

  const isSelectionNew = () => {
    return (
      JSON.stringify(selectedExerciseInstances) !==
      JSON.stringify(newSelections)
    );
  };

  const applyNewSelections = () => {
    setSelectedExerciseInstances(newSelections);
  };

  const revertNewSelections = () => {
    setNewSelections(selectedExerciseInstances);
  };

  return (
    <SessionContext.Provider
      value={{
        workoutTitle,
        workoutDescription,
        selectedExerciseInstances,
        newSelections,
        clearContext,
        editSelectedExerciseInstance,
        setWorkoutTitle,
        setWorkoutDescription,
        addSelectionExerciseInstance,
        removeExerciseInstance,
        removeSelectionExerciseInstance,
        isSelectionNew,
        applyNewSelections,
        revertNewSelections,
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
