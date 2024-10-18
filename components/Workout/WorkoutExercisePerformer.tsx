import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import InputField from "@/components/Inputs/TextInput";
import BigButton from "../Buttons/BigButton";
import { ScrollView } from "react-native-gesture-handler";

type WorkoutExercisePerformerProps = {
  exerciseInstance: ExerciseInstance;
  onSetDone: (setIndex: number) => void;
  onAddSet: () => void;
  onBackToWorkout: () => void;
  onSetChange: (
    setIndex: number,
    field: "reps" | "weight",
    value: number
  ) => void; // Unified callback for reps and weight
  colors: CustomTheme["colors"];
};

const WorkoutExercisePerformer: React.FC<WorkoutExercisePerformerProps> = ({
  exerciseInstance,
  onSetDone,
  onAddSet,
  onBackToWorkout,
  onSetChange,
  colors,
}) => {
  const incrementReps = (value: number | null) => (value || 0) + 1;
  const decrementReps = (value: number | null) => Math.max((value || 0) - 1, 0);

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: colors.card }]}>
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

        {/* Reps and Weight Headers */}
        <View style={styles.setsHeaderContainer}>
          <View style={styles.setsHeader}>
            <Text style={[styles.setHeaderText, { color: colors.text }]}>
              Reps
            </Text>
          </View>
          <View style={styles.setsHeader}>
            <Text style={[styles.setHeaderText, { color: colors.text }]}>
              Weight
            </Text>
          </View>
        </View>

        <View style={styles.setsContainer}>
          {exerciseInstance.sets.map((set: Set, setIndex: number) => (
            <View key={setIndex} style={styles.setItem}>
              <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      onSetChange(setIndex, "reps", decrementReps(set.reps))
                    }
                    style={styles.button}
                  >
                    <FontAwesome
                      name={"minus-circle"}
                      size={30}
                      color={colors.lightBackground}
                    />
                  </TouchableOpacity>
                  <InputField
                    placeholder="0"
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        color: colors.text,
                      },
                    ]}
                    value={set.reps === 0 ? "" : set.reps?.toString() || ""}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      onSetChange(setIndex, "reps", Number(value))
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      onSetChange(setIndex, "reps", incrementReps(set.reps))
                    }
                    style={styles.button}
                  >
                    <FontAwesome
                      name="plus-circle"
                      size={30}
                      color={colors.lightBackground}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <InputField
                    placeholder="0"
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        color: colors.text,
                      },
                    ]}
                    value={set.weight === 0 ? "" : set.weight?.toString() || ""}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      onSetChange(setIndex, "weight", Number(value))
                    }
                  />
                </View>
              </View>

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

        <BigButton
          title="Add Set"
          style={{ backgroundColor: colors.basicButton }}
          textStyle={{ fontSize: 20 }}
          onPress={() => {
            onAddSet();
          }}
        ></BigButton>
      </View>
    </ScrollView>
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
  setsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginRight: 36,
  },
  setsHeader: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
  },
  setHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
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
  inputGroup: {
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    width: 60,
    textAlign: "center",
  },
  button: {
    padding: 10,
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
    marginTop: 20,
  },
  addSetText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default WorkoutExercisePerformer;
