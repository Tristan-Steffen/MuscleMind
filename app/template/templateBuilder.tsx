import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import InputField from "@/components/Inputs/TextInput";
import BigButton from "@/components/Buttons/BigButton";

const TemplateBuilder: React.FC = () => {
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");

  const handleAddExercises = () => {
    // Logic to add exercises to the template
    console.log("Add Exercises Button Pressed");
  };

  return (
    <View style={styles.container}>
      {/* Workout Title Input */}
      <InputField
        placeholder="Workout Title"
        value={workoutTitle}
        onChangeText={setWorkoutTitle}
      />

      {/* Workout Description Input */}
      <InputField
        placeholder="Workout Description"
        value={workoutDescription}
        onChangeText={setWorkoutDescription}
        multiline={true}
      />

      <BigButton
        title="Add Exercises"
        onPress={handleAddExercises}
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    marginTop: 20,
  },
});

export default TemplateBuilder;
