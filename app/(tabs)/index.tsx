import { StyleSheet, ScrollView } from "react-native";

import { Text, View } from "@/components/Themed";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import FiveDaysHistory from "@/components/fiveDaysHistory/FiveDaysHistory";
import BigButton from "@/components/Buttons/BigButton";
import ButtonAsText from "@/components/Buttons/ButtonAsText";
import { Session } from "@/Interfaces/sessionInterfaces";
import { useEffect, useState } from "react";
import { getAllSessions } from "@/utils/db/session";
import PresetCard from "@/components/preset/PresetCard";
import { router } from "expo-router";

export default function TabTwoScreen() {
  const db = useSQLiteContext();
  const [sessions, setSessions] = useState<Session[] | null>(null);

  useEffect(() => {
    async function loadSessions() {
      if (db) {
        const allSessions = await getAllSessions(db);
        setSessions(allSessions);
      }
    }
    loadSessions();
  }, [db]);

  const handlePress = () => {
    router.navigate({ pathname: "/template/templateBuilder" });
  };

  if (!sessions) return null;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FiveDaysHistory />
        <View style={styles.buttons}>
          <BigButton
            title="Start Training"
            href={{
              pathname: "/template/templates",
              params: { type: "custom" },
            }}
            style={styles.button}
          />
          <BigButton
            title="New Template"
            onPress={handlePress}
            style={styles.button}
          />
        </View>
        <View style={styles.header}>
          <Text style={{ fontSize: 16 }}>Your Templates</Text>
          <ButtonAsText
            title="View all"
            href={{
              pathname: "/template/templates",
              params: { type: "custom" },
            }}
          />
        </View>
        <View style={styles.header}>
          <Text style={{ fontSize: 16 }}>Example Templates</Text>
          <ButtonAsText
            title="View all"
            href={{
              pathname: "/template/templates",
              params: { type: "example" },
            }}
          />
        </View>
        <View style={styles.exampleWorkouts}>
          {sessions && sessions.length > 1 ? (
            <PresetCard session={sessions[0]} />
          ) : null}
          {sessions && sessions.length > 2 ? (
            <PresetCard session={sessions[1]} />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 40, paddingHorizontal: 20, height: "100%" },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  exampleWorkouts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 5,
  },
  button: {
    width: "48%",
  },
});
