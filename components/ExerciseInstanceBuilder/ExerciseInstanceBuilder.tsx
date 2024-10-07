import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import InputField from "@/components/Inputs/TextInput";

type ExerciseInstanceBuilderProps = {
  exerciseInstance: ExerciseInstance;
  onSetChange: (index: number, field: string, value: string) => void; // Function to handle set changes
};

const ExerciseInstanceBuilder: React.FC<ExerciseInstanceBuilderProps> = ({
  exerciseInstance,
  onSetChange,
}) => {
  return (
    <View style={styles.container}>
      {/* Display exercise name */}
      <Text style={styles.exerciseName}>{exerciseInstance.exercise.name}</Text>

      {/* Display sets */}
      {exerciseInstance.sets.map((set, index) => (
        <View key={index} style={styles.setContainer}>
          {/* Editable input for reps */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Reps:</Text>
            <TextInput
              style={styles.input}
              value={set.reps?.toString() || ""}
              keyboardType="numeric"
              onChangeText={(value) => onSetChange(index, "reps", value)}
            />
          </View>

          {/* Editable input for weight */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight:</Text>
            <TextInput
              style={styles.input}
              value={set.weight?.toString() || ""}
              keyboardType="numeric"
              onChangeText={(value) => onSetChange(index, "weight", value)}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#2f2f2f",
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  setContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    color: "#fff",
  },
  input: {
    height: 40,
    width: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#fff",
    backgroundColor: "#3b3b3b",
    textAlign: "center",
  },
});

export default ExerciseInstanceBuilder;
