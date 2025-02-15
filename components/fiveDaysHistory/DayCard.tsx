import React from "react";
import { View, Text } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";

type DayCardProps = {
  day: string;
  date: number;
  isToday?: boolean;
};

const DayCard: React.FC<DayCardProps> = ({ day, date, isToday = false }) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View
      className="flex-1 h-[75px] rounded-3xl items-center justify-center mx-1"
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
  );
};

export default DayCard;
