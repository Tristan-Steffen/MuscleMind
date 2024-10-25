import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, ScrollView, View } from "react-native";
import { Exercise } from "@/Interfaces/sessionInterfaces"; // Import the Exercise interface
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import ImageCollection from "@/utils/imageCollection"; // Collection of images
import { useLocalSearchParams } from "expo-router";
import { getExerciseById } from "@/utils/db/exercise";
import { useSQLiteContext } from "expo-sqlite";

const ExerciseInfo: React.FC = () => {
  const [exercise, setExercise] = useState<Exercise | null>();
  const { colors } = useTheme() as CustomTheme;
  const local = useLocalSearchParams();
  const db = useSQLiteContext();

  useEffect(() => {
    async function loadSessions() {
      if (db && local) {
        const exerciseFromDb = await getExerciseById(
          db,
          Number(local.exerciseID)
        );
        setExercise(exerciseFromDb);
      }
    }
    loadSessions();
  }, [db, local.exerciseID]);

  if (!exercise) return null;
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.textField,
          {
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          {exercise.name}
        </Text>
      </View>
      <View
        style={[
          styles.textField,
          {
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.description, { color: colors.text }]}>
          {exercise.description}
        </Text>
      </View>
      {exercise.image ? (
        <Image
          source={
            ImageCollection[exercise.name as keyof typeof ImageCollection] || {
              uri: exercise.image,
            }
          }
          style={styles.image}
          defaultSource={ImageCollection["placeholderImage"]}
        />
      ) : (
        <Image
          source={ImageCollection["placeholderImage"]}
          style={styles.image}
        />
      )}

      {exercise.targetMuscles && (
        <>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Target Muscles
          </Text>

          <Text style={[styles.subTitle, { color: colors.text }]}>
            Primary:
          </Text>
          {exercise.targetMuscles.primary.length > 0 ? (
            <Text style={[styles.muscleText, { color: colors.text }]}>
              {exercise.targetMuscles.primary
                .map((muscle) => muscle.name)
                .join(", ")}
            </Text>
          ) : (
            <Text style={[styles.muscleText, { color: colors.text }]}>
              None
            </Text>
          )}

          <Text style={[styles.subTitle, { color: colors.text }]}>
            Secondary:
          </Text>
          {exercise.targetMuscles.secondary.length > 0 ? (
            <Text style={[styles.muscleText, { color: colors.text }]}>
              {exercise.targetMuscles.secondary
                .map((muscle) => muscle.name)
                .join(", ")}
            </Text>
          ) : (
            <Text style={[styles.muscleText, { color: colors.text }]}>
              None
            </Text>
          )}
        </>
      )}

      {exercise.cues && exercise.cues.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Cues
          </Text>
          {exercise.cues.map((cue, index) => (
            <Text key={index} style={[styles.cueText, { color: colors.text }]}>
              {index + 1}. {cue}
            </Text>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textField: {
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  muscleText: {
    fontSize: 14,
    marginBottom: 8,
  },
  cueText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default ExerciseInfo;
