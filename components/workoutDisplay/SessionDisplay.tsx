import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Session } from "@/Interfaces/sessionInterfaces";
import { ExerciseInstanceDisplay } from "./ExerciseInstanceDisplay";
import { Link } from "expo-router";

interface SessionDisplayProps {
  session: Session;
}

export const SessionDisplay: React.FC<SessionDisplayProps> = ({ session }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{session.name}</Text>
      <Text style={styles.description}>{session.description}</Text>
      <View style={styles.instanceList}>
        {session.exercise_instances
          ? session.exercise_instances.map((instance, index) => (
              <ExerciseInstanceDisplay
                key={index}
                exerciseInstance={instance}
              />
            ))
          : null}
      </View>
      <Link
        href={{
          pathname: "/session/[id]",
          params: { id: session.id! },
        }}
      >
        Edit Session
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: "#555",
  },
  instanceList: {
    marginTop: 10,
  },
});
