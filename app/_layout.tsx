import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { createTheme } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useRef } from "react";
import "react-native-reanimated";
import useColorScheme from "@/hooks/useColorScheme";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { initDatabase, checkIfDatabaseIsEmpty } from "@/utils/db/database";
import { createTestData } from "@/utils/db/sessionFactory";
import { TouchableOpacity, StyleSheet } from "react-native";
import { SessionProvider, useSessionContext } from "@/context/SessionContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Workout from "@/components/Workout/Workout";
import WorkoutHeader from "@/components/Workout/WorkoutHeader";
import BackButton from "@/components/Buttons/BackButton";
import HeaderButton from "@/components/Buttons/HeaderButton";

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

  const {
    isSelectionNew,
    applyNewSelections,
    revertNewSelections,
    selectedExerciseInstances,
  } = useSessionContext();

  return (
    <>
      <Stack screenOptions={{ animation: "fade" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="workouts/workouts"
          options={{
            title: "Example Workouts",
            headerLeft: () => {
              return (
                <BackButton
                  onPress={() => {
                    router.back();
                  }}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="workouts/workoutBuilder"
          options={{
            title: "New Workout",
            headerLeft: () => {
              return (
                <BackButton
                  onPress={() => {
                    router.back();
                  }}
                />
              );
            },
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
            headerLeft: () => {
              return (
                <BackButton
                  onPress={() => {
                    revertNewSelections();
                    router.back();
                  }}
                />
              );
            },
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
