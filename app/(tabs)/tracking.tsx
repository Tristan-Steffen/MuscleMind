import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { Session } from "@/Interfaces/sessionInterfaces";
import DayCard from "@/components/fiveDaysHistory/DayCard";
import Button from "@/components/Buttons/Button";

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
  // Add more sessions as needed
];

const TrackingPage: React.FC = () => {
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);

  // Function to get the week starting from Monday
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

  // Move to the previous week while keeping the selected day
  const handlePrevWeek = () => {
    setWeekOffset((prev) => prev - 1);
  };

  // Move to the next week while keeping the selected day
  const handleNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
  };

  // Helper to compare dates (ignoring time)
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Ensure selecting a day updates both selectedDate & weekOffset properly
  const handleSelectDate = (day: Date) => {
    setSelectedDate(day);

    // Calculate new week offset based on the new date
    const today = new Date();
    const todayMondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay(); // Ensure Monday start
    const todayStartOfWeek = new Date(today);
    todayStartOfWeek.setDate(today.getDate() + todayMondayOffset);

    const newWeekOffset = Math.floor(
      (day.getTime() - todayStartOfWeek.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    setWeekOffset(newWeekOffset);
  };

  // Filter sessions that occurred on the selected day
  const sessionsForSelectedDay = dummySessions.filter((session) =>
    isSameDay(new Date(session.date), selectedDate)
  );

  return (
    <View className="flex-1 p-4 mt-10">
      <View className="flex-col items-center justify-between mb-4">
        <View className="flex-row items-center justify-between w-full mb-4">
          <Button title="Prev Week" onPress={handlePrevWeek} />
          <Button title="Next Week" onPress={handleNextWeek} />
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

      {/* Sessions for the selected day */}
      <View>
        <Text className="text-xl font-bold mb-2" style={{ color: colors.text }}>
          Sessions for {selectedDate.toLocaleDateString()}
        </Text>
        {sessionsForSelectedDay.length > 0 ? (
          sessionsForSelectedDay.map((session) => (
            <View
              key={session.id}
              className="p-4 mb-2 rounded-lg"
              style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}
            >
              <Text className="font-bold" style={{ color: colors.text }}>
                {session.name}
              </Text>
              <Text style={{ color: colors.text }}>{session.description}</Text>
              <Text style={{ color: colors.text }}>
                {new Date(session.date).toLocaleTimeString()}
              </Text>
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
