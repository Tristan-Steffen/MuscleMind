import React from "react";
import { ScrollView, TouchableOpacity, View, Alert } from "react-native";
import { Text } from "@/components/Themed";
import { Exercise, ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PlannedSets } from "./PlannedSets";
import { CurrentSetInput } from "./CurrentSetInput";
import { useWorkoutContext } from "@/context/WorkoutContext";
import Button from "../Buttons/Button";

type WorkoutExercisePerformerProps = {
  exerciseInstance: ExerciseInstance;
  onAddSet: () => void;
  // Removed colors prop—Tailwind classes now handle colors.
  onNavigateToInfo: (exercise: Exercise) => void;
  onFinishWorkout: () => void;
};

const WorkoutExercisePerformer: React.FC<WorkoutExercisePerformerProps> = ({
  exerciseInstance,
  onAddSet,
  onNavigateToInfo,
  onFinishWorkout,
}) => {
  const currentSetIndex = exerciseInstance.sets.findIndex((set: Set) => !set.done);
  const currentSet = currentSetIndex !== -1 ? exerciseInstance.sets[currentSetIndex] : null;
  // Use a Tailwind class for muted text (ensure "text-muted" is defined in your config)
  const mutedColorClass = "text-muted";

  const { selectedWorkoutInstances, setselectedWorkoutInstance } = useWorkoutContext();

  const currentIndex = selectedWorkoutInstances.findIndex(
    (instance) => instance.exercise.id === exerciseInstance.exercise.id
  );
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
      <View className="border-b mb-5 flex-row items-center justify-between border-border">
        <Text className="text-2xl font-bold text-text">
          {exerciseInstance.exercise.name}
        </Text>
        <TouchableOpacity onPress={() => onNavigateToInfo(exerciseInstance.exercise)}>
          <FontAwesome name="info-circle" size={26} color="var(--color-lightBackground)" />
        </TouchableOpacity>
      </View>

      {/* Current Set Input */}
      {currentSet && (
        <CurrentSetInput
          currentSet={currentSet}
          currentSetIndex={currentSetIndex}
        // Assuming CurrentSetInput has been updated similarly
        />
      )}

      {/* Planned Sets */}
      <PlannedSets
        sets={exerciseInstance.sets}
        currentSetIndex={currentSetIndex}
        onAddSet={onAddSet}
      />

      {/* Navigation Buttons */}
      <View className="flex-row justify-between mt-4 pb-14 w-full">
        {prevExercise ? (
          <Button onPress={handlePrevPress} title={prevExercise.exercise.name} style="w-2/5" />
        ) : (
          <View style={{ width: "40%" }} />
        )}
        {nextExercise ? (
          <Button onPress={handleNextPress} title={nextExercise.exercise.name} style="w-2/5" />
        ) : (
          <Button onPress={confirmFinishWorkout} title="Finish Workout" style="w-2/5" />
        )}
      </View>
    </ScrollView>
  );
};

export default WorkoutExercisePerformer;
