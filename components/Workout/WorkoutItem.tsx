import React, { memo } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import ImageCollection from "@/utils/imageCollection";

type WorkoutItemProps = {
  exerciseInstance: ExerciseInstance;
  colors: CustomTheme["colors"];
  onPress: () => void;
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({
  exerciseInstance,
  colors,
  onPress,
}) => {
  console.log(exerciseInstance.exercise.name);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.darkerBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <Image
        source={
          exerciseInstance.exercise.image
            ? ImageCollection[
                exerciseInstance.exercise.name as keyof typeof ImageCollection
              ]
            : ImageCollection["placeholderImage"]
        }
        style={styles.image}
        defaultSource={ImageCollection["placeholderImage"]}
      />
      <View style={styles.content}>
        <Text style={[styles.exerciseName, { color: colors.text }]}>
          {exerciseInstance.exercise.name}
        </Text>
        <View style={[styles.line, { borderColor: colors.border }]}></View>
        <View style={styles.sets}>
          {exerciseInstance.sets.map((set, index) => (
            <View
              key={index}
              style={[
                styles.setOval,
                set.done ? { backgroundColor: colors.success } : null,
              ]}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
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

export default memo(WorkoutItem);
