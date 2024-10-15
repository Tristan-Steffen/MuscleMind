import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type WorkoutExercisePerformerProps = {
  exerciseInstance: ExerciseInstance;
  onSetDone: (setIndex: number) => void;
  onAddSet: () => void;
  onBackToWorkout: () => void;
};

const WorkoutExercisePerformer: React.FC<WorkoutExercisePerformerProps> = ({
  exerciseInstance,
  onSetDone,
  onAddSet,
  onBackToWorkout,
}) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Back to Workout Button */}
      <TouchableOpacity onPress={onBackToWorkout} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>
          Back to Workout
        </Text>
      </TouchableOpacity>

      {/* Exercise Name */}
      <Text style={[styles.exerciseName, { color: colors.text }]}>
        {exerciseInstance.exercise.name}
      </Text>

      {/* List of Sets */}
      <View style={styles.setsContainer}>
        {exerciseInstance.sets.map((set: Set, setIndex: number) => (
          <View key={setIndex} style={styles.setItem}>
            <View style={styles.setInfo}>
              <Text style={[styles.setText, { color: colors.text }]}>
                Set {setIndex + 1}: {set.reps} reps @ {set.weight} kg
              </Text>
            </View>

            {/* Done Button */}
            <TouchableOpacity
              onPress={() => onSetDone(setIndex)}
              style={[
                styles.doneButton,
                set.done
                  ? { backgroundColor: colors.success }
                  : { backgroundColor: colors.border },
              ]}
            >
              <FontAwesome
                name={set.done ? "check-circle" : "circle"}
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Add Set Button */}
      <TouchableOpacity onPress={onAddSet} style={styles.addSetButton}>
        <FontAwesome name="plus" size={24} color={colors.text} />
        <Text style={[styles.addSetText, { color: colors.text }]}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    marginLeft: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  setsContainer: {
    flexDirection: "column",
  },
  setItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  setInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  setText: {
    fontSize: 16,
  },
  doneButton: {
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addSetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginTop: 20,
  },
  addSetText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default WorkoutExercisePerformer;
