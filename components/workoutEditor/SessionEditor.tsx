import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import {
  Session,
  ExerciseInstance,
  Exercise,
} from "@/Interfaces/sessionInterfaces";
import { ExerciseInstanceEditor } from "./ExerciseInstanceEditor";
import { useSQLiteContext } from "expo-sqlite";
import { updateSession } from "@/utils/db/session";
import { Redirect } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { useSession } from "@/hooks/useSession";
import { getAllExercises } from "@/utils/db/exercise";

interface SessionEditorProps {
  session: Session;
}

export const SessionEditor: React.FC<SessionEditorProps> = ({ session }) => {
  const db = useSQLiteContext();
  const [name, setName] = useState(session.name);
  const [description, setDescription] = useState(session.description);
  const [exerciseInstances, setExerciseInstances] = useState<
    ExerciseInstance[]
  >(session.exercise_instances ?? []);
  const [redirect, setRedirect] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const sessionHook = useSession();

  const handleSave = () => {
    const updatedSession = {
      ...session,
      name,
      description,
      exercise_instances: exerciseInstances!,
    };
    updateSession(db, session, updatedSession).then(
      () => {
        console.log("Session updated");
        setRedirect(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    const loadExercises = async () => {
      const exerciseList = await getAllExercises(db);
      setExercises(exerciseList);
    };
    loadExercises();
  }, [db]);

  const handleUpdateExerciseInstance = (
    updatedInstance: ExerciseInstance,
    index: number
  ) => {
    const updatedInstances = [...exerciseInstances!];
    updatedInstances[index] = updatedInstance;
    setExerciseInstances(updatedInstances);
  };

  const handleAddExerciseInstance = () => {
    setShowDropdown(true);
  };

  const handleSelectExercise = (exerciseId: number) => {
    const selectedExercise = exercises.find(
      (exercise) => exercise.id === exerciseId
    );

    if (selectedExercise) {
      const newExerciseInstance =
        sessionHook.createExerciseInstanceWithExercise(selectedExercise);
      setExerciseInstances((prevInstances) => [
        ...prevInstances,
        newExerciseInstance,
      ]);
    }

    setShowDropdown(false);
  };
  return (
    <View style={styles.container}>
      {redirect ? <Redirect href="/" /> : null}
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
            onInstanceChange={(updatedInstance) =>
              handleUpdateExerciseInstance(updatedInstance, index)
            }
          />
        ))
      ) : (
        <Text>No exercise instances</Text>
      )}
      {showDropdown && (
        <Dropdown
          style={styles.dropdown}
          data={exercises.map((exercise) => ({
            label: exercise.name,
            value: exercise.id,
          }))}
          labelField="label"
          valueField="value"
          placeholder="Select exercise"
          onChange={(item) => handleSelectExercise(item.value!)}
        />
      )}
      <Button title="Add Exercise" onPress={handleAddExerciseInstance} />
      <Button title="Update Session" onPress={handleSave} />
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
});
