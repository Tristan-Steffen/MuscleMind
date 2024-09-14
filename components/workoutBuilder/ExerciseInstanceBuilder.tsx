import React from "react";
import { Image } from "expo-image";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ExerciseInstance, Set } from "@/Interfaces/sessionInterfaces";
import { SetBuilder } from "./SetBuilder";
import { useSession } from "@/hooks/useSession";

interface ExerciseInstanceBuilderProps {
  exerciseInstance: ExerciseInstance;
  onUpdate: (updatedInstance: ExerciseInstance) => void;
  onDelete: () => void;
}

export const ExerciseInstanceBuilder: React.FC<
  ExerciseInstanceBuilderProps
> = ({ exerciseInstance, onUpdate, onDelete }) => {
  const handleAddSet = (): void => {
    const newSet = useSession().createEmptySet();
    const updatedInstance = {
      ...exerciseInstance,
      sets: [...exerciseInstance.sets, newSet],
    };
    onUpdate(updatedInstance);
  };

  const updateSet = (updatedSet: Set, setIndex: number): void => {
    const updatedSets = exerciseInstance.sets.map((set, index) =>
      index === setIndex ? updatedSet : set
    );

    const updatedInstance = {
      ...exerciseInstance,
      sets: updatedSets,
    };
    onUpdate(updatedInstance);
  };

  const handleDelete = (): void => {
    console.log("Delete exercise instance");
    onDelete();
  };

  const handleDeleteSet = (setIndex: number): void => {
    const updatedSets = [];

    for (let i = 0; i < exerciseInstance.sets.length; i++) {
      if (i !== setIndex) {
        updatedSets.push(exerciseInstance.sets[i]);
      }
    }
    const updatedInstance = {
      ...exerciseInstance,
      sets: updatedSets,
    };
    onUpdate(updatedInstance);
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
        <Text style={styles.title}>{exerciseInstance.exercise.name}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Image
            source={require("../../assets/images/delete.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
      <Text>{exerciseInstance.exercise.description}</Text>
      {exerciseInstance.sets.map((set, index) => (
        <SetBuilder
          key={index}
          index={index}
          set={set}
          onUpdate={(updatedSet) => updateSet(updatedSet, index)}
          onDelete={() => handleDeleteSet(index)}
        />
      ))}

      <Button title="Add Set" onPress={handleAddSet} />
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
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
