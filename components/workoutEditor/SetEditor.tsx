import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Set } from "@/Interfaces/sessionInterfaces";

interface SetEditorProps {
  set: Set;
  onSave: (updatedSet: Set) => void;
}

export const SetEditor: React.FC<SetEditorProps> = ({ set, onSave }) => {
  const [reps, setReps] = useState(set.reps.toString());
  const [weight, setWeight] = useState(set.weight.toString());

  const handleSave = () => {
    const updatedSet = {
      ...set,
      reps: parseInt(reps, 10),
      weight: parseFloat(weight),
    };
    onSave(updatedSet);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={reps}
        onChangeText={setReps}
        placeholder="Enter reps"
        placeholderTextColor="grey"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter weight"
        placeholderTextColor="grey"
        keyboardType="numeric"
      />
      <Button title="Save Set" onPress={handleSave} />
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
