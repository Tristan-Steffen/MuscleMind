import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { SetBuilder } from "./SetBuilder";

interface ExerciseInstanceBuilderProps {
  onAddExerciseInstance: (newExerciseInstance: ExerciseInstance) => void;
}

export const ExerciseInstanceBuilder: React.FC<
  ExerciseInstanceBuilderProps
> = ({ onAddExerciseInstance }) => {
  const [exerciseName, setExerciseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sets, setSets] = useState<Set[]>([]);

  const handleAddSet = (newSet: Set) => {
    setSets([...sets, newSet]);
  };

  const handleAddExerciseInstance = () => {
    if (exerciseName && sets.length > 0) {
      const newExerciseInstance: ExerciseInstance = {
        sets,
        exercise: {
          data: {
            name: exerciseName,
            description,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      onAddExerciseInstance(newExerciseInstance);
      setExerciseName("");
      setDescription("");
      setSets([]);
    }
  };

  return (
    <View style={styles.tile}>
      <Text style={styles.title}>Exercise Instance</Text>
      <TextInput
        style={styles.input}
        value={exerciseName}
        onChangeText={setExerciseName}
        placeholder="Enter exercise name"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor={"grey"}
      />
      <SetBuilder onAddSet={handleAddSet} />
      <Button
        title="Add Exercise Instance"
        onPress={handleAddExerciseInstance}
      />
      {sets.length > 0 && (
        <View style={styles.setList}>
          <Text style={styles.subTitle}>Added Sets:</Text>
          {sets.map((set, index) => (
            <Text key={index} style={styles.setText}>
              {`${set.reps} reps @ ${set.weight} kg - ${
                set.rest ?? 0
              } sec rest`}
            </Text>
          ))}
        </View>
      )}
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
  setList: {
    marginTop: 10,
  },
  subTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  setText: {
    fontSize: 14,
  },
});
