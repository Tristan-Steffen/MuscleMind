import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import WorkoutItem from "@/components/Workout/WorkoutItem";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";

interface WorkoutProps {
  workoutTitle: string;
  workoutDescription: string;
  exerciseInstances: ExerciseInstance[];
  onLoad: () => void;
}

const Workout: React.FC<WorkoutProps> = ({
  workoutTitle,
  workoutDescription,
  exerciseInstances,
  onLoad,
}) => {
  const [Title, setTitle] = useState<string>(workoutTitle);
  const [Description, setDescription] = useState<string>(workoutDescription);
  const [Instances, setInstances] =
    useState<ExerciseInstance[]>(exerciseInstances);
  const { colors } = useTheme() as CustomTheme;

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
