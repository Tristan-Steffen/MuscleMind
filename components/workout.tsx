import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import ExerciseItem from "@/components/Exercise/ExerciseItem";

const Workout: React.FC = () => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.noExerciseText}>No exercises selected.</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 100, // Extra space for scrolling
  },
  noExerciseText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
});

export default Workout;
