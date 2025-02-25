import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { createTheme } from "@/constants/Colors";
import { router, Stack } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import "react-native-reanimated";
import useColorScheme from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";
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
import { View } from "react-native";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const customTheme = createTheme(colorScheme);

  return (
    <ThemeProvider value={customTheme}>
      {/* The top-level view now applies the dark class and uses the global background */}
      <View className={`${colorScheme === "dark" ? "dark" : ""} flex-1 bg-background`}>
        <SQLiteProvider
          databaseName="fitness5.db"
          onInit={async (db) => {
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
      </View>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  const customTheme = createTheme(colorScheme);
  const colors = customTheme.colors;

  // Ref for BottomSheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  // Snap points for BottomSheet
  const snapPoints = useMemo(() => ["10%", "95%"], []);

  const [sheetVisible, setSheetVisible] = useState(false);

  const handlePresentSheetPress = useCallback(() => {
    setSheetVisible(true);
    setTimeout(() => {
      bottomSheetRef.current?.snapToIndex(0);
    }, 50);
    router.navigate({ pathname: "/" });
  }, []);

  const handleNavigateToInfo = (exercise: Exercise) => {
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
            headerLeft: () => (
              <IconButton
                icon={
                  <FontAwesome
                    name="arrow-circle-left"
                    size={32}
                    color={colors.text}
                  />
                }
                onPress={() => router.back()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="workouts/workoutBuilder"
          options={{
            title: "New Workout",
            headerLeft: () => (
              <IconButton
                icon={
                  <FontAwesome
                    name="arrow-circle-left"
                    size={32}
                    color={colors.text}
                  />
                }
                onPress={() => router.back()}
              />
            ),
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
                icon={
                  <FontAwesome
                    name="arrow-circle-left"
                    size={32}
                    color={colors.text}
                  />
                }
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

      {sheetVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          backgroundStyle={{ backgroundColor: colors.darkerBackground }}
          handleComponent={() => (
            <WorkoutHeader
              onBackToWorkout={() => {
                setselectedWorkoutInstance(null);
              }}
              onFinishWorkout={() => {
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
