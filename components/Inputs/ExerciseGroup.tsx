import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Exercise } from "@/Interfaces/sessionInterfaces";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

type ExerciseGroupProps = {
  muscleGroup: string;
  exercises: Exercise[];
  selectedExercises: Exercise[];
  onExerciseSelect: (exercise: Exercise, selected: boolean) => void;
};

const ExerciseGroup: React.FC<ExerciseGroupProps> = ({
  muscleGroup,
  exercises,
  selectedExercises,
  onExerciseSelect,
}) => {
  const { colors } = useTheme() as CustomTheme;

  const isExerciseSelected = (exerciseId: number) =>
    selectedExercises.some((exercise) => exercise.id === exerciseId);

  const toggleExerciseSelection = (exercise: Exercise) => {
    const alreadySelected = isExerciseSelected(exercise.id!);
    onExerciseSelect(exercise, !alreadySelected);
  };

  const navigateToInfoPage = (exercise: Exercise) => {
    router.navigate({
      pathname: "/exercises/exerciseInfo",
      params: { exerciseID: exercise.id },
    });
  };

  return (
    <View className="mb-5">
      <Text className="text-lg font-bold my-2.5" style={{ color: colors.text }}>
        {muscleGroup}
      </Text>
      <View className="border rounded-3xl" style={{ borderColor: colors.border }}>
        {exercises.map((exercise, index) => (
          <View key={index}>
            {index !== 0 && (
              <View
                className="h-px mx-4 border-b"
                style={{ borderColor: colors.border }}
              />
            )}
            <TouchableOpacity
              className="flex-row items-center py-3 pl-4"
              onPress={() => toggleExerciseSelection(exercise)}
            >
              <View
                className="w-5 h-5 rounded-full mr-2.5 border"
                style={{
                  backgroundColor: isExerciseSelected(exercise.id!)
                    ? colors.primary
                    : colors.background,
                  borderColor: colors.text,
                }}
              />
              <View className="flex-row justify-between w-[90%] pr-5">
                <Text className="text-base" style={{ color: colors.text }}>
                  {exercise.name}
                </Text>
                <TouchableOpacity
                  className="w-5 items-center"
                  onPress={() => navigateToInfoPage(exercise)}
                >
                  <FontAwesome
                    name="info"
                    size={20}
                    color={colors.lightBackground}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ExerciseGroup;
