import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { createTheme } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "react-native-reanimated";
import useColorScheme from "@/hooks/useColorScheme";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { initDatabase, checkIfDatabaseIsEmpty } from "@/utils/db/database";
import { createTestData } from "@/utils/db/sessionFactory";
import { SessionProvider, useSessionContext } from "@/context/SessionContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import Workout from "@/components/Workout/Workout";
import WorkoutHeader from "@/components/Workout/WorkoutHeader";
import IconButton from "@/components/Buttons/IconButton";
import "../global.css";
import HeaderButton from "@/components/Buttons/HeaderButton";
import { Exercise } from "@/Interfaces/sessionInterfaces";
import { useWorkoutContext, WorkoutProvider } from "@/context/WorkoutContext";

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

  if (!loaded) return null;

  return (
    <ThemeProvider value={customTheme}>
      <SQLiteProvider
        databaseName="Fitness3.db"
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
            <WorkoutProvider>
              <RootLayoutNav />
            </WorkoutProvider>
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

  // Create a ref for the BottomSheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  // Use two snap points: minimized ("10%") and expanded ("95%")
  const snapPoints = useMemo(() => ["10%", "95%"], []);

  // Control whether the sheet is rendered
  const [sheetVisible, setSheetVisible] = useState(false);

  // Open the sheet when the Start button is pressed.
  const handlePresentSheetPress = useCallback(() => {
    setSheetVisible(true);
    // After mounting, open the sheet by snapping to the expanded index (1).
    setTimeout(() => {
      bottomSheetRef.current?.snapToIndex(0);
    }, 50);
    router.navigate({ pathname: "/" });
  }, []);

  const handleNavigateToInfo = (exercise: Exercise) => {
    // When navigating, unmount the sheet.
    bottomSheetRef.current?.snapToIndex(0);
    router.navigate({
      pathname: "/exercises/exerciseInfo",
      params: { exerciseID: exercise.id },
    });
  };

  const {
    isSelectionNew,
    applyNewSelections,
    revertNewSelections,
    selectedExerciseInstances,
  } = useSessionContext();
  const { setselectedWorkoutInstance, finishWorkout } = useWorkoutContext();

  return (
    <>
      <Stack screenOptions={{ animation: "fade" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="workouts/workouts"
          options={{
            title: "Example Workouts",
            headerLeft: () => <IconButton icon={<FontAwesome name="arrow-circle-left" size={32} color={colors.text} />} onPress={() => router.back()} />,
          }}
        />
        <Stack.Screen
          name="workouts/workoutBuilder"
          options={{
            title: "New Workout",
            headerLeft: () => <IconButton icon={<FontAwesome name="arrow-circle-left" size={32} color={colors.highlight} />} onPress={() => router.back()} />,
            headerRight: () => (
              <HeaderButton
                onPress={handlePresentSheetPress}
                text="Start"
                active={selectedExerciseInstances.length > 0}
              />
            ),
          }}
        />
        <Stack.Screen
          name="exercises/exerciseSelector"
          options={{
            title: "Exercise Selector",
            headerLeft: () => (
              <IconButton
                icon={<FontAwesome name="arrow-circle-left" size={32} color={colors.text} />}
                onPress={() => {
                  revertNewSelections();
                  router.back();
                }}
              />
            ),
            headerRight: () => (
              <HeaderButton
                onPress={() => {
                  applyNewSelections();
                  router.back();
                }}
                text="Save"
                active={isSelectionNew()}
              />
            ),
          }}
        />
      </Stack>

      {/* Conditionally render the BottomSheet */}
      {sheetVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1} // When mounted, start in the expanded state
          snapPoints={snapPoints}
          enablePanDownToClose={false} // Disable dismissal by swipe; user can drag between snap points.
          backgroundStyle={{ backgroundColor: colors.darkerBackground }}
          handleComponent={() => (
            <WorkoutHeader
              onBackToWorkout={() => {
                setselectedWorkoutInstance(null);
              }}
              onFinishWorkout={() => {
                // When End Workout is confirmed, finishWorkout saves state and then unmounts the sheet.
                finishWorkout(() => setSheetVisible(false));
              }}
            />
          )}
          containerStyle={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <Workout
            onNavigateToInfo={handleNavigateToInfo}
            onFinishWorkout={() => {
              finishWorkout(() => setSheetVisible(false));
            }}
          />
        </BottomSheet>
      )}
    </>
  );
}
