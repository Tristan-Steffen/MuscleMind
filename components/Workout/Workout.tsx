// src/components/Workout/Workout.tsx
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text } from "@/components/Themed";
import WorkoutItem from "@/components/Workout/WorkoutItem";
import { Exercise, ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import WorkoutExercisePerformer from "./WorkoutExercisePerformer";
import { useWorkoutContext } from "@/context/WorkoutContext";
import { useTheme } from "@react-navigation/native";
import { useSession } from "@/hooks/useSession";
import { useSessionContext } from "@/context/SessionContext";

const Workout: React.FC<{ onNavigateToInfo: (exercise: Exercise) => void, onFinishWorkout: () => void }> = ({ onNavigateToInfo, onFinishWorkout }) => {
  const { colors } = useTheme() as CustomTheme;
  const {
    selectedWorkoutInstances,
    selectedWorkoutInstance,
    workoutStartTime,
    setWorkoutStartTime,
    updateselectedWorkoutInstances,
    setselectedWorkoutInstance,
    setWorkoutTitle,
    setWorkoutDescription,
  } = useWorkoutContext();

  const {
    selectedExerciseInstances,
    workoutTitle,
    workoutDescription,
    clearContext,
  } = useSessionContext();

  const { createEmptySet } = useSession();

  const [instances, setInstances] = useState<ExerciseInstance[]>();

  useEffect(() => {
    if (!workoutStartTime) {
      setWorkoutStartTime(Date.now());
    }
    updateselectedWorkoutInstances(selectedExerciseInstances)
    setWorkoutTitle(workoutTitle),
      setWorkoutDescription(workoutDescription)
    clearContext()
  }, []);

  useEffect(() => {
    setInstances(selectedWorkoutInstances);
  }, [selectedWorkoutInstances]);

  useEffect(() => {
    if (selectedWorkoutInstance && instances) {
      const updatedInstances = instances.map((instance) =>
        instance.exercise.id === selectedWorkoutInstance.exercise.id
          ? selectedWorkoutInstance
          : instance
      );
      setInstances(updatedInstances);
      updateselectedWorkoutInstances(updatedInstances);
    }
  }, [selectedWorkoutInstance?.sets]);

  const handleExercisePress = (exerciseInstance: ExerciseInstance) => {
    setselectedWorkoutInstance(exerciseInstance);
  };

  const handleAddSet = () => {
    if (!selectedWorkoutInstance) return;
    let newSet = createEmptySet();
    const lastSet =
      selectedWorkoutInstance.sets[selectedWorkoutInstance.sets.length - 1];
    newSet = {
      ...newSet,
      reps: lastSet.reps,
      weight: lastSet.weight,
      done: false,
    };
    setselectedWorkoutInstance({
      ...selectedWorkoutInstance,
      sets: [...selectedWorkoutInstance.sets, newSet],
    });
    console.log("New set added!");
  };

  return instances ? (
    <View className="flex-1 px-5" style={{ backgroundColor: colors.background }}>
      {selectedWorkoutInstance ? (
        <WorkoutExercisePerformer
          exerciseInstance={selectedWorkoutInstance}
          onAddSet={handleAddSet}
          colors={colors}
          onNavigateToInfo={onNavigateToInfo}
          onFinishWorkout={onFinishWorkout}
        />
      ) : (
        <FlatList
          data={instances}
          renderItem={({ item }) => (
            <WorkoutItem
              exerciseInstance={item}
              colors={colors}
              onPress={() => handleExercisePress(item)}
            />
          )}
        />
      )}
    </View>
  ) : (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg" style={{ color: "gray" }}>
        No exercises added yet!
      </Text>
    </View>
  );
};

export default Workout;
