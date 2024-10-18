import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { createTheme } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useRef } from "react";
import "react-native-reanimated";
import useColorScheme from "@/hooks/useColorScheme";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { initDatabase, checkIfDatabaseIsEmpty } from "@/utils/db/database";
import { createTestData } from "@/utils/db/sessionFactory";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { SessionProvider, useSessionContext } from "@/context/SessionContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Workout from "@/components/Workout/Workout";
import WorkoutHeader from "@/components/Workout/WorkoutHeader";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const { colorScheme } = useColorScheme();
  const customTheme = createTheme(colorScheme);

  useEffect(() => {
    if (error) throw error;
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [error, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={customTheme}>
      <SQLiteProvider
        databaseName="fitness32.db"
        onInit={async (db: SQLiteDatabase) => {
          await initDatabase(db);
          const isEmpty = await checkIfDatabaseIsEmpty(db);
          if (isEmpty) {
            await createTestData(db);
          }
        }}
      >
        <SessionProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <RootLayoutNav />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SessionProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  const customTheme = createTheme(colorScheme);
  const colors = customTheme.colors;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["10%", "95%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Stack screenOptions={{ animation: "fade" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="workouts/workouts"
          options={{
            title: "Example Workouts",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="workouts/workoutBuilder"
          options={{
            title: "New Workout",
            headerBackTitle: "Back",
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handlePresentModalPress}
              >
                <Text style={[styles.headerText, { color: colors.text }]}>
                  Start
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="exercises/exerciseSelector"
          options={{
            title: "Exercise Selector",
            headerBackTitle: "Back",
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => {
                  console.log("Custom button pressed!");
                }}
              >
                <FontAwesome name="plus" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{
          backgroundColor: colors.darkerBackground,
        }}
        handleComponent={() => (
          <WorkoutHeader
            onDeleteWorkout={() => {
              bottomSheetModalRef.current?.close();
            }}
            onFinishWorkout={() => {
              console.log("Workout Finished!");
            }}
          />
        )}
      >
        <Workout />
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
