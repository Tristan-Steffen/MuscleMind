import React, { memo } from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { Text } from "@/components/Themed";
import { ExerciseInstance } from "@/Interfaces/sessionInterfaces";
import ImageCollection from "@/utils/imageCollection";

type WorkoutItemProps = {
  exerciseInstance: ExerciseInstance;
  onPress: () => void;
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({ exerciseInstance, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center mt-[20px] rounded-[20px] border bg-darkerBackground border-border"
    >
      <Image
        source={
          exerciseInstance.exercise.image
            ? ImageCollection[exerciseInstance.exercise.name as keyof typeof ImageCollection]
            : ImageCollection["placeholderImage"]
        }
        className="w-[60px] h-[60px] rounded-[20px] m-[10px]"
        defaultSource={ImageCollection["placeholderImage"]}
      />
      <View className="flex-1 justify-center">
        <Text className="text-[18px] font-bold text-text">
          {exerciseInstance.exercise.name}
        </Text>
        <View className="flex-row justify-between mr-[10px] items-center">
          {exerciseInstance.sets.map((set, index) => (
            <View
              key={index}
              className={`flex-1 h-[20px] rounded-[10px] mr-[5px] ${set.done ? "bg-success" : "bg-[#ccc]"
                }`}
            />
          ))}
        </View>
        <View className="border-b my-[8px] mr-[15px] border-border" />
      </View>
    </TouchableOpacity>
  );
};

export default memo(WorkoutItem);
