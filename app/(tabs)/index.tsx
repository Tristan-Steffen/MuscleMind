import { ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import FiveDaysHistory from "@/components/fiveDaysHistory/FiveDaysHistory";
import BigButton from "@/components/Buttons/BigButton";
import ButtonAsText from "@/components/Buttons/ButtonAsText";
import { Session } from "@/Interfaces/sessionInterfaces";
import { useEffect, useState } from "react";
import { getAllSessions } from "@/utils/db/session";
import PresetCard from "@/components/preset/PresetCard";
import { router } from "expo-router";

export default function TabTwoScreen() {
  const db = useSQLiteContext();
  const [sessions, setSessions] = useState<Session[] | null>(null);

  useEffect(() => {
    async function loadSessions() {
      if (db) {
        const allSessions = await getAllSessions(db);
        setSessions(allSessions);
      }
    }
    loadSessions();
  }, [db]);

  if (!sessions) return null;

  return (
    <View className="mt-10 px-5 h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <FiveDaysHistory />
        <View className="flex-row justify-between mt-5">
          <BigButton
            title="Workout Program"
            href={{
              pathname: "/workouts/workouts",
              params: { type: "custom" },
            }}
            style="max-w-[48%]"
          />
          <BigButton
            title="New Workout"
            onPress={() => router.navigate({ pathname: "/workouts/workoutBuilder" })}
            style="max-w-[48%]"
          />
        </View>
        <View className="flex-row justify-between items-center mt-5 mx-1.5">
          <Text className="text-base text-text">Your Workouts</Text>
          <ButtonAsText
            title="View all"
            href={{
              pathname: "/workouts/workouts",
              params: { type: "custom" },
            }}
          />
        </View>
        <View className="flex-row justify-between items-center mt-5 mx-1.5">
          <Text className="text-base text-text">Example Workouts</Text>
          <ButtonAsText
            title="View all"
            href={{
              pathname: "/workouts/workouts",
              params: { type: "example" },
            }}
          />
        </View>
        <View className="flex-row justify-between mt-2.5">
          {sessions && sessions.length > 1 ? (
            <PresetCard session={sessions[0]} />
          ) : null}
          {sessions && sessions.length > 2 ? (
            <PresetCard session={sessions[1]} />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
