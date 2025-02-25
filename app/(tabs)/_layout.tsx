import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import useColorScheme from "@/hooks/useColorScheme";
import { useWorkoutContext } from "@/context/WorkoutContext";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { selectedWorkoutInstances } = useWorkoutContext();
  const { colorScheme } = useColorScheme();

  // Use new system values (from tailwind config/global.css)
  // Here we define tint manually; ideally you might extract these values from a single source.
  const tint = colorScheme === "dark" ? "#fff" : "#2f95dc";

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: tint,
          headerShown: false,
          tabBarStyle: {
            marginBottom: selectedWorkoutInstances.length !== 0 ? 70 : 0,
          },
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Statistics",
            tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="tracking"
          options={{
            title: "Tracking",
            tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          }}
        />
        <Tabs.Screen
          name="nutrition"
          options={{
            title: "Nutrition",
            tabBarIcon: ({ color }) => <TabBarIcon name="apple" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
