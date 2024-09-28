import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Session } from "@/Interfaces/sessionInterfaces";

type PresetCardProps = {
  session: Session;
};

const PresetCard: React.FC<PresetCardProps> = ({ session }) => {
  const lastIndex = session.exercise_instances.length - 1;

  return (
    <View style={styles.card}>
      <View style={styles.sessionNameContainer}>
        <Text style={styles.sessionName}>{session.name}</Text>
      </View>

      <View>
        {session.exercise_instances.map((exerciseInstance, index) => (
          <View
            key={exerciseInstance.exercise.id?.toString() || index}
            style={[
              styles.exerciseRow,
              { backgroundColor: index % 2 === 0 ? "#40455C" : "#383C4E" },
              index === lastIndex && styles.lastRow,
            ]}
          >
            <Text style={styles.exerciseName}>
              {exerciseInstance.exercise.name}
            </Text>
            <Text style={styles.setsCount}>
              {exerciseInstance.sets.length} sets
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#40455C",
    borderRadius: 25,
    width: "48%",
  },
  sessionNameContainer: {
    backgroundColor: "#505F9E",
    height: 40,
    borderRadius: 25,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  sessionName: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#fff",
  },
  exerciseRow: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    alignItems: "center",
  },
  lastRow: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  exerciseName: {
    fontSize: 12,
    color: "#fff",
  },
  setsCount: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#fff",
  },
});

export default PresetCard;
