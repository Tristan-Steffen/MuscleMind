import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import { Line } from "react-native-svg";

// Placeholder image in case the exercise image is missing
const placeholderImage = require("@/assets/images/exercises/bench-press.png");

type WorkoutItemProps = {
  exerciseInstance: ExerciseInstance;
  colors: CustomTheme["colors"];
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({
  exerciseInstance,
  colors,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.darkerBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <Image
        source={placeholderImage}
        style={styles.image}
        defaultSource={placeholderImage}
      />
      <View style={styles.content}>
        <Text style={[styles.exerciseName, { color: colors.text }]}>
          {exerciseInstance.exercise.name}
        </Text>
        <View style={[styles.line, { borderColor: colors.border }]}></View>
        <View style={styles.sets}>
          {exerciseInstance.sets.map((set, index) => (
            <View key={index} style={styles.setOval} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 20,
    margin: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sets: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    alignItems: "center",
  },
  setOval: {
    flex: 1,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginRight: 5,
  },
  line: {
    borderBottomWidth: 1,
    marginVertical: 8,
    marginRight: 15,
  },
});

export default WorkoutItem;
