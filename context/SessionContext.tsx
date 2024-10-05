import React, { createContext, useState, ReactNode } from "react";
import { Exercise } from "@/Interfaces/sessionInterfaces";

type SessionContextType = {
  workoutTitle: string;
  workoutDescription: string;
  selectedExercises: Exercise[];
  setWorkoutTitle: (title: string) => void;
  setWorkoutDescription: (description: string) => void;
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exerciseId: number) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [workoutTitle, setWorkoutTitle] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const addExercise = (exercise: Exercise) => {
    setSelectedExercises((prevExercises) => [...prevExercises, exercise]);
  };

  const removeExercise = (exerciseId: number) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== exerciseId)
    );
  };

  return (
    <SessionContext.Provider
      value={{
        workoutTitle,
        workoutDescription,
        selectedExercises,
        setWorkoutTitle,
        setWorkoutDescription,
        addExercise,
        removeExercise,
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
