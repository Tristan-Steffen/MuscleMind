import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "@/components/Themed";
import WorkoutItem from "@/components/Workout/WorkoutItem";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import WorkoutExercisePerformer from "./WorkoutExercisePerformer";
import { useSession } from "@/hooks/useSession";
import { useSessionContext } from "@/context/SessionContext";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

interface WorkoutProps {}

const Workout: React.FC<WorkoutProps> = () => {
  const { colors } = useTheme() as CustomTheme;
  const { selectedExerciseInstances, clearContext } = useSessionContext();
  const { createEmptySet } = useSession();

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [instances, setInstances] = useState<ExerciseInstance[]>();

  const [selectedExerciseInstance, setSelectedExerciseInstance] =
    useState<ExerciseInstance | null>(null);

  useEffect(() => {
    setInstances(selectedExerciseInstances);
    clearContext();
    router.navigate({ pathname: "/" });
  }, []);

  useEffect(() => {
    if (selectedExerciseInstance) {
      const updatedInstances = instances!.map((instance) =>
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

  const handleBackToWorkout = () => {
    if (selectedExerciseInstance) {
      const updatedInstances = instances!.map((instance) =>
        instance.exercise.id === selectedExerciseInstance.exercise.id
          ? selectedExerciseInstance
          : instance
      );
      setInstances(updatedInstances);
      setSelectedExerciseInstance(null);
    }
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {selectedExerciseInstance ? (
        <WorkoutExercisePerformer
          exerciseInstance={selectedExerciseInstance}
          onSetDone={handleSetDone}
          onAddSet={handleAddSet}
          onBackToWorkout={handleBackToWorkout}
          colors={colors}
          onSetChange={(setIndex, field: "reps" | "weight", value) =>
            onSetChange(setIndex, field, value)
          }
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
    <View>
      <Text style={styles.noExerciseText}>No exercises added yet!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  noExerciseText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
});

export default Workout;
