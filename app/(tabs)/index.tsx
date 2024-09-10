import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { SessionDisplay } from "@/components/workoutDisplay/SessionDisplay";
import { useSQLiteContext } from "expo-sqlite";
import { getAllPopulatedSessions } from "@/utils/db/session";
import { Session } from "@/Interfaces/sessionInterfaces";
import { getAllExerciseInstances } from "@/utils/db/exerciseInstance";
import { getAllSets } from "@/utils/db/set";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [sessions, setSessions] = useState<Session[] | null>(null);

  useEffect(() => {
    async function loadSessions() {
      if (db) {
        console.log("start loading sessions");
        const allSessions = await getAllPopulatedSessions(db);
        setSessions(allSessions);
        console.log("allSessions", allSessions);
        const instances = await getAllExerciseInstances(db);
        console.log("instances", instances);
        const sets = await getAllSets(db);
        console.log("sets", sets);
      }
    }

    loadSessions();
  }, [db]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollable}
        showsVerticalScrollIndicator={false}
      >
        {sessions && sessions.length > 1 ? (
          sessions.map((session) => (
            <SessionDisplay key={session.id} session={session} />
          ))
        ) : (
          <Text style={styles.title}>No sessions available</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
