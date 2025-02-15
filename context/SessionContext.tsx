// SessionContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";

type SessionContextType = {
  workoutTitle: string;
  workoutDescription: string;
  selectedExerciseInstances: ExerciseInstance[];
  newSelections: ExerciseInstance[];
  selectedExerciseInstance: ExerciseInstance | null; // new state
  setSelectedExerciseInstance: (instance: ExerciseInstance | null) => void; // new setter
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
  updateSelectedExerciseInstances: (instances: ExerciseInstance[]) => void;
  updateNewSelections: (instances: ExerciseInstance[]) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workoutTitle, setWorkoutTitle] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");
  const [selectedExerciseInstances, setSelectedExerciseInstances] = useState<ExerciseInstance[]>([]);
  const [newSelections, setNewSelections] = useState<ExerciseInstance[]>([]);
  const [selectedExerciseInstance, setSelectedExerciseInstance] = useState<ExerciseInstance | null>(null);

  const removeExerciseInstance = (exerciseName: string) => {
    setSelectedExerciseInstances((prev) =>
      prev.filter(instance => instance.exercise.name !== exerciseName)
    );
    setNewSelections((prev) =>
      prev.filter(instance => instance.exercise.name !== exerciseName)
    );
  };

  const addSelectionExerciseInstance = (exerciseInstance: ExerciseInstance) => {
    setNewSelections((prev) => [...prev, exerciseInstance]);
  };

  const removeSelectionExerciseInstance = (exerciseName: string) => {
    setNewSelections((prev) =>
      prev.filter(instance => instance.exercise.name !== exerciseName)
    );
  };

  const editSelectedExerciseInstance = (exerciseInstance: ExerciseInstance) => {
    setSelectedExerciseInstances((prev) =>
      prev.map(instance =>
        instance.exercise.id === exerciseInstance.exercise.id ? exerciseInstance : instance
      )
    );
  };

  const clearContext = () => {
    setWorkoutTitle("");
    setWorkoutDescription("");
    setSelectedExerciseInstances([]);
    setNewSelections([]);
    setSelectedExerciseInstance(null);
  };

  const isSelectionNew = () => {
    return JSON.stringify(selectedExerciseInstances) !== JSON.stringify(newSelections);
  };

  const applyNewSelections = () => {
    setSelectedExerciseInstances(newSelections);
  };

  const revertNewSelections = () => {
    setNewSelections(selectedExerciseInstances);
  };

  const updateSelectedExerciseInstances = (instances: ExerciseInstance[]) => {
    setSelectedExerciseInstances(instances);
  };

  const updateNewSelections = (instances: ExerciseInstance[]) => {
    setNewSelections(instances);
  };

  return (
    <SessionContext.Provider
      value={{
        workoutTitle,
        workoutDescription,
        selectedExerciseInstances,
        newSelections,
        selectedExerciseInstance, // exposed state
        setSelectedExerciseInstance, // exposed setter
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
        updateSelectedExerciseInstances,
        updateNewSelections,
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
