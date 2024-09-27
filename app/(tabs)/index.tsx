import { StyleSheet, ScrollView, Button } from "react-native";

import { Text, View } from "@/components/Themed";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import FiveDaysHistory from "@/components/fiveDaysHistory/FiveDaysHistory";
import BigButton from "@/components/Buttons/BigButton";
import ButtonAsText from "@/components/Buttons/ButtonAsText";

export default function TabTwoScreen() {
  const db = useSQLiteContext();

  const handlePress = () => {
    console.log("Button pressed!");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FiveDaysHistory />
        <View style={styles.buttons}>
          <BigButton
            title="Start Training"
            onPress={handlePress}
            style={styles.button}
          />
          <BigButton
            title="New Preset"
            onPress={handlePress}
            style={styles.button}
          />
        </View>
        <View style={styles.header}>
          <Text style={{ fontSize: 16 }}>Your Workouts</Text>
          <ButtonAsText title="View all" onPress={handlePress} />
        </View>
        <View style={styles.header}>
          <Text style={{ fontSize: 16 }}>Example Workouts</Text>
          <ButtonAsText title="View all" onPress={handlePress} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 40, paddingHorizontal: 20 },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "48%",
  },
});
