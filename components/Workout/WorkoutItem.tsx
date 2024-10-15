import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Text } from "@/components/Themed";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";

// Placeholder image in case the exercise image is missing
const placeholderImage = require("@/assets/images/exercises/bench-press.png");

type WorkoutItemProps = {
  exerciseInstance: ExerciseInstance;
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({ exerciseInstance }) => {
  const { colors } = useTheme() as CustomTheme;

  // Uncomment to actually use real images
  //   const imageSource = exerciseInstance.exercise.custom
  //     ? { uri: exerciseInstance.exercise.image } // Use URI for user-uploaded images
  //     : require(`@/assets${exerciseInstance.exercise.image}`); // Use require for bundled assets

  return (
    <View style={styles.container}>
      <Image
        source={placeholderImage} // imageSource || placeholderImage to use real images
        style={styles.image}
        defaultSource={placeholderImage}
      />
      <View style={styles.content}>
        <Text style={[styles.exerciseName, { color: colors.text }]}>
          {exerciseInstance.exercise.name}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {exerciseInstance.sets.map((set, index) => (
            <View key={index} style={styles.setOval} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  setOval: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
});

export default WorkoutItem;
