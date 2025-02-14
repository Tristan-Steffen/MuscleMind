import React from "react";
import { View } from "@/components/Themed";
import DayCard from "./DayCard";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const FiveDaysHistory: React.FC = () => {
  const today = new Date();
  const todayIndex = today.getDay();
  const todayDate = today.getDate();

  const getDayByOffset = (offset: number) => {
    const dayIndex = (todayIndex + offset + 7) % 7;
    return daysOfWeek[dayIndex];
  };

  const getDateByOffset = (offset: number) => {
    const newDate = new Date();
    newDate.setDate(todayDate + offset);
    return newDate.getDate();
  };

  const fiveDays = [-2, -1, 0, 1, 2].map((offset) => ({
    day: getDayByOffset(offset),
    date: getDateByOffset(offset),
    isToday: offset === 0,
  }));

  return (
    <View className="flex-row justify-evenly">
      {fiveDays.map((dayInfo, index) => (
        <DayCard
          key={index}
          day={dayInfo.day}
          date={dayInfo.date}
          isToday={dayInfo.isToday}
        />
      ))}
    </View>
  );
};

export default FiveDaysHistory;
