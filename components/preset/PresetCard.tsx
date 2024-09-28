import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Session } from "@/Interfaces/sessionInterfaces";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";

type PresetCardProps = {
  session: Session;
  style?: object;
};

const PresetCard: React.FC<PresetCardProps> = ({ session, style }) => {
  const lastIndex = session.exercise_instances.length - 1;
  const { colors } = useTheme() as CustomTheme;

  return (
    <View
      style={[styles.card, style, { backgroundColor: colors.darkBackground }]}
    >
      <View
        style={[
          styles.sessionNameContainer,
          { backgroundColor: colors.basicButton },
        ]}
      >
        <Text style={[styles.sessionName, { color: colors.text }]}>
          {session.name}
        </Text>
      </View>

      <View>
        {session.exercise_instances.map((exerciseInstance, index) => (
          <View
            key={exerciseInstance.exercise.id?.toString() || index}
            style={[
              styles.exerciseRow,
              {
                backgroundColor:
                  index % 2 === 0
                    ? colors.darkBackground
                    : colors.darkerBackground,
              },
              index === lastIndex && styles.lastRow,
            ]}
          >
            <Text style={[styles.exerciseName, { color: colors.text }]}>
              {exerciseInstance.exercise.name}
            </Text>
            <Text style={[styles.setsCount, { color: colors.text }]}>
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
    borderRadius: 25,
    width: "48%",
  },
  sessionNameContainer: {
    height: 40,
    borderRadius: 25,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  sessionName: {
    fontSize: 16,
    fontWeight: "semibold",
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
  },
  setsCount: {
    fontSize: 12,
    fontWeight: "medium",
  },
});

export default PresetCard;
