import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Exercise } from "@/Interfaces/sessionInterfaces";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import { getAllExercises } from "@/utils/db/exercise";

export default function TabTwoScreen() {
  const db = useSQLiteContext();
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  useEffect(() => {
    // Define an async function inside the useEffect hook
    async function fetchExercise() {
      try {
        const e = await getAllExercises(db);
        setExercises(e || null);
      } catch (error) {
        console.error(error);
      }
    }

    // Call the async function
    fetchExercise();
  }, [db]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      <Text>{exercises?.map((exercise) => exercise.name).join(", ")}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
