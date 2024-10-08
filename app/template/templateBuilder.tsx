import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import InputField from "@/components/Inputs/TextInput";
import BigButton from "@/components/Buttons/BigButton";
import { useSessionContext } from "@/context/SessionContext"; // Use session context
import ExerciseInstanceBuilder from "@/components/ExerciseInstanceBuilder/ExerciseInstanceBuilder";
import { Set } from "@/Interfaces/sessionInterfaces";

const TemplateBuilder: React.FC = () => {
  const {
    workoutTitle,
    workoutDescription,
    setWorkoutTitle,
    setWorkoutDescription,
    selectedExerciseInstances,
    editSelectedExerciseInstance,
  } = useSessionContext();

  function onSetChange(
    setIndex: number,
    field: keyof Set,
    value: number,
    exerciseIndex: number
  ) {
    let newInstance = selectedExerciseInstances[exerciseIndex];
    newInstance.sets[setIndex][field] = value;
    editSelectedExerciseInstance(newInstance);
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputField
          placeholder="Workout Title"
          value={workoutTitle}
          onChangeText={setWorkoutTitle}
        />
        <InputField
          placeholder="Workout Description"
          style={{ height: 120, paddingTop: 15, marginTop: 15 }}
          value={workoutDescription}
          onChangeText={setWorkoutDescription}
          multiline={true}
        />
        <BigButton
          title="Add Exercises"
          href={{
            pathname: "/exercises/exerciseSelector",
          }}
          style={styles.addButton}
        />
        {selectedExerciseInstances
          ? selectedExerciseInstances.map((instance, index) => (
              <ExerciseInstanceBuilder
                exerciseInstance={instance}
                onSetChange={(setIndex, field, value) =>
                  onSetChange(setIndex, field as keyof Set, value, index)
                }
              />
            ))
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    marginTop: 25,
  },
});

export default TemplateBuilder;
