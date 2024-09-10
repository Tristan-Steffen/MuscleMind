import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { Session, ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { ExerciseInstanceEditor } from "./ExerciseInstanceEditor";
import { useSQLiteContext } from "expo-sqlite";
import { updateSession } from "@/utils/db/session";
import { Redirect } from "expo-router";

interface SessionEditorProps {
  session: Session;
}

export const SessionEditor: React.FC<SessionEditorProps> = ({ session }) => {
  const db = useSQLiteContext();
  const [name, setName] = useState(session.name);
  const [description, setDescription] = useState(session.description);
  const [exerciseInstances, setExerciseInstances] = useState<
    ExerciseInstance[] | null
  >(session.exercise_instances ? session.exercise_instances : null);

  const handleSave = () => {
    const updatedSession = {
      ...session,
      name,
      description,
      exercise_instances: { data: exerciseInstances! },
    };
    updateSession(db, updatedSession).then(
      () => {
        console.log("Session updated");
        return <Redirect href="../index" />;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleUpdateExerciseInstance = (
    updatedInstance: ExerciseInstance,
    index: number
  ) => {
    const updatedInstances = [...exerciseInstances!];
    updatedInstances[index] = updatedInstance;
    setExerciseInstances(updatedInstances);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter session name"
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter session description"
        placeholderTextColor="grey"
      />

      {exerciseInstances ? (
        exerciseInstances.map((instance, index) => (
          <ExerciseInstanceEditor
            key={index}
            exerciseInstance={instance}
            onSave={(updatedInstance) =>
              handleUpdateExerciseInstance(updatedInstance, index)
            }
          />
        ))
      ) : (
        <Text>No exercise instances</Text>
      )}

      <Button title="Save Session" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
