import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function SessionDetailsPage() {
  const local = useLocalSearchParams();

  console.log("Local:", local.id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Details</Text>
      <Text>Session ID: {local.id}</Text>
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
