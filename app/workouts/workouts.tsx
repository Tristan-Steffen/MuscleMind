import PresetCard from "@/components/preset/PresetCard";
import { View, Text } from "@/components/Themed";
import { Session } from "@/Interfaces/sessionInterfaces";
import {
  getCustomPresetSessions,
  getExamplePresetSessions,
} from "@/utils/db/session";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const Workouts: React.FC = () => {
  const local = useLocalSearchParams();
  const db = useSQLiteContext();
  const [sessions, setSessions] = useState<Session[] | null>(null);

  useEffect(() => {
    async function loadSession() {
      if (!db) return;
      if (local.type === "example") {
        let sessions = await getExamplePresetSessions(db);
        sessions ? setSessions(sessions) : null;
      }
      if (local.type === "custom") {
        let sessions = await getCustomPresetSessions(db);
        sessions ? setSessions(sessions) : null;
      }
    }
    loadSession();
  }, [db]);

  return (
    <ScrollView>
      {sessions && sessions.length > 0 ? (
        <View style={styles.gridContainer}>
          {sessions.map((session, index) => (
            <PresetCard
              session={session}
              key={session.id || index}
              style={styles.card}
            />
          ))}
        </View>
      ) : (
        <View>
          <Text>No sessions available</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  card: {
    marginTop: 15,
  },
});

export default Workouts;
