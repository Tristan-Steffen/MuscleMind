import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text } from "@/components/Themed";
import WorkoutItem from "@/components/Workout/WorkoutItem";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import WorkoutExercisePerformer from "./WorkoutExercisePerformer";
import { useSession } from "@/hooks/useSession";
import { useSessionContext } from "@/context/SessionContext";
import { useTheme } from "@react-navigation/native";

const Workout: React.FC = () => {
  const { colors } = useTheme() as CustomTheme;
  const {
    selectedExerciseInstances,
    selectedExerciseInstance,
    workoutStartTime,
    setSelectedExerciseInstance,
    setWorkoutStartTime
  } = useSessionContext();
  const { createEmptySet } = useSession();

  const [instances, setInstances] = useState<ExerciseInstance[]>();

  useEffect(() => {
    if (!workoutStartTime) {
      setWorkoutStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    setInstances(selectedExerciseInstances);
  }, [selectedExerciseInstances]);

  useEffect(() => {
    if (selectedExerciseInstance && instances) {
      const updatedInstances = instances.map((instance) =>
        instance.exercise.id === selectedExerciseInstance.exercise.id
          ? selectedExerciseInstance
          : instance
      );
      setInstances(updatedInstances);
    }
  }, [selectedExerciseInstance?.sets]);

  const handleExercisePress = (exerciseInstance: ExerciseInstance) => {
    setSelectedExerciseInstance(exerciseInstance);
  };

  const handleSetDone = (setIndex: number) => {
    if (!selectedExerciseInstance) return;
    const updatedSets = selectedExerciseInstance.sets.map((set, index) =>
      index === setIndex ? { ...set, done: !set.done } : set
    );
    setSelectedExerciseInstance({
      ...selectedExerciseInstance,
      sets: updatedSets,
    });
  };

  const handleAddSet = () => {
    if (!selectedExerciseInstance) return;
    let newSet = createEmptySet();
    const lastSet =
      selectedExerciseInstance.sets[selectedExerciseInstance.sets.length - 1];
    newSet = {
      ...newSet,
      reps: lastSet.reps,
      weight: lastSet.weight,
      done: false,
    };
    setSelectedExerciseInstance({
      ...selectedExerciseInstance,
      sets: [...selectedExerciseInstance.sets, newSet],
    });
    console.log("New set added!");
  };

  function onSetChange(
    setIndex: number,
    field: "reps" | "weight",
    value: number
  ) {
    if (!selectedExerciseInstance) return;
    const updatedInstance = {
      ...selectedExerciseInstance,
      sets: selectedExerciseInstance.sets.map((set, index) =>
        index === setIndex ? { ...set, [field]: value } : set
      ),
    };
    setSelectedExerciseInstance(updatedInstance);
  }

  return instances ? (
    <View className="flex-1 px-5" style={{ backgroundColor: colors.background }}>
      {selectedExerciseInstance ? (
        <WorkoutExercisePerformer
          exerciseInstance={selectedExerciseInstance}
          onSetDone={handleSetDone}
          onAddSet={handleAddSet}
          colors={colors}
          onSetChange={(setIndex, field, value) => onSetChange(setIndex, field, value)}
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
