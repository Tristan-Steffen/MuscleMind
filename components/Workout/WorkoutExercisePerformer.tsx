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
  onSetDone: (setIndex: number) => void;
  onAddSet: () => void;
  onSetChange: (
    setIndex: number,
    field: "reps" | "weight" | "repsInReserve",
    value: number
  ) => void;
  colors: CustomTheme["colors"];
  onNavigateToInfo: (exercise: Exercise) => void;
};

const WorkoutExercisePerformer: React.FC<WorkoutExercisePerformerProps> = ({
  exerciseInstance,
  onSetDone,
  onAddSet,
  onSetChange,
  onNavigateToInfo,
  colors,
}) => {
  // Find the first unfinished set to use as the current one.
  const currentSetIndex = exerciseInstance.sets.findIndex((set: Set) => !set.done);
  const currentSet = currentSetIndex !== -1 ? exerciseInstance.sets[currentSetIndex] : null;

  // Define a muted text color for planned values.
  const mutedColor = "#999";

  return (
    <ScrollView className="p-4">
      {/* Exercise Header */}
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
          onSetChange={onSetChange}
          onSetDone={onSetDone}
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