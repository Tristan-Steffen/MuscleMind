import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import PresetCard from "@/components/preset/PresetCard";
import { Text } from "@/components/Themed";
import { Session } from "@/Interfaces/sessionInterfaces";
import {
  getCustomPresetSessions,
  getExamplePresetSessions,
} from "@/utils/db/session";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

const Workouts: React.FC = () => {
  const local = useLocalSearchParams();
  const db = useSQLiteContext();
  const [sessions, setSessions] = useState<Session[] | null>(null);

  useEffect(() => {
    async function loadSession() {
      if (!db) return;
      if (local.type === "example") {
        const sessions = await getExamplePresetSessions(db);
        if (sessions) setSessions(sessions);
      }
      if (local.type === "custom") {
        const sessions = await getCustomPresetSessions(db);
        if (sessions) setSessions(sessions);
      }
    }
    loadSession();
  }, [db]);

  return (
    <ScrollView>
      {sessions && sessions.length > 0 ? (
        <View className="flex-row flex-wrap justify-between mx-2.5">
          {sessions.map((session, index) => (
            <PresetCard
              session={session}
              key={session.id || index}
              className="mt-4"
            />
          ))}
        </View>
      ) : (
        <View className="p-4">
          <Text>No sessions available</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Workouts;
