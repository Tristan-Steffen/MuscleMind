import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Set } from "@/Interfaces/sessionInterfaces";

interface SetEditorProps {
  set: Set;
  onRepsChange: (reps: string, index: number) => void;
  onWeightChange: (weight: string, index: number) => void;
  index: number;
}

export const SetEditor: React.FC<SetEditorProps> = ({
  set,
  onRepsChange,
  onWeightChange,
  index,
}) => {
  const handleRepsChange = (reps: string) => {
    onRepsChange(reps, index);
  };

  const handleWeightChange = (weight: string) => {
    onWeightChange(weight, index);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={set.reps.toString()}
        onChangeText={handleRepsChange}
        placeholder="Enter reps"
        placeholderTextColor="grey"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={set.weight.toString()}
        onChangeText={handleWeightChange}
        placeholder="Enter weight"
        placeholderTextColor="grey"
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
});
