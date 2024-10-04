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
  const [allExercises, setAllExercises] = useState<Exercise[] | null>(null);
  const [groupedExercises, setGroupedExercises] = useState<Exercise[][] | null>(
    null
  );
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await getAllExercises(db);
      setAllExercises(response);
      setGroupedExercises(groupExercises(response));
    };

    fetchExercises();
  }, [db]);

  const groupExercises = (exercises: Exercise[]) => {
    return exercises.reduce((acc: Exercise[][], exercise) => {
      const primaryMuscle =
        exercise.targetMuscles?.primary?.[0]?.name || "Unknown";
      const muscleGroupIndex = acc.findIndex(
        (group) => group[0].targetMuscles?.primary?.[0]?.name === primaryMuscle
      );
      if (muscleGroupIndex > -1) {
        acc[muscleGroupIndex].push(exercise);
      } else {
        acc.push([exercise]);
      }
      return acc;
    }, []);
  };

  const handleExerciseSelect = (exercise: Exercise, selected: boolean) => {
    if (selected) {
      setSelectedExercises([...selectedExercises, exercise]);
    } else {
      setSelectedExercises(
        selectedExercises.filter((e) => e.id !== exercise.id)
      );
    }
  };

  const onSearch = (value: string) => {
    setSearchValue(value);

    if (!value) {
      setGroupedExercises(groupExercises(allExercises!));
    } else {
      const filteredExercises = allExercises?.filter((exercise) =>
        exercise.name.toLowerCase().includes(value.toLowerCase())
      );
      setGroupedExercises(groupExercises(filteredExercises!));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchInput
          placeholder="Search"
          value={searchValue}
          onChangeText={onSearch}
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
