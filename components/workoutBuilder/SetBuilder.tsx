import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Set } from "@/Interfaces/sessionInterfaces";

interface SetBuilderProps {
  set: Set;
  index: number;
  onUpdate: (updatedSet: Set) => void;
  onDelete: () => void;
}

export const SetBuilder: React.FC<SetBuilderProps> = ({
  set,
  onUpdate,
  index,
  onDelete,
}) => {
  const updateReps = (text: string) => {
    const updatedSet = { ...set, reps: parseInt(text) || 0 };
    onUpdate(updatedSet);
  };

  const updateWeight = (text: string) => {
    const updatedSet = { ...set, weight: parseInt(text) || 0 };
    onUpdate(updatedSet);
  };

  const updateRest = (text: string) => {
    const updatedSet = { ...set, rest: parseInt(text) || 0 };
    onUpdate(updatedSet);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <View style={styles.tile}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Set Nr: {index + 1}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Image
            source={require("../../assets/images/delete.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={set.reps ? set.reps.toString() : ""}
        onChangeText={updateReps}
        keyboardType="numeric"
        placeholder="Enter reps"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={set.weight ? set.weight.toString() : ""}
        onChangeText={updateWeight}
        keyboardType="numeric"
        placeholder="Enter weight"
        placeholderTextColor={"grey"}
      />
      <TextInput
        style={styles.input}
        value={set.rest ? set.rest.toString() : ""}
        onChangeText={updateRest}
        keyboardType="numeric"
        placeholder="Enter rest time"
        placeholderTextColor={"grey"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
});
