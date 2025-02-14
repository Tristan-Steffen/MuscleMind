import React, { useEffect, useState } from "react";
import { ScrollView, Image, View } from "react-native";
import { Text } from "@/components/Themed";
import { Exercise } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import ImageCollection from "@/utils/imageCollection";
import { useLocalSearchParams } from "expo-router";
import { getExerciseById } from "@/utils/db/exercise";
import { useSQLiteContext } from "expo-sqlite";

const ExerciseInfo: React.FC = () => {
  const [exercise, setExercise] = useState<Exercise | null>();
  const { colors } = useTheme() as CustomTheme;
  const local = useLocalSearchParams();
  const db = useSQLiteContext();

  useEffect(() => {
    async function loadExercise() {
      if (db && local) {
        const exerciseFromDb = await getExerciseById(db, Number(local.exerciseID));
        setExercise(exerciseFromDb);
      }
    }
    loadExercise();
  }, [db, local.exerciseID]);

  if (!exercise) return null;
  return (
    <ScrollView
      className="flex-1 p-4"
      style={{ backgroundColor: colors.background }}
    >
      {/* Title Field */}
      <View
        className="h-12 border rounded-full px-4 justify-center mb-4"
        style={{ borderColor: colors.border }}
      >
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          {exercise.name}
        </Text>
      </View>

      {/* Description Field */}
      <View
        className="h-12 border rounded-full px-4 justify-center mb-4"
        style={{ borderColor: colors.border }}
      >
        <Text className="text-base leading-6" style={{ color: colors.text }}>
          {exercise.description}
        </Text>
      </View>

      {/* Image */}
      {exercise.image ? (
        <Image
          source={
            ImageCollection[exercise.name as keyof typeof ImageCollection] || {
              uri: exercise.image,
            }
          }
          className="w-full h-[200px] rounded-lg mb-4"
          defaultSource={ImageCollection["placeholderImage"]}
        />
      ) : (
        <Image
          source={ImageCollection["placeholderImage"]}
          className="w-full h-[200px] rounded-lg mb-4"
        />
      )}

      {/* Target Muscles */}
      {exercise.targetMuscles && (
        <>
          <Text className="text-lg font-bold mb-2" style={{ color: colors.text }}>
            Target Muscles
          </Text>

          <Text className="text-base font-semibold mb-1" style={{ color: colors.text }}>
            Primary:
          </Text>
          {exercise.targetMuscles.primary.length > 0 ? (
            <Text className="text-sm mb-2" style={{ color: colors.text }}>
              {exercise.targetMuscles.primary.map((muscle) => muscle.name).join(", ")}
            </Text>
          ) : (
            <Text className="text-sm mb-2" style={{ color: colors.text }}>
              None
            </Text>
          )}

          <Text className="text-base font-semibold mb-1" style={{ color: colors.text }}>
            Secondary:
          </Text>
          {exercise.targetMuscles.secondary.length > 0 ? (
            <Text className="text-sm mb-2" style={{ color: colors.text }}>
              {exercise.targetMuscles.secondary.map((muscle) => muscle.name).join(", ")}
            </Text>
          ) : (
            <Text className="text-sm mb-2" style={{ color: colors.text }}>
              None
            </Text>
          )}
        </>
      )}

      {/* Cues */}
      {exercise.cues && exercise.cues.length > 0 && (
        <>
          <Text className="text-lg font-bold mb-2" style={{ color: colors.text }}>
            Cues
          </Text>
          {exercise.cues.map((cue, index) => (
            <Text key={index} className="text-sm mb-1" style={{ color: colors.text }}>
              {index + 1}. {cue}
            </Text>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default ExerciseInfo;
