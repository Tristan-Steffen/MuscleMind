import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import { getAllExercises } from "@/utils/db/exercise";
import { Exercise } from "@/Interfaces/sessionInterfaces";
import { useSQLiteContext } from "expo-sqlite";
import SearchInput from "@/components/Inputs/SearchInput";
import ExerciseGroup from "@/components/Inputs/ExerciseGroup";

const ExerciseSelector: React.FC = () => {
  const db = useSQLiteContext();
  const { colors } = useTheme() as CustomTheme;
  const [searchValue, setSearchValue] = useState<string>("");
  const [groupedExercises, setGroupedExercises] = useState<Exercise[][] | null>(
    null
  );
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await getAllExercises(db);
      const grouped = response.reduce((acc: Exercise[][], exercise) => {
        const primaryMuscle =
          exercise.targetMuscles?.primary?.[0]?.name || "Unknown";
        const muscleGroupIndex = acc.findIndex(
          (group) =>
            group[0].targetMuscles?.primary?.[0]?.name === primaryMuscle
        );
        if (muscleGroupIndex > -1) {
          acc[muscleGroupIndex].push(exercise);
        } else {
          acc.push([exercise]);
        }
        return acc;
      }, []);

      setGroupedExercises(grouped);
    };

    fetchExercises();
  }, [db]);

  const handleExerciseSelect = (exercise: Exercise, selected: boolean) => {
    if (selected) {
      setSelectedExercises([...selectedExercises, exercise]);
    } else {
      setSelectedExercises(
        selectedExercises.filter((e) => e.id !== exercise.id)
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchInput
          placeholder="Search"
          value={searchValue}
          onChangeText={setSearchValue}
          style={{ marginBottom: 20 }}
        />
        {groupedExercises &&
          groupedExercises.map((group, index) => (
            <ExerciseGroup
              key={index}
              muscleGroup={
                group[0].targetMuscles?.primary?.[0]?.name || "Unknown"
              }
              exercises={group}
              onExerciseSelect={handleExerciseSelect}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
  exerciseText: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default ExerciseSelector;
