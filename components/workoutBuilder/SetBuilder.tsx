import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Set } from "@/Interfaces/sessionInterfaces";

interface SetBuilderProps {
  onAddSet: (newSet: Set) => void;
}

export const SetBuilder: React.FC<SetBuilderProps> = ({ onAddSet }) => {
  const [reps, setReps] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();
  const [rest, setRest] = useState<number | undefined>();

  const handleAddSet = () => {
    if (reps !== undefined && weight !== undefined) {
      const newSet: Set = {
        reps,
        weight,
        rest: rest ?? null,
      };
      onAddSet(newSet);
      setReps(undefined);
      setWeight(undefined);
      setRest(undefined);
    }
  };

  return (
    <View style={styles.tile}>
      <Text style={styles.title}>Add Set</Text>
      <TextInput
        style={styles.input}
        value={reps ? reps.toString() : ""}
        onChangeText={(text) => setReps(parseInt(text))}
        keyboardType="numeric"
        placeholder="Enter reps"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={weight ? weight.toString() : ""}
        onChangeText={(text) => setWeight(parseFloat(text))}
        keyboardType="numeric"
        placeholder="Enter weight"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={rest ? rest.toString() : ""}
        onChangeText={(text) => setRest(parseInt(text))}
        keyboardType="numeric"
        placeholder="Enter rest time"
        placeholderTextColor={"grey"}
      />
      <Button title="Add Set" onPress={handleAddSet} />
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
