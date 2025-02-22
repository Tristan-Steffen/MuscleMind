import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { Session } from "@/Interfaces/sessionInterfaces";
import DayCard from "@/components/fiveDaysHistory/DayCard";
import IconButton from "@/components/Buttons/IconButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CustomTheme } from "@/constants/Colors";

// Dummy sessions data – replace with your real data/fetch logic
const dummySessions: Session[] = [
  {
    id: 1,
    name: "Chest & Triceps",
    description: "Bench press, dips, and cable flyes",
    date: new Date("2025-02-20"),
    isPreset: true,
    isExample: false,
    exercise_instances: [],
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-02-20"),
  },
  {
    id: 2,
    name: "Leg Day",
    description: "Squats, lunges, and leg press",
    date: new Date("2025-02-21"),
    isPreset: true,
    isExample: false,
    exercise_instances: [],
    createdAt: new Date("2025-02-21"),
    updatedAt: new Date("2025-02-21"),
  },
];

const TrackingPage: React.FC = () => {
  const { colors } = useTheme() as CustomTheme;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekDays = () => {
    const today = new Date();
    const todayMondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay(); // Adjust for Monday start
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + todayMondayOffset + weekOffset * 7);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const weekDays = getWeekDays();

  const getWeekRange = () => {
    const start = weekDays[0];
    const end = weekDays[6];
    return `${start.getDate()} - ${end.getDate()} ${start.toLocaleString("en-US", { month: "long" })} ${start.getFullYear()}`;
  };

  const handlePrevWeek = () => {
    setWeekOffset((prev) => prev - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
  };

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const handleSelectDate = (day: Date) => {
    setSelectedDate(day);
  };

  const sessionsForSelectedDay = dummySessions.filter((session) =>
    isSameDay(new Date(session.date), selectedDate)
  );

  return (
    <View className="flex-1 p-4 mt-10">
      <View className="flex-col items-center justify-between mb-4">
        <View className="flex-row items-center justify-between w-full mb-4">
          <IconButton onPress={handlePrevWeek} icon={<FontAwesome name="arrow-circle-left" size={36} color={colors.basicButton} />} />
          <Text className="text-lg font-bold mx-4" style={{ color: colors.text }}>
            {getWeekRange()}
          </Text>
          <IconButton onPress={handleNextWeek} icon={<FontAwesome name="arrow-circle-right" size={36} color={colors.basicButton} />} />
        </View>
        <View className="flex-row justify-between w-full">
          {weekDays.map((day, index) => (
            <DayCard
              key={index}
              day={day.toLocaleDateString("en-US", { weekday: "short" })}
              date={day.getDate()}
              isToday={isSameDay(day, selectedDate)}
              onPress={() => handleSelectDate(day)}
              classname="w-14 h-14 rounded-xl mx-0"
            />
          ))}
        </View>
      </View>
      <View>
        <Text className="text-xl font-bold mb-2" style={{ color: colors.text }}>
          Sessions for {selectedDate.toLocaleDateString()}
        </Text>
        {sessionsForSelectedDay.length > 0 ? (
          sessionsForSelectedDay.map((session) => (
            <View key={session.id} className="p-4 mb-2 rounded-lg" style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
              <Text className="font-bold" style={{ color: colors.text }}>
                {session.name}
              </Text>
              <Text style={{ color: colors.text }}>{session.description}</Text>
              <Text style={{ color: colors.text }}>{new Date(session.date).toLocaleTimeString()}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: colors.text }}>No sessions found for this day.</Text>
        )}
      </View>
    </View>
  );
};

export default TrackingPage;