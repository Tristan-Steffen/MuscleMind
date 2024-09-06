// SetDisplay.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Set } from "@/Interfaces/sessionInterfaces";

interface SetDisplayProps {
  set: Set;
}

export const SetDisplay: React.FC<SetDisplayProps> = ({ set }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reps: {set.reps}</Text>
      <Text style={styles.text}>Weight: {set.weight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
