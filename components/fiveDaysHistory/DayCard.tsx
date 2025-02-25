import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";

export interface DayCardProps {
  day: string;
  date: number;
  isToday?: boolean;
  classname?: string;
  onPress?: () => void;
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  date,
  isToday = false,
  onPress,
  classname,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-3xl items-center justify-center mx-1 ${classname} ${isToday ? "bg-highlight" : "bg-card"
        }`}
    >
      <Text className={`text-xs font-semibold ${isToday ? "text-background" : "text-text"}`}>
        {day}
      </Text>
      <Text className={`text-xl mt-1 ${isToday ? "text-background" : "text-text"}`}>
        {date}
      </Text>
    </TouchableOpacity>
  );
};

export default DayCard;
