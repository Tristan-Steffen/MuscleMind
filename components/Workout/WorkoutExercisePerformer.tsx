import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Themed";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import InputField from "@/components/Inputs/TextInput";
import BigButton from "../Buttons/BigButton";

type WorkoutExercisePerformerProps = {
  exerciseInstance: ExerciseInstance;
  onSetDone: (setIndex: number) => void;
  onAddSet: () => void;
  onBackToWorkout: () => void;
  onSetChange: (
    setIndex: number,
    field: "reps" | "weight",
    value: number
  ) => void;
  colors: CustomTheme["colors"];
};

const WorkoutExercisePerformer: React.FC<WorkoutExercisePerformerProps> = ({
  exerciseInstance,
  onSetDone,
  onAddSet,
  onBackToWorkout,
  onSetChange,
  colors,
}) => {
  const incrementReps = (value: number | null) => (value || 0) + 1;
  const decrementReps = (value: number | null) => Math.max((value || 0) - 1, 0);

  return (
    <ScrollView>
      <View
        className="p-5 rounded-lg my-2.5"
        style={{ backgroundColor: colors.card }}
      >
        {/* Back to Workout Button */}
        <TouchableOpacity
          onPress={onBackToWorkout}
          className="flex-row items-center mb-5"
        >
          <FontAwesome name="arrow-left" size={24} color={colors.text} />
          <Text className="text-xl ml-2" style={{ color: colors.text }}>
            Back to Workout
          </Text>
        </TouchableOpacity>

        {/* Exercise Name */}
        <Text className="text-2xl font-bold mb-5" style={{ color: colors.text }}>
          {exerciseInstance.exercise.name}
        </Text>

        {/* Reps and Weight Headers */}
        <View className="flex-row justify-between mb-2.5 mr-9">
          <View className="flex-row w-1/2 justify-center">
            <Text className="text-base font-bold" style={{ color: colors.text }}>
              Reps
            </Text>
          </View>
          <View className="flex-row w-1/2 justify-center">
            <Text className="text-base font-bold" style={{ color: colors.text }}>
              Weight
            </Text>
          </View>
        </View>

        {/* Sets List */}
        <View className="flex-col">
          {exerciseInstance.sets.map((set: Set, setIndex: number) => (
            <View
              key={setIndex}
              className="flex-row items-center justify-between mb-4"
            >
              <View className="flex-row">
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={() =>
                      onSetChange(setIndex, "reps", decrementReps(set.reps))
                    }
                    className="p-2.5"
                  >
                    <FontAwesome
                      name="minus-circle"
                      size={30}
                      color={colors.lightBackground}
                    />
                  </TouchableOpacity>
                  <InputField
                    placeholder="0"
                    className="w-[60px] text-center"
                    style={{
                      backgroundColor: colors.background,
                      color: colors.text,
                    }}
                    value={set.reps === 0 ? "" : set.reps?.toString() || ""}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      onSetChange(setIndex, "reps", Number(value))
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      onSetChange(setIndex, "reps", incrementReps(set.reps))
                    }
                    className="p-2.5"
                  >
                    <FontAwesome
                      name="plus-circle"
                      size={30}
                      color={colors.lightBackground}
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center">
                  <InputField
                    placeholder="0"
                    className="w-[60px] text-center"
                    style={{
                      backgroundColor: colors.background,
                      color: colors.text,
                    }}
                    value={
                      set.weight === 0 ? "" : set.weight?.toString() || ""
                    }
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      onSetChange(setIndex, "weight", Number(value))
                    }
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => onSetDone(setIndex)}
                className="p-2.5 rounded-full justify-center items-center"
                style={{
                  backgroundColor: set.done ? colors.success : colors.border,
                }}
              >
                <FontAwesome
                  name={set.done ? "check-circle" : "circle"}
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <BigButton
          title="Add Set"
          onPress={onAddSet}
        />
      </View>
    </ScrollView>
  );
};

export default WorkoutExercisePerformer;
