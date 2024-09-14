import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { SessionDisplay } from "@/components/workoutDisplay/SessionDisplay";
import { useSQLiteContext } from "expo-sqlite";
import { deleteSession, getAllPopulatedSessions } from "@/utils/db/session";
import { Session } from "@/Interfaces/sessionInterfaces";
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [sessions, setSessions] = useState<Session[] | null>(null);
  async function loadSessions() {
    if (db) {
      const allSessions = await getAllPopulatedSessions(db);
      setSessions(allSessions);
    }
  }

  useEffect(() => {
    loadSessions();
  }, [db]);

  useFocusEffect(
    React.useCallback(() => {
      loadSessions();
    }, [])
  );

  const onDeleteSession = (id: number) => {
    if (db) {
      deleteSession(db, id).then(() => {
        loadSessions();
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollable}
        showsVerticalScrollIndicator={false}
      >
        {sessions && sessions.length > 1 ? (
          sessions.map((session) => (
            <SessionDisplay
              key={session.id}
              session={session}
              onDelete={(id: number) => onDeleteSession(id)}
            />
          ))
        ) : (
          <Text style={styles.title}>No sessions available</Text>
        )}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollable: {
    width: "100%",
    padding: 60,
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
  bottomSpacer: {
    height: 60, // Adjust the height to your needs
  },
});
