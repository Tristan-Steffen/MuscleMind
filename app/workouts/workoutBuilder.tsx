import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import InputField from "@/components/Inputs/TextInput";
import BigButton from "@/components/Buttons/BigButton";
import { useSessionContext } from "@/context/SessionContext";
import ExerciseInstanceBuilder from "@/components/Exercise/ExerciseInstanceBuilder";
import { useSession } from "@/hooks/useSession";
import { useLocalSearchParams } from "expo-router";

const TemplateBuilder: React.FC = () => {
  const {
    workoutTitle,
    workoutDescription,
    setWorkoutTitle,
    setWorkoutDescription,
    selectedExerciseInstances,
    clearContext,
    editSelectedExerciseInstance,
    removeExerciseInstance,
    updateSelectedExerciseInstances,
    updateNewSelections
  } = useSessionContext();

  const { createEmptySet } = useSession();
  const local = useLocalSearchParams();

  useEffect(() => {
    if (local.session) {
      // Parse session data.
      const sessionData = JSON.parse(
        Array.isArray(local.session) ? local.session[0] : local.session
      );
      const { name, description, exercise_instances: instances } = sessionData;

      // Clear the context first.
      clearContext();

      // Set the new title/description.
      setWorkoutTitle(name);
      setWorkoutDescription(description);

      // Directly update both arrays.
      updateSelectedExerciseInstances(instances);
      updateNewSelections(instances);
    }
  }, [local.session]);


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

  function onInstanceDelete(exerciseName: string) {
    removeExerciseInstance(exerciseName);
  }

  function onAddInstanceSet(instanceIndex: number) {
    let newInstance = selectedExerciseInstances[instanceIndex];
    let set = createEmptySet();

    if (newInstance.sets.length === 0) {
      set.reps = 0
      set.weight = 0
      newInstance.sets.push(set);
    } else {
      let lastSet = newInstance.sets[newInstance.sets.length - 1];
      set.reps = lastSet.reps;
      set.weight = lastSet.weight;
      newInstance.sets.push(set);
    }
    editSelectedExerciseInstance(newInstance);
  }

  function onDeleteInstanceSet(instanceIndex: number, setIndex: number) {
    let newInstance = selectedExerciseInstances[instanceIndex];
    newInstance.sets.splice(setIndex, 1);
    editSelectedExerciseInstance(newInstance);
  }

  return (
    <View className="flex-1 px-5">
      <ScrollView showsVerticalScrollIndicator={false} className="py-4">
        <InputField
          placeholder="Workout Title"
          value={workoutTitle}
          onChangeText={setWorkoutTitle}
        />
        <InputField
          placeholder="Workout Description (optional)"
          style={{ height: 120, paddingTop: 15, marginTop: 15 }}
          value={workoutDescription}
          onChangeText={setWorkoutDescription}
          multiline={true}
        />
        <BigButton
          title="Add Exercises"
          href={{ pathname: "/exercises/exerciseSelector" }}
          style="mt-6"
        />
        {selectedExerciseInstances &&
          selectedExerciseInstances.map((instance, index) => (
            <ExerciseInstanceBuilder
              key={index}
              exerciseInstance={instance}
              onSetChange={(setIndex, field, value) =>
                onSetChange(setIndex, field, value, index)
              }
              onInstanceDelete={() => onInstanceDelete(instance.exercise.name)}
              onAddSet={() => onAddInstanceSet(index)}
              onSetDelete={(setIndex) => onDeleteInstanceSet(index, setIndex)}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default TemplateBuilder;
