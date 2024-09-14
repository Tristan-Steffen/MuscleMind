import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { SetEditor } from "./SetEditor";
import { useSession } from "@/hooks/useSession";

interface ExerciseInstanceEditorProps {
  exerciseInstance: ExerciseInstance;
  onInstanceChange: (exerciseInstance: ExerciseInstance) => void;
}

export const ExerciseInstanceEditor: React.FC<ExerciseInstanceEditorProps> = ({
  exerciseInstance,
  onInstanceChange,
}) => {
  const sessionHook = useSession();
  const handleRepsChange = (reps: string, index: number) => {
    const updatedInstance = exerciseInstance;
    updatedInstance.sets[index] = {
      ...updatedInstance.sets[index],
      reps: reps ? parseInt(reps, 10) : null,
    };
    onInstanceChange(exerciseInstance);
  };

  const handleWeightChange = (weight: string, index: number) => {
    const updatedWeightInstance = exerciseInstance;
    updatedWeightInstance.sets[index] = {
      ...updatedWeightInstance.sets[index],
      weight: weight ? parseFloat(weight) : null,
    };
    onInstanceChange(exerciseInstance);
  };

  const handleDelete = (index: number) => () => {
    const updatedInstance = exerciseInstance;
    updatedInstance.sets.splice(index, 1);
    onInstanceChange(exerciseInstance);
  };

  const handleAddSet = () => {
    const updatedInstance = exerciseInstance;
    updatedInstance.sets.push(sessionHook.createEmptySet());
    onInstanceChange(exerciseInstance);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{exerciseInstance.exercise.name}</Text>
      <Text style={styles.text}>{exerciseInstance.exercise.description}</Text>
      {exerciseInstance.sets.map((set, index) => (
        <SetEditor
          key={index}
          set={set}
          index={index}
          onRepsChange={handleRepsChange}
          onWeightChange={handleWeightChange}
          onDelete={handleDelete(index)}
        />
      ))}
      <Button title="Add Set" onPress={handleAddSet} />
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
  text: {
    marginBottom: 5,
  },
});
