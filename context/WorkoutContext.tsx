// src/context/WorkoutContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { ExerciseInstance, Session } from "@/Interfaces/sessionInterfaces";
import { addSession } from "@/utils/db/session"; // Your DB helper function
import { useSQLiteContext } from "expo-sqlite";

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
    finishWorkout: (closeModal: () => void) => Promise<void>;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [workoutTitle, setWorkoutTitle] = useState<string>("");
    const [workoutDescription, setWorkoutDescription] = useState<string>("");
    const [selectedWorkoutInstances, setselectedWorkoutInstances] = useState<ExerciseInstance[]>([]);
    const [selectedWorkoutInstance, setselectedWorkoutInstance] = useState<ExerciseInstance | null>(null);
    const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);

    // Get the SQLite database (adjust based on your setup)
    const db = useSQLiteContext();

    const updateselectedWorkoutInstances = (instances: ExerciseInstance[]) => {
        setselectedWorkoutInstances(instances);
    };

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
        setselectedWorkoutInstances((prev) =>
            prev.map((instance) =>
                instance.exercise.id === updatedInstance.exercise.id ? updatedInstance : instance
            )
        );
    };

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

    // Save the workout to the database.
    // We construct a Session object using the workout context values.
    // We ensure that every exercise instance has valid Date objects for createdAt/updatedAt.
    const saveWorkoutToDatabase = async (): Promise<void> => {
        if (!selectedWorkoutInstances || !workoutStartTime) return;

        const session: Session = {
            name: workoutTitle,
            description: workoutDescription,
            date: new Date(workoutStartTime),
            isPreset: false,
            isExample: false,
            // Map over each exercise instance to ensure dates are valid.
            exercise_instances: selectedWorkoutInstances.map((ei) => ({
                ...ei,
                createdAt: ei.createdAt instanceof Date ? ei.createdAt : new Date(),
                updatedAt: ei.updatedAt instanceof Date ? ei.updatedAt : new Date(),
            })),
            createdAt: new Date(workoutStartTime),
            updatedAt: new Date(),
        };

        const sessionId = await addSession(db, session);
        console.log("Workout saved with session ID:", sessionId);
    };

    const finishWorkout = async (closeModal: () => void) => {
        try {
            await saveWorkoutToDatabase();
            // Clear workout-related state.
            setWorkoutTitle("");
            setWorkoutDescription("");
            setselectedWorkoutInstances([]);
            setselectedWorkoutInstance(null);
            setWorkoutStartTime(null);
            // Close the modal.
            closeModal();
        } catch (error) {
            console.error("Error finishing workout", error);
        }
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
                finishWorkout,
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
