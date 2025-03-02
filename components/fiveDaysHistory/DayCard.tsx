import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";

export interface DayCardProps {
  day: string;
  date: number;
  isToday?: boolean;
  classname?: string;
  onPress?: () => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, date, isToday = false, onPress, classname }) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <TouchableOpacity onPress={onPress} className={`rounded-3xl items-center justify-center mx-1 ${classname}`} style={{
      backgroundColor: isToday ? colors.highlight : colors.card,
    }}>
      <Text
        className="text-xs font-semibold"
        style={{ color: isToday ? colors.background : colors.text }}
      >
        {day}
      </Text>
      <Text
        className="text-xl mt-1"
        style={{ color: isToday ? colors.background : colors.text }}
      >
        {date}
      </Text>
    </TouchableOpacity>
  );
};

export default DayCard;
