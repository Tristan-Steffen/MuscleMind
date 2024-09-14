import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { SetEditor } from "./SetEditor";

interface ExerciseInstanceEditorProps {
  exerciseInstance: ExerciseInstance;
  onInstanceChange: (exerciseInstance: ExerciseInstance) => void;
}

export const ExerciseInstanceEditor: React.FC<ExerciseInstanceEditorProps> = ({
  exerciseInstance,
  onInstanceChange,
}) => {
  const [instance, setInstance] = useState<ExerciseInstance>(exerciseInstance);

  const handleRepsChange = (reps: string, index: number) => {
    const updatedInstance = instance;
    updatedInstance.sets[index] = {
      ...updatedInstance.sets[index],
      reps: reps ? parseInt(reps, 10) : null,
    };
    setInstance(updatedInstance);
    onInstanceChange(exerciseInstance);
  };

  const handleWeightChange = (weight: string, index: number) => {
    const updatedWeightInstance = instance;
    updatedWeightInstance.sets[index] = {
      ...updatedWeightInstance.sets[index],
      weight: weight ? parseFloat(weight) : null,
    };
    setInstance(updatedWeightInstance);
    onInstanceChange(exerciseInstance);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{exerciseInstance.exercise.name}</Text>
      <Text style={styles.text}>{exerciseInstance.exercise.description}</Text>
      {instance.sets.map((set, index) => (
        <SetEditor
          key={index}
          set={set}
          index={index}
          onRepsChange={handleRepsChange}
          onWeightChange={handleWeightChange}
        />
      ))}
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
