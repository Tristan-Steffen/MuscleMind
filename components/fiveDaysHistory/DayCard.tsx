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

  console.log(day)
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`h-24 w-16 rounded-3xl items-center justify-center mx-1 ${classname}`}
        style={{
          backgroundColor: isToday ? colors.lightBackground : colors.card,
        }}
      >
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
      </View>
    </TouchableOpacity>
  );
};

export default DayCard;
