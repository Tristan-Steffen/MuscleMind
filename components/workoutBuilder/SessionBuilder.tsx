import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import {
  Session,
  ExerciseInstance,
  Exercise,
} from "@/Interfaces/sessionInterfaces";
import { ExerciseInstanceBuilder } from "./ExerciseInstanceBuilder";
import { useSession } from "@/hooks/useSession";
import { useSQLiteContext } from "expo-sqlite";
import { getAllExercises } from "@/utils/db/exercise";
import { Dropdown } from "react-native-element-dropdown"; // New dropdown library
import { addSession } from "@/utils/db/session";
import { Redirect } from "expo-router";

export const SessionBuilder: React.FC = () => {
  const db = useSQLiteContext();
  const sessionHook = useSession();
  const [session, setSession] = useState<Session>(
    sessionHook.createEmptySession()
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const loadExercises = async () => {
      const exerciseList = await getAllExercises(db);
      setExercises(exerciseList);
    };
    loadExercises();
  }, [db]);

  const handleCreateSession = () => {
    const saveSession = async () => {
      try {
        await addSession(db, session);
      } catch (error) {
        console.error("Failed to create session", error);
      } finally {
        console.log("Create session", session);
        setRedirect(true);
      }
    };
    saveSession();
  };

  const handleChangeName = (name: string) => {
    setSession((prevSession) => ({ ...prevSession, name }));
  };

  const handleChangeDescription = (description: string) => {
    setSession((prevSession) => ({ ...prevSession, description }));
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
      setSession((prevSession) => ({
        ...prevSession,
        exercise_instances: [
          ...prevSession.exercise_instances,
          newExerciseInstance,
        ],
      }));
    }

    setShowDropdown(false);
  };

  const handleUpdateExerciseInstance = (
    updatedInstance: ExerciseInstance,
    index: number
  ) => {
    setSession((prevSession) => {
      const updatedInstances = prevSession.exercise_instances.map(
        (instance, i) => (i === index ? updatedInstance : instance)
      );

      return {
        ...prevSession,
        exercise_instances: updatedInstances,
      };
    });
  };

  const handleDeleteExerciseInstance = (index: number) => {
    setSession((prevSession) => {
      const updatedInstances: ExerciseInstance[] = [];
      for (let i = 0; i < prevSession.exercise_instances.length; i++) {
        if (i !== index) {
          updatedInstances.push(prevSession.exercise_instances[i]);
        }
      }

      return {
        ...prevSession,
        exercise_instances: updatedInstances,
      };
    });
  };

  return (
    <View style={styles.tile}>
      {redirect ? <Redirect href="/" /> : null}
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

      {session.exercise_instances.map((instance, index) => (
        <ExerciseInstanceBuilder
          key={index}
          exerciseInstance={instance}
          onUpdate={(updatedInstance) =>
            handleUpdateExerciseInstance(updatedInstance, index)
          }
          onDelete={() => handleDeleteExerciseInstance(index)}
        />
      ))}

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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
});
