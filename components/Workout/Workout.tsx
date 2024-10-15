import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import WorkoutHeader from "@/components/Workout/WorkoutHeader";
import WorkoutItem from "@/components/Workout/WorkoutItem";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

interface WorkoutProps {
  workoutTitle: string;
  workoutDescription: string;
  exerciseInstances: ExerciseInstance[];
  onLoad: () => void;
  onDeleteWorkout: () => void;
}

const Workout: React.FC<WorkoutProps> = ({
  workoutTitle,
  workoutDescription,
  exerciseInstances,
  onLoad,
  onDeleteWorkout,
}) => {
  const [Title, setTitle] = useState<string>(workoutTitle);
  const [Description, setDescription] = useState<string>(workoutDescription);
  const [Instances, setInstances] =
    useState<ExerciseInstance[]>(exerciseInstances);
  const { colors } = useTheme() as CustomTheme;

  useEffect(() => {
    onLoad();
  }, []);

  const onFinishWorkout = () => {
    console.log("Workout finished!");
  };
  return (
    <View style={styles.container}>
      <WorkoutHeader
        onDeleteWorkout={onDeleteWorkout}
        onFinishWorkout={onFinishWorkout}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {Instances.length > 0 ? (
          Instances.map((instance, index) => (
            <WorkoutItem key={index} exerciseInstance={instance} />
          ))
        ) : (
          <Text style={styles.noExerciseText}>No exercises selected.</Text>
        )}
      </ScrollView>
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
