import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Session, ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { ExerciseInstanceBuilder } from "./ExerciseInstanceBuilder";
import { useSession } from "@/hooks/useSession";

export const SessionBuilder: React.FC = () => {
  const sessionHook = useSession();
  const [session, setSession] = useState<Session>(
    sessionHook.createEmptySession()
  );

  const handleCreateSession = () => {
    // Implement session creation logic here
  };

  const handleChangeName = (name: string) => {
    setSession((prevSession) => ({ ...prevSession, name }));
  };

  const handleChangeDescription = (description: string) => {
    setSession((prevSession) => ({ ...prevSession, description }));
  };

  const handleAddExerciseInstance = () => {
    const newExerciseInstance = sessionHook.createEmptyExerciseInstance();
    setSession((prevSession) => ({
      ...prevSession,
      exercise_instances: {
        data: [...prevSession.exercise_instances.data, newExerciseInstance],
      },
    }));
  };

  const handleUpdateExerciseInstance = (
    updatedInstance: ExerciseInstance,
    index: number
  ) => {
    setSession((prevSession) => {
      const updatedInstances = prevSession.exercise_instances.data.map(
        (instance, i) => (i === index ? updatedInstance : instance)
      );

      return {
        ...prevSession,
        exercise_instances: { data: updatedInstances },
      };
    });
  };

  return (
    <View style={styles.tile}>
      <Text style={styles.title}>Session Builder</Text>
      <TextInput
        style={styles.input}
        value={session.name}
        onChangeText={handleChangeName}
        placeholder="Enter session name"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={session.description}
        onChangeText={handleChangeDescription}
        placeholder="Enter session description"
        placeholderTextColor={"grey"}
      />
      {session.exercise_instances.data.map((instance, index) => (
        <ExerciseInstanceBuilder
          key={index}
          exerciseInstance={instance}
          onUpdate={(updatedInstance) =>
            handleUpdateExerciseInstance(updatedInstance, index)
          }
        />
      ))}

      <Button title="Add Exercise" onPress={handleAddExerciseInstance} />
      <Button title="Create Session" onPress={handleCreateSession} />
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
});
