import React from "react";
import { View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
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
      style={[
        styles.card,
        { backgroundColor: isToday ? colors.lightBackground : colors.card },
      ]}
    >
      <Text
        style={[
          styles.dayText,
          { color: isToday ? colors.background : colors.text },
        ]}
      >
        {day}
      </Text>
      <Text
        style={[
          styles.dateText,
          { color: isToday ? colors.background : colors.text },
        ]}
      >
        {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 75,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  dayText: {
    fontSize: 12,
    fontWeight: "semibold",
  },
  dateText: {
    fontSize: 20,
    marginTop: 5,
  },
});

export default DayCard;
