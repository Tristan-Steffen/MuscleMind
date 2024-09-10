import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { SetBuilder } from "./SetBuilder";
import { useSession } from "@/hooks/useSession";

interface ExerciseInstanceBuilderProps {
  exerciseInstance: ExerciseInstance;
  onUpdate: (updatedInstance: ExerciseInstance) => void;
}

export const ExerciseInstanceBuilder: React.FC<
  ExerciseInstanceBuilderProps
> = ({ exerciseInstance, onUpdate }) => {
  const setExerciseName = (text: string): void => {
    const updatedInstance = {
      ...exerciseInstance,
      exercise: {
        ...exerciseInstance.exercise,
        data: { ...exerciseInstance.exercise, name: text },
      },
    };
    onUpdate(updatedInstance);
  };

  const setDescription = (text: string): void => {
    const updatedInstance = {
      ...exerciseInstance,
      exercise: {
        ...exerciseInstance.exercise,
        data: { ...exerciseInstance.exercise, description: text },
      },
    };
    onUpdate(updatedInstance);
  };

  const handleAddSet = (): void => {
    const newSet = useSession().createEmptySet();
    const updatedInstance = {
      ...exerciseInstance,
      sets: [...exerciseInstance.sets, newSet],
    };
    onUpdate(updatedInstance);
  };

  const updateSet = (updatedSet: Set, setIndex: number): void => {
    const updatedSets = exerciseInstance.sets.map((set, index) =>
      index === setIndex ? updatedSet : set
    );

    const updatedInstance = {
      ...exerciseInstance,
      sets: updatedSets,
    };
    onUpdate(updatedInstance);
  };

  return (
    <View style={styles.tile}>
      <Text style={styles.title}>Exercise Instance</Text>
      <TextInput
        style={styles.input}
        value={exerciseInstance.exercise.name}
        onChangeText={setExerciseName}
        placeholder="Enter exercise name"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={exerciseInstance.exercise.description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor={"grey"}
      />
      {exerciseInstance.sets.map((set, index) => (
        <SetBuilder
          key={index}
          set={set}
          onUpdate={(updatedSet) => updateSet(updatedSet, index)}
        />
      ))}

      <Button title="Add Set" onPress={handleAddSet} />
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
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
