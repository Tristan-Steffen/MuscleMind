import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import WorkoutItem from "@/components/Workout/WorkoutItem";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";

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

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
            />
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
    padding: 20,
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
