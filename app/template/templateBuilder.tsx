import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import InputField from "@/components/Inputs/TextInput";
import BigButton from "@/components/Buttons/BigButton";
import { useSessionContext } from "@/context/SessionContext"; // Use session context
import ExerciseInstanceBuilder from "@/components/ExerciseInstanceBuilder/ExerciseInstanceBuilder";

const TemplateBuilder: React.FC = () => {
  const {
    workoutTitle,
    workoutDescription,
    setWorkoutTitle,
    setWorkoutDescription,
    selectedExerciseInstances,
    editSelectedExerciseInstance,
  } = useSessionContext();

  function onSetChange(index: number, field: string, value: string) {
    const newInstances = [...selectedExerciseInstances];
    newInstances[index].sets = newInstances[index].sets.map((set, setIndex) =>
      setIndex === index ? { ...set, [field]: value } : set
    );
    editSelectedExerciseInstance(newInstances[index]);
  }

  console.log(selectedExerciseInstances);

  return (
    <View style={styles.container}>
      <ScrollView>
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
          ? selectedExerciseInstances.map((instance) => (
              <ExerciseInstanceBuilder
                exerciseInstance={instance}
                onSetChange={onSetChange}
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
