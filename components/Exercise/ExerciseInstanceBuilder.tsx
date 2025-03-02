import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import InputField from "@/components/Inputs/TextInput";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ButtonAsText from "../Buttons/ButtonAsText";

type ExerciseInstanceBuilderProps = {
  exerciseInstance: ExerciseInstance;
  onSetChange: (
    setIndex: number,
    field: "reps" | "weight",
    value: number
  ) => void;
  onAddSet: () => void;
  onInstanceDelete: () => void;
  onSetDelete: (setIndex: number) => void;
};

const ExerciseInstanceBuilder: React.FC<ExerciseInstanceBuilderProps> = ({
  exerciseInstance,
  onSetChange,
  onAddSet,
  onInstanceDelete,
  onSetDelete,
}) => {
  const [showExercise, setShowExercise] = React.useState(true);
  const { colors } = useTheme() as CustomTheme;

  const incrementReps = (value: number | null) => (value || 0) + 1;
  const decrementReps = (value: number | null) => Math.max((value || 0) - 1, 0);

  const incrementWeight = (value: number | null) => (value || 0) + 2.5;
  const decrementWeight = (value: number | null) =>
    Math.max((value || 0) - 2.5, 0);

  return (
    <View
      className={showExercise ? "rounded-2xl mb-5" : ""}
      style={showExercise ? { backgroundColor: colors.card } : undefined}
    >
      <TouchableOpacity
        className="flex-row items-center justify-between rounded-2xl h-10 px-2.5 mb-2.5"
        style={{ backgroundColor: colors.highlight }}
        onPress={() => setShowExercise(!showExercise)}
      >
        <Text className="text-lg font-bold">
          {exerciseInstance.exercise.name}
        </Text>
        <View className="flex-row items-center">
          <TouchableOpacity className="pr-5" onPress={onInstanceDelete}>
            <FontAwesome name="trash" size={20} />
          </TouchableOpacity>
          <FontAwesome
            name={showExercise ? "chevron-up" : "chevron-down"}
            size={20}
          />
        </View>
      </TouchableOpacity>

      {showExercise && (
        <>
          <View className="flex-row justify-between mb-2.5 mr-9">
            <View className="flex-row w-1/2 justify-center pr-2.5">
              <Text style={{ color: colors.text }}>Reps</Text>
            </View>
            <View className="flex-row w-1/2 justify-center">
              <Text style={{ color: colors.text }}>Weight</Text>
            </View>
          </View>

          {exerciseInstance.sets.map((set, setIndex) => (
            <View key={setIndex} className="flex-row justify-between mb-2.5">
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
                    color={colors.highlight}
                  />
                </TouchableOpacity>
                <InputField
                  placeholder="0"
                  className="w-15 text-center"
                  style={{ backgroundColor: colors.background }}
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
                    color={colors.highlight}
                  />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() =>
                    onSetChange(setIndex, "weight", decrementWeight(set.weight))
                  }
                  className="p-2.5"
                >
                  <FontAwesome
                    name="minus-circle"
                    size={30}
                    color={colors.highlight}
                  />
                </TouchableOpacity>
                <InputField
                  placeholder="0"
                  className="w-15 text-center"
                  style={{ backgroundColor: colors.background }}
                  value={set.weight === 0 ? "" : set.weight?.toString() || ""}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    onSetChange(setIndex, "weight", Number(value))
                  }
                />
                <TouchableOpacity
                  onPress={() =>
                    onSetChange(setIndex, "weight", incrementWeight(set.weight))
                  }
                  className="p-2.5"
                >
                  <FontAwesome
                    name="plus-circle"
                    size={30}
                    color={colors.highlight}
                  />
                </TouchableOpacity>
              </View>
              <View className="mr-2.5 justify-center">
                <TouchableOpacity onPress={() => onSetDelete(setIndex)}>
                  <FontAwesome name="trash" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <ButtonAsText
            title="Add Set"
            style="justify-center items-center h-8 mb-2.5"
            textStyle="text-xl"
            onPress={onAddSet}
          />
        </>
      )}
    </View>
  );
};

export default ExerciseInstanceBuilder;
