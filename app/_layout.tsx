import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { createTheme } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import "react-native-reanimated";
import useColorScheme from "@/hooks/useColorScheme";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { initDatabase, checkIfDatabaseIsEmpty } from "@/utils/db/database";
import { createTestData } from "@/utils/db/sessionFactory";
import { SessionProvider, useSessionContext } from "@/context/SessionContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import Workout from "@/components/Workout/Workout";
import WorkoutHeader from "@/components/Workout/WorkoutHeader";
import IconButton from "@/components/Buttons/IconButton";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import "../global.css";
import HeaderButton from "@/components/Buttons/HeaderButton";
import { Exercise } from "@/Interfaces/sessionInterfaces";
import { useWorkoutContext, WorkoutProvider } from "@/context/WorkoutContext";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "black",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} />;
};

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
        databaseName="fitness4.db"
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
              <BottomSheetModalProvider>
                <RootLayoutNav />
              </BottomSheetModalProvider>
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["10%", "95%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleNavigateToInfo = (exercise: Exercise) => {
    bottomSheetModalRef.current?.snapToIndex(0);
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
  const { setselectedWorkoutInstance } = useWorkoutContext();

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
                onPress={() => {
                  router.back();
                }}
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
                onPress={() => {
                  router.back();
                }}
              />
            ),
            headerRight: () => (
              <HeaderButton
                onPress={handlePresentModalPress}
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backdropComponent={CustomBackdrop}
        backgroundStyle={{
          backgroundColor: colors.darkerBackground,
        }}
        handleComponent={() => (
          <WorkoutHeader
            onBackToWorkout={() => {
              setselectedWorkoutInstance(null);
            }}
            onFinishWorkout={() => {
              console.log("Workout Finished!");
            }}
          />
        )}
      >
        <Workout onNavigateToInfo={handleNavigateToInfo} />
      </BottomSheetModal>
    </>
  );
}
