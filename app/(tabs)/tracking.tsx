import { StyleSheet, ScrollView } from "react-native";

import { Text, View } from "@/components/Themed";
import { Exercise } from "@/Interfaces/sessionInterfaces";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import { getAllExercises } from "@/utils/db/exercise";
import { SessionBuilder } from "@/components/workoutBuilder/SessionBuilder";

export default function TabTwoScreen() {
  const db = useSQLiteContext();
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  useEffect(() => {
    async function fetchExercise() {
      try {
        const e = await getAllExercises(db);
        setExercises(e || null);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExercise();
  }, [db]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollable}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Workouts</Text>
        <SessionBuilder />
        <View style={styles.separator} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  scrollable: { width: "100%", padding: 60 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
