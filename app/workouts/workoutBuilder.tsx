import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import InputField from "@/components/Inputs/TextInput";
import BigButton from "@/components/Buttons/BigButton";
import { useSessionContext } from "@/context/SessionContext";
import ExerciseInstanceBuilder from "@/components/Exercise/ExerciseInstanceBuilder";
import { useSession } from "@/hooks/useSession";

const TemplateBuilder: React.FC = () => {
  const {
    workoutTitle,
    workoutDescription,
    setWorkoutTitle,
    setWorkoutDescription,
    selectedExerciseInstances,
    editSelectedExerciseInstance,
    removeExerciseInstance,
  } = useSessionContext();

  const { createEmptySet } = useSession();

  function onSetChange(
    setIndex: number,
    field: "reps" | "weight",
    value: number,
    instanceIndex: number
  ) {
    let newInstance = selectedExerciseInstances[instanceIndex];
    newInstance.sets[setIndex][field] = value;
    editSelectedExerciseInstance(newInstance);
  }

  function onInstanceDelete(instanceIndex: number) {
    removeExerciseInstance(instanceIndex);
  }

  function onAddInstanceSet(instanceIndex: number) {
    let newInstance = selectedExerciseInstances[instanceIndex];
    let lastSet = newInstance.sets[newInstance.sets.length - 1];
    let set = createEmptySet();
    set.reps = lastSet.reps;
    set.weight = lastSet.weight;
    newInstance.sets.push(set);
    editSelectedExerciseInstance(newInstance);
  }

  function onDeleteInstanceSet(instanceIndex: number, setIndex: number) {
    let newInstance = selectedExerciseInstances[instanceIndex];
    newInstance.sets.splice(setIndex, 1);
    editSelectedExerciseInstance(newInstance);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: 15 }}
      >
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
                onSetChange={(setIndex, field: "reps" | "weight", value) =>
                  onSetChange(setIndex, field, value, index)
                }
                onInstanceDelete={() => onInstanceDelete(index)}
                onAddSet={() => onAddInstanceSet(index)}
                onSetDelete={(setIndex) => onDeleteInstanceSet(index, setIndex)}
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
    paddingHorizontal: 20,
  },
  addButton: {
    marginTop: 25,
  },
});

export default TemplateBuilder;
