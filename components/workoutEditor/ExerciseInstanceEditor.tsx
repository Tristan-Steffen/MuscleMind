import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { SetEditor } from "./SetEditor";

interface ExerciseInstanceEditorProps {
  exerciseInstance: ExerciseInstance;
  onSave: (updatedInstance: ExerciseInstance) => void;
}

export const ExerciseInstanceEditor: React.FC<ExerciseInstanceEditorProps> = ({
  exerciseInstance,
  onSave,
}) => {
  const [name, setName] = useState(exerciseInstance.exercise.name);
  const [description, setDescription] = useState(
    exerciseInstance.exercise.description
  );
  const [sets, setSets] = useState<Set[]>(exerciseInstance.sets);

  const handleSave = () => {
    const updatedInstance = {
      ...exerciseInstance,
      exercise: {
        ...exerciseInstance.exercise,
        data: { ...exerciseInstance.exercise, name, description },
      },
      sets,
    };
    onSave(updatedInstance);
  };

  const handleUpdateSet = (updatedSet: Set, index: number) => {
    const updatedSets = [...sets];
    updatedSets[index] = updatedSet;
    setSets(updatedSets);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter exercise name"
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter exercise description"
        placeholderTextColor="grey"
      />

      {sets.map((set, index) => (
        <SetEditor
          key={index}
          set={set}
          onSave={(updatedSet) => handleUpdateSet(updatedSet, index)}
        />
      ))}

      <Button title="Save Exercise" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
