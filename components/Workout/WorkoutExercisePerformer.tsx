// src/components/Workout/WorkoutExercisePerformer.tsx
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Themed";
import { Exercise, ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PlannedSets } from "./PlannedSets";
import { CurrentSetInput } from "./CurrentSetInput";

type WorkoutExercisePerformerProps = {
  exerciseInstance: ExerciseInstance;
  onAddSet: () => void;
  colors: CustomTheme["colors"];
  onNavigateToInfo: (exercise: Exercise) => void;
};

const WorkoutExercisePerformer: React.FC<WorkoutExercisePerformerProps> = ({
  exerciseInstance,
  onAddSet,
  onNavigateToInfo,
  colors,
}) => {
  const currentSetIndex = exerciseInstance.sets.findIndex((set: Set) => !set.done);
  const currentSet = currentSetIndex !== -1 ? exerciseInstance.sets[currentSetIndex] : null;
  const mutedColor = "#999";

  return (
    <ScrollView className="p-4">
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

      {currentSet && (
        <CurrentSetInput
          currentSet={currentSet}
          currentSetIndex={currentSetIndex}
          colors={colors}
        />
      )}

      <PlannedSets
        sets={exerciseInstance.sets}
        currentSetIndex={currentSetIndex}
        onAddSet={onAddSet}
        colors={colors}
        mutedColor={mutedColor}
      />
    </ScrollView>
  );
};

export default WorkoutExercisePerformer;
