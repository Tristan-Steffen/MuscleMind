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
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { SessionProvider } from "@/context/SessionContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Workout from "@/components/workout";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [error, loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  const customTheme = createTheme(colorScheme);
  const colors = customTheme.colors;

  // Ref for the BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Modal snap points
  const snapPoints = useMemo(() => ["10%", "95%"], []);

  // Modal trigger function
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present(); // Correct method to present the modal
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
              <Stack screenOptions={{ animation: "fade" }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="modal"
                  options={{ presentation: "modal" }}
                />
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
                        onPress={handlePresentModalPress} // Trigger modal here
                      >
                        <Text
                          style={[styles.headerText, { color: colors.text }]}
                        >
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
                enableDismissOnClose={false}
              >
                <SessionProvider>
                  <Workout />
                </SessionProvider>
              </BottomSheetModal>
            </SessionProvider>
          </SQLiteProvider>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
