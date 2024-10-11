import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import InputField from "@/components/Inputs/TextInput";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ButtonAsText from "../Buttons/ButtonAsText";

type ExerciseInstanceBuilderProps = {
  exerciseInstance: ExerciseInstance;
  onSetChange: (setIndex: number, field: string, value: number) => void;
  onAddSet: () => void;
  onInstanceDelete: () => void;
  onSetDelete: (setIndex: number) => void;
};

const ExerciseInstanceBuilder: React.FC<ExerciseInstanceBuilderProps> = ({
  exerciseInstance,
  onSetChange,
  onAddSet,
  onInstanceDelete,
  onSetDelete,
}) => {
  const [showExercise, setShowExercise] = React.useState(true);
  const { colors } = useTheme() as CustomTheme;

  const incrementReps = (value: number | null) => (value || 0) + 1;
  const decrementReps = (value: number | null) => Math.max((value || 0) - 1, 0);

  const incrementWeigth = (value: number | null) => (value || 0) + 2.5;
  const decrementWeigth = (value: number | null) =>
    Math.max((value || 0) - 2.5, 0);

  return (
    <View
      style={
        showExercise
          ? [styles.container, { backgroundColor: colors.card }]
          : null
      }
    >
      <TouchableOpacity
        style={[styles.header, { backgroundColor: colors.lightBackground }]}
        onPress={() => {
          setShowExercise(!showExercise);
        }}
      >
        <Text style={[styles.exerciseName]}>
          {exerciseInstance.exercise.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ paddingRight: 20 }}
            onPress={() => {
              onInstanceDelete();
            }}
          >
            <FontAwesome name="trash" size={20} />
          </TouchableOpacity>
          <FontAwesome
            name={showExercise ? "chevron-up" : "chevron-down"}
            size={20}
          />
        </View>
      </TouchableOpacity>
      {showExercise && (
        <>
          <View style={styles.setsHeaderContainer}>
            <View style={[styles.setsHeader, { paddingRight: 10 }]}>
              <Text style={{ color: colors.text }}>Reps</Text>
            </View>
            <View style={styles.setsHeader}>
              <Text style={{ color: colors.text }}>Weight</Text>
            </View>
          </View>

          {exerciseInstance.sets.map((set, setIndex) => (
            <View key={setIndex} style={styles.setContainer}>
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  onPress={() =>
                    onSetChange(setIndex, "reps", decrementReps(set.reps))
                  }
                  style={styles.button}
                >
                  <FontAwesome
                    name={"minus-circle"}
                    size={30}
                    color={colors.lightBackground}
                  />
                </TouchableOpacity>
                <InputField
                  placeholder="0"
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: colors.background,
                    },
                  ]}
                  value={set.reps === 0 ? "" : set.reps?.toString() || ""}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    onSetChange(setIndex, "reps", Number(value))
                  }
                />
                <TouchableOpacity
                  onPress={() =>
                    onSetChange(setIndex, "reps", incrementReps(set.reps))
                  }
                  style={styles.button}
                >
                  <FontAwesome
                    name="plus-circle"
                    size={30}
                    color={colors.lightBackground}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <TouchableOpacity
                  onPress={() =>
                    onSetChange(setIndex, "weight", decrementWeigth(set.weight))
                  }
                  style={styles.button}
                >
                  <FontAwesome
                    name={"minus-circle"}
                    size={30}
                    color={colors.lightBackground}
                  />
                </TouchableOpacity>
                <InputField
                  placeholder="0"
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: colors.background,
                    },
                  ]}
                  value={set.weight === 0 ? "" : set.weight?.toString() || ""}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    onSetChange(setIndex, "weight", Number(value))
                  }
                />
                <TouchableOpacity
                  onPress={() =>
                    onSetChange(setIndex, "weight", incrementWeigth(set.weight))
                  }
                  style={styles.button}
                >
                  <FontAwesome
                    name="plus-circle"
                    size={30}
                    color={colors.lightBackground}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.trashContainer}>
                <TouchableOpacity
                  onPress={() => {
                    onSetDelete(setIndex);
                  }}
                >
                  <FontAwesome name="trash" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <ButtonAsText
            title="Add Set"
            style={styles.buttonAsText}
            textStyle={{ fontSize: 20 }}
            onPress={() => {
              onAddSet();
            }}
          ></ButtonAsText>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "space-between",
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
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
  inputField: {
    width: 60,
    textAlign: "center",
    paddingHorizontal: 0,
  },
  button: {
    padding: 10,
  },
  buttonAsText: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginBottom: 10,
  },
  trashContainer: {
    marginRight: 10,
    justifyContent: "center",
  },
  setsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginRight: 36,
  },
  setsHeader: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
  },
});

export default ExerciseInstanceBuilder;
