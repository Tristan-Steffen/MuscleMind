// src/components/Workout/WorkoutExercisePerformer.tsx
import React from "react";
import { ScrollView, TouchableOpacity, View, Alert } from "react-native";
import { Text } from "@/components/Themed";
import { Exercise, ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PlannedSets } from "./PlannedSets";
import { CurrentSetInput } from "./CurrentSetInput";
import { useWorkoutContext } from "@/context/WorkoutContext";
import Button from "../Buttons/Button";

type WorkoutExercisePerformerProps = {
  exerciseInstance: ExerciseInstance;
  onAddSet: () => void;
  colors: CustomTheme["colors"];
  onNavigateToInfo: (exercise: Exercise) => void;
  onFinishWorkout: () => void;
};

const WorkoutExercisePerformer: React.FC<WorkoutExercisePerformerProps> = ({
  exerciseInstance,
  onAddSet,
  onNavigateToInfo,
  onFinishWorkout,
  colors,
}) => {
  const currentSetIndex = exerciseInstance.sets.findIndex((set: Set) => !set.done);
  const currentSet = currentSetIndex !== -1 ? exerciseInstance.sets[currentSetIndex] : null;
  const mutedColor = "#999";

  // Access the workout context to get the list of exercises and update function.
  const { selectedWorkoutInstances, setselectedWorkoutInstance } = useWorkoutContext();

  // Find the index of the current exercise in the selectedWorkoutInstances list.
  const currentIndex = selectedWorkoutInstances.findIndex(
    instance => instance.exercise.id === exerciseInstance.exercise.id
  );

  // Determine previous and next exercise (if available).
  const prevExercise = currentIndex > 0 ? selectedWorkoutInstances[currentIndex - 1] : null;
  const nextExercise =
    currentIndex < selectedWorkoutInstances.length - 1 ? selectedWorkoutInstances[currentIndex + 1] : null;

  const handlePrevPress = () => {
    if (prevExercise) {
      setselectedWorkoutInstance(prevExercise);
    }
  };

  const handleNextPress = () => {
    if (nextExercise) {
      setselectedWorkoutInstance(nextExercise);
    }
  };

  // Confirmation popup for finishing workout.
  const confirmFinishWorkout = () => {
    Alert.alert(
      "Finish Workout",
      "Are you sure you want to finish the workout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: onFinishWorkout },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView className="p-4">
      {/* Header */}
      <View
        className="border-b mb-5 flex-row items-center justify-between"
        style={{ borderColor: colors.border }}
      >
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          {exerciseInstance.exercise.name}
        </Text>
        <TouchableOpacity onPress={() => onNavigateToInfo(exerciseInstance.exercise)}>
          <FontAwesome name="info-circle" size={26} color={colors.lightBackground} />
        </TouchableOpacity>
      </View>

      {/* Current Set Input */}
      {currentSet && (
        <CurrentSetInput
          currentSet={currentSet}
          currentSetIndex={currentSetIndex}
          colors={colors}
        />
      )}

      {/* Planned Sets */}
      <PlannedSets
        sets={exerciseInstance.sets}
        currentSetIndex={currentSetIndex}
        onAddSet={onAddSet}
        colors={colors}
        mutedColor={mutedColor}
      />

      {/* Navigation Buttons */}
      <View className="flex-row justify-between mt-4 pb-14 w-full">
        {prevExercise ? (
          <Button
            onPress={handlePrevPress}
            title={prevExercise.exercise.name}
            style="w-2/5"
          />
        ) : (
          <View style={{ width: "40%" }} />
        )}
        {nextExercise ? (
          <Button
            onPress={handleNextPress}
            title={nextExercise.exercise.name}
            style="w-2/5"
          />
        ) : (
          <Button
            onPress={confirmFinishWorkout}
            title="Finish Workout"
            style="w-2/5"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default WorkoutExercisePerformer;
