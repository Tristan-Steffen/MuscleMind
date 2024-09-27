import { StyleSheet, ScrollView } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import FiveDaysHistory from "@/components/fiveDaysHistory/FiveDaysHistory";

export default function TabTwoScreen() {
  const db = useSQLiteContext();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FiveDaysHistory />
        <View style={styles.separator} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", marginTop: 40 },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
