import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { checkIfDatabaseIsEmpty, initDatabase } from "@/utils/db/database";
import { createTestData } from "@/utils/db/sessionFactory";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await initDatabase(db);
  const isEmpty = await checkIfDatabaseIsEmpty(db);
  if (isEmpty) {
    await createTestData(db);
  }
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SQLiteProvider databaseName="fitness.db" onInit={migrateDbIfNeeded}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="workout"
          options={{
            title: "Workout",
            tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          }}
        />
        <Tabs.Screen
          name="nutrition"
          options={{
            title: "Nutrition",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="apple" color={color} />
            ),
          }}
        />
      </Tabs>
    </SQLiteProvider>
  );
}
