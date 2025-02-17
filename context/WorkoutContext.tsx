// src/context/WorkoutContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";

export type WorkoutContextType = {
    workoutTitle: string;
    workoutDescription: string;
    selectedWorkoutInstances: ExerciseInstance[];
    selectedWorkoutInstance: ExerciseInstance | null;
    workoutStartTime: number | null;
    setWorkoutTitle: (title: string) => void;
    setWorkoutDescription: (description: string) => void;
    setselectedWorkoutInstance: (instance: ExerciseInstance | null) => void;
    setWorkoutStartTime: (time: number | null) => void;
    updateselectedWorkoutInstances: (instances: ExerciseInstance[]) => void;
    updateCurrentSet: (
        setIndex: number,
        field: "reps" | "weight" | "repsInReserve",
        value: number
    ) => void;
    toggleSetDone: (setIndex: number) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [workoutTitle, setWorkoutTitle] = useState<string>("");
    const [workoutDescription, setWorkoutDescription] = useState<string>("");
    const [selectedWorkoutInstances, setselectedWorkoutInstances] = useState<ExerciseInstance[]>([]);
    const [selectedWorkoutInstance, setselectedWorkoutInstance] = useState<ExerciseInstance | null>(null);
    const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);

    const updateselectedWorkoutInstances = (instances: ExerciseInstance[]) => {
        setselectedWorkoutInstances(instances!);
    };

    // Updates the current set's field.
    const updateCurrentSet = (
        setIndex: number,
        field: "reps" | "weight" | "repsInReserve",
        value: number
    ) => {
        if (!selectedWorkoutInstance) return;
        const updatedInstance = {
            ...selectedWorkoutInstance,
            sets: selectedWorkoutInstance.sets.map((set, index) =>
                index === setIndex ? { ...set, [field]: value } : set
            ),
        };
        setselectedWorkoutInstance(updatedInstance);
        // Optionally update the overall instances too:
        setselectedWorkoutInstances((prev) =>
            prev.map((instance) =>
                instance.exercise.id === updatedInstance.exercise.id ? updatedInstance : instance
            )
        );
    };

    // Toggles the done property for a given set.
    const toggleSetDone = (setIndex: number) => {
        if (!selectedWorkoutInstance) return;
        const updatedInstance = {
            ...selectedWorkoutInstance,
            sets: selectedWorkoutInstance.sets.map((set, index) =>
                index === setIndex ? { ...set, done: !set.done } : set
            ),
        };
        setselectedWorkoutInstance(updatedInstance);
        setselectedWorkoutInstances((prev) =>
            prev.map((instance) =>
                instance.exercise.id === updatedInstance.exercise.id ? updatedInstance : instance
            )
        );
    };

    return (
        <WorkoutContext.Provider
            value={{
                workoutTitle,
                workoutDescription,
                selectedWorkoutInstances,
                selectedWorkoutInstance,
                workoutStartTime,
                setWorkoutTitle,
                setWorkoutDescription,
                setselectedWorkoutInstance,
                setWorkoutStartTime,
                updateselectedWorkoutInstances,
                updateCurrentSet,
                toggleSetDone,
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkoutContext = () => {
    const context = React.useContext(WorkoutContext);
    if (!context) {
        throw new Error("useWorkoutContext must be used within a WorkoutProvider");
    }
    return context;
};
