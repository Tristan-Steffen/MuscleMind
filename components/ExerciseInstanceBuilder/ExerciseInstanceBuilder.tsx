import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import InputField from "@/components/Inputs/TextInput";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type ExerciseInstanceBuilderProps = {
  exerciseInstance: ExerciseInstance;
  onSetChange: (setIndex: number, field: string, value: number) => void;
};

const ExerciseInstanceBuilder: React.FC<ExerciseInstanceBuilderProps> = ({
  exerciseInstance,
  onSetChange,
}) => {
  const { colors } = useTheme() as CustomTheme;

  const incrementValue = (value: number | null) => (value || 0) + 1;
  const decrementValue = (value: number | null) =>
    Math.max((value || 0) - 1, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={styles.exerciseName}>{exerciseInstance.exercise.name}</Text>

      {exerciseInstance.sets.map((set, setIndex) => (
        <View key={setIndex} style={styles.setContainer}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() =>
                onSetChange(setIndex, "reps", decrementValue(set.reps))
              }
              style={styles.button}
            >
              <FontAwesome name="minus" size={20} color={colors.text} />
            </TouchableOpacity>
            <InputField
              placeholder="0"
              style={{
                width: 60,
                textAlign: "center",
                backgroundColor: colors.background,
              }}
              value={set.reps?.toString() || ""}
              keyboardType="numeric"
              onChangeText={(value) =>
                onSetChange(setIndex, "reps", Number(value))
              }
            />
            <TouchableOpacity
              onPress={() =>
                onSetChange(setIndex, "reps", incrementValue(set.reps))
              }
              style={styles.button}
            >
              <FontAwesome name="plus" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Weight Control */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() =>
                onSetChange(setIndex, "weight", decrementValue(set.weight))
              }
              style={styles.button}
            >
              <FontAwesome name="minus" size={20} color={colors.text} />
            </TouchableOpacity>
            <InputField
              placeholder="0"
              style={{
                width: 60,
                textAlign: "center",
                backgroundColor: colors.background,
              }}
              value={set.weight?.toString() || ""}
              keyboardType="numeric"
              onChangeText={(value) =>
                onSetChange(setIndex, "weight", Number(value))
              }
            />
            <TouchableOpacity
              onPress={() =>
                onSetChange(setIndex, "weight", incrementValue(set.weight))
              }
              style={styles.button}
            >
              <FontAwesome name="plus" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  setContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 10,
  },
});

export default ExerciseInstanceBuilder;
