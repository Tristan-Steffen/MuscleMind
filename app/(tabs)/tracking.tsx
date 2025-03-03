import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "@/components/Themed";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { Session } from "@/Interfaces/sessionInterfaces";
import DayCard from "@/components/fiveDaysHistory/DayCard";
import IconButton from "@/components/Buttons/IconButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CustomTheme } from "@/constants/Colors";
import { getAllSessions } from "@/utils/db/session";
import { useSQLiteContext } from "expo-sqlite";
import SessionDetails from "@/components/tracking/SessionDetails";
import { ScrollView } from "react-native";

const TrackingPage: React.FC = () => {
  const { colors } = useTheme() as CustomTheme;
  const db = useSQLiteContext();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchSessions = async () => {
        const fetchedSessions = await getAllSessions(db);
        console.log(fetchedSessions[16])
        setSessions(fetchedSessions);
      };
      fetchSessions();
    }, [db])
  );

  const getWeekDays = () => {
    const today = new Date();
    const todayMondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + todayMondayOffset + weekOffset * 7);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const weekDays = getWeekDays();

  const handlePrevWeek = () => setWeekOffset((prev) => prev - 1);
  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const handleSelectDate = (day: Date) => {
    setSelectedDate(day);

    // Calculate the Monday of the week for the selected day
    const selectedMondayOffset = day.getDay() === 0 ? -6 : 1 - day.getDay();
    const selectedWeekStart = new Date(day);
    selectedWeekStart.setDate(day.getDate() + selectedMondayOffset);

    // Calculate the difference in weeks from the original reference (app start week)
    const today = new Date();
    const todayMondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();
    const todayStartOfWeek = new Date(today);
    todayStartOfWeek.setDate(today.getDate() + todayMondayOffset);

    const newWeekOffset = Math.round(
      (selectedWeekStart.getTime() - todayStartOfWeek.getTime()) /
      (7 * 24 * 60 * 60 * 1000)
    );

    setWeekOffset(newWeekOffset);
  };

  const sessionsForSelectedDay = sessions.filter((session) =>
    isSameDay(new Date(session.date), selectedDate)
  );

  const weekRange = `${weekDays[0].getDate()} - ${weekDays[6].getDate()} ${weekDays[0].toLocaleString(
    "en-US",
    { month: "long" }
  )} ${weekDays[0].getFullYear()}`;

  return (
    <View className="flex-1 mt-14">
      <View className="flex-col items-center justify-between pb-4 border-b w-full" style={{ borderColor: colors.border }}>
        <View className="flex-row items-center justify-between w-full mb-4">
          <IconButton onPress={handlePrevWeek} icon={<FontAwesome name="arrow-circle-left" size={36} color={colors.highlight} />} />
          <Text className="text-lg font-bold" style={{ color: colors.text }}>{weekRange}</Text>
          <IconButton onPress={handleNextWeek} icon={<FontAwesome name="arrow-circle-right" size={36} color={colors.highlight} />} />
        </View>
        <View className="flex-row justify-evenly w-full">
          {weekDays.map((day) => (
            <DayCard
              key={day.toISOString()}
              day={day.toLocaleDateString("en-US", { weekday: "short" })}
              date={day.getDate()}
              isToday={isSameDay(day, selectedDate)}
              onPress={() => handleSelectDate(day)}
              classname="w-14 h-14 rounded"
            />
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="p-4">
        {sessionsForSelectedDay.length > 0 ? (
          sessionsForSelectedDay.map((session) => (
            <View key={session.id} className="pb-4">
              <SessionDetails session={session} />
            </View>
          ))
        ) : (
          <Text style={{ color: colors.text }}>No sessions found for this day.</Text>
        )}
        <View className="h-4"></View>
      </ScrollView>
    </View>
  );
};

export default TrackingPage;
