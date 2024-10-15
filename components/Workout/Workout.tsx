import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
import WorkoutHeader from "@/components/Workout/WorkoutHeader";
import WorkoutItem from "@/components/Workout/WorkoutItem";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import WorkoutExercisePerformer from "./WorkoutExercisePerformer";
import { useSession } from "@/hooks/useSession";

interface WorkoutProps {
  workoutTitle: string;
  workoutDescription: string;
  exerciseInstances: ExerciseInstance[];
  onLoad: () => void;
  colors: CustomTheme["colors"];
}

const Workout: React.FC<WorkoutProps> = ({
  workoutTitle,
  workoutDescription,
  exerciseInstances,
  onLoad,
  colors,
}) => {
  const [Title, setTitle] = useState<string>(workoutTitle);
  const [Description, setDescription] = useState<string>(workoutDescription);
  const [Instances, setInstances] =
    useState<ExerciseInstance[]>(exerciseInstances);

  const [selectedExerciseInstance, setSelectedExerciseInstance] =
    useState<ExerciseInstance | null>(null);

  const { createEmptySet } = useSession();
  useEffect(() => {
    onLoad();
  }, []);

  const handleExercisePress = (exerciseInstance: ExerciseInstance) => {
    setSelectedExerciseInstance(exerciseInstance);
  };

  const handleBackToList = () => {
    setSelectedExerciseInstance(null);
  };

  // Function to mark a set as done
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

  // Function to add a new set
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
      const updatedInstances = Instances.map((instance) =>
        instance.exercise.id === selectedExerciseInstance.exercise.id
          ? selectedExerciseInstance
          : instance
      );
      setInstances(updatedInstances);
      setSelectedExerciseInstance(null);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {selectedExerciseInstance ? (
        <WorkoutExercisePerformer
          exerciseInstance={selectedExerciseInstance}
          onSetDone={handleSetDone}
          onAddSet={handleAddSet}
          onBackToWorkout={handleBackToWorkout}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {Instances.length > 0 ? (
            Instances.map((instance, index) => (
              <WorkoutItem
                key={index}
                exerciseInstance={instance}
                colors={colors}
                onPress={() => handleExercisePress(instance)} // Trigger navigation
              />
            ))
          ) : (
            <Text style={styles.noExerciseText}>No exercises selected.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100, // Extra space for scrolling
  },
  noExerciseText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
});

export default Workout;
