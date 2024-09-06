import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Set } from "@/Interfaces/sessionInterfaces";

interface SetBuilderProps {
  set: Set;
  onUpdate: (updatedSet: Set) => void;
}

export const SetBuilder: React.FC<SetBuilderProps> = ({ set, onUpdate }) => {
  const updateReps = (text: string) => {
    const updatedSet = { ...set, reps: parseInt(text) || 0 };
    onUpdate(updatedSet);
  };

  const updateWeight = (text: string) => {
    const updatedSet = { ...set, weight: parseInt(text) || 0 };
    onUpdate(updatedSet);
  };

  const updateRest = (text: string) => {
    const updatedSet = { ...set, rest: parseInt(text) || 0 };
    onUpdate(updatedSet);
  };

  return (
    <View style={styles.tile}>
      <Text style={styles.title}>Add Set</Text>
      <TextInput
        style={styles.input}
        value={set.reps ? set.reps.toString() : ""}
        onChangeText={updateReps}
        keyboardType="numeric"
        placeholder="Enter reps"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={set.weight ? set.weight.toString() : ""}
        onChangeText={updateWeight}
        keyboardType="numeric"
        placeholder="Enter weight"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={set.rest ? set.rest.toString() : ""}
        onChangeText={updateRest}
        keyboardType="numeric"
        placeholder="Enter rest time"
        placeholderTextColor={"grey"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
});
