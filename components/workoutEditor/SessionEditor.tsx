import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Session, ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { ExerciseInstanceEditor } from "./ExerciseInstanceEditor";

interface SessionEditorProps {
  session: Session;
  onSave: (updatedSession: Session) => void;
}

export const SessionEditor: React.FC<SessionEditorProps> = ({
  session,
  onSave,
}) => {
  const [name, setName] = useState(session.name);
  const [description, setDescription] = useState(session.description);
  const [exerciseInstances, setExerciseInstances] = useState<
    ExerciseInstance[]
  >(session.exercise_instances.data);

  const handleSave = () => {
    const updatedSession = {
      ...session,
      name,
      description,
      exercise_instances: { data: exerciseInstances },
    };
    onSave(updatedSession);
  };

  const handleUpdateExerciseInstance = (
    updatedInstance: ExerciseInstance,
    index: number
  ) => {
    const updatedInstances = [...exerciseInstances];
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

      {exerciseInstances.map((instance, index) => (
        <ExerciseInstanceEditor
          key={index}
          exerciseInstance={instance}
          onSave={(updatedInstance) =>
            handleUpdateExerciseInstance(updatedInstance, index)
          }
        />
      ))}

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
