import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Session, ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { ExerciseInstanceBuilder } from "./ExerciseInstanceBuilder";

export const SessionBuilder: React.FC = () => {
  const [sessionName, setSessionName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [exerciseInstances, setExerciseInstances] = useState<
    ExerciseInstance[]
  >([]);

  const handleAddExerciseInstance = (newExerciseInstance: ExerciseInstance) => {
    setExerciseInstances([...exerciseInstances, newExerciseInstance]);
  };

  const handleCreateSession = () => {
    console.log("Creating Session...");
    console.log(exerciseInstances);
    if (sessionName && exerciseInstances.length > 0) {
      const newSession: Session = {
        name: sessionName,
        description,
        date: new Date().toISOString(),
        isPreset: false,
        exercise_instances: {
          data: exerciseInstances,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Here, you can save this session to your database
      console.log("New Session Created:", newSession);
      // Reset form after submission
      setSessionName("");
      setDescription("");
      setExerciseInstances([]);
    }
  };

  return (
    <View style={styles.tile}>
      <Text style={styles.title}>Session Builder</Text>
      <TextInput
        style={styles.input}
        value={sessionName}
        onChangeText={setSessionName}
        placeholder="Enter session name"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter session description"
        placeholderTextColor={"grey"}
      />
      <ExerciseInstanceBuilder
        onAddExerciseInstance={handleAddExerciseInstance}
      />
      <Button title="Create Session" onPress={handleCreateSession} />
      {exerciseInstances.length > 0 && (
        <View style={styles.instanceList}>
          <Text style={styles.subTitle}>Added Exercise Instances:</Text>
          {exerciseInstances.map((instance, index) => (
            <Text key={index} style={styles.instanceText}>
              {`${instance.exercise.data.name}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#d0d0d0",
    padding: 15,
    marginVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  instanceList: {
    marginTop: 10,
  },
  subTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  instanceText: {
    fontSize: 16,
  },
});
