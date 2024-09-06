// ExerciseInstanceDisplay.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { SetDisplay } from "./SetDisplay";

interface ExerciseInstanceDisplayProps {
  exerciseInstance: ExerciseInstance;
}

export const ExerciseInstanceDisplay: React.FC<
  ExerciseInstanceDisplayProps
> = ({ exerciseInstance }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exerciseInstance.exercise.data.name}</Text>
      <Text style={styles.description}>
        {exerciseInstance.exercise.data.description}
      </Text>
      <View style={styles.setList}>
        {exerciseInstance.sets.map((set, index) => (
          <SetDisplay key={index} set={set} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  setList: {
    marginTop: 5,
  },
});
