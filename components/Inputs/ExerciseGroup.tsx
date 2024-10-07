import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Exercise } from "@/Interfaces/sessionInterfaces";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";

type ExerciseGroupProps = {
  muscleGroup: string;
  exercises: Exercise[];
  selectedExercises: Exercise[];
  onExerciseSelect: (exercise: Exercise, selected: boolean) => void;
};

const ExerciseGroup: React.FC<ExerciseGroupProps> = ({
  muscleGroup,
  exercises,
  selectedExercises,
  onExerciseSelect,
}) => {
  const { colors } = useTheme() as CustomTheme;

  const isExerciseSelected = (exerciseId: number) =>
    selectedExercises.some((exercise) => exercise.id === exerciseId);

  const toggleExerciseSelection = (exercise: Exercise) => {
    const alreadySelected = isExerciseSelected(exercise.id!);
    if (alreadySelected) {
      onExerciseSelect(exercise, false);
    } else {
      onExerciseSelect(exercise, true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.muscleHeader, { color: colors.text }]}>
        {muscleGroup}
      </Text>

      <View style={[styles.exercises, { borderColor: colors.border }]}>
        {exercises.map((exercise, index) => {
          const isSelected = isExerciseSelected(exercise.id!);
          return (
            <View key={exercise.id}>
              <View
                style={
                  index !== 0
                    ? [styles.divider, { borderColor: colors.border }]
                    : null
                }
              />
              <TouchableOpacity
                style={styles.exerciseRow}
                onPress={() => toggleExerciseSelection(exercise)}
              >
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.background,
                      borderColor: colors.text,
                    },
                  ]}
                />
                <Text style={[styles.exerciseText, { color: colors.text }]}>
                  {exercise.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  exercises: {
    borderWidth: 1,
    borderRadius: 25,
  },
  muscleHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: 15,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
  },
  exerciseText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
});

export default ExerciseGroup;
