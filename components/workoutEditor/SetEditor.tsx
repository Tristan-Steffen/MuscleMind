import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Set } from "@/Interfaces/sessionInterfaces";
import { Image } from "expo-image";

interface SetEditorProps {
  set: Set;
  onRepsChange: (reps: string, index: number) => void;
  onWeightChange: (weight: string, index: number) => void;
  onDelete: () => void;
  index: number;
}

export const SetEditor: React.FC<SetEditorProps> = ({
  set,
  onRepsChange,
  onWeightChange,
  onDelete,
  index,
}) => {
  const handleRepsChange = (reps: string) => {
    onRepsChange(reps, index);
  };

  const handleWeightChange = (weight: string) => {
    onWeightChange(weight, index);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text>Set Nr: {index + 1}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Image
            source={require("../../assets/images/delete.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={set.reps != null ? set.reps!.toString() : ""}
        onChangeText={handleRepsChange}
        placeholder="Enter reps"
        placeholderTextColor="grey"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={set.weight != null ? set.weight!.toString() : ""}
        onChangeText={handleWeightChange}
        placeholder="Enter weight"
        placeholderTextColor="grey"
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
});
