import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { getSession } from "@/utils/db/session";
import { SessionEditor } from "@/components/workoutEditor/SessionEditor";
import { Session } from "@/Interfaces/sessionInterfaces";

export default function EditSessionPage() {
  const local = useLocalSearchParams();
  const db = useSQLiteContext();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function loadSession() {
      if (db) {
        let session = await getSession(db, parseInt(local.id[0]));
        session ? setSession(session) : null;
      }
    }
    loadSession();
  }, [local.id[0]]);

  return (
    <View style={styles.container}>
      {session ? <SessionEditor session={session}></SessionEditor> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
