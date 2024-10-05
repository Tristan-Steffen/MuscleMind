import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { createTheme } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import useColorScheme from "@/hooks/useColorScheme";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { initDatabase, checkIfDatabaseIsEmpty } from "@/utils/db/database";
import { createTestData } from "@/utils/db/sessionFactory";
import { TouchableOpacity, StyleSheet } from "react-native";
import { SessionProvider } from "@/context/SessionContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await initDatabase(db);
  const isEmpty = await checkIfDatabaseIsEmpty(db);
  if (isEmpty) {
    console.log("Database is empty, creating test data...");
    await createTestData(db);
  }
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  const customTheme = createTheme(colorScheme);

  return (
    <ThemeProvider value={customTheme}>
      <SQLiteProvider databaseName="fitness32.db" onInit={migrateDbIfNeeded}>
        <SessionProvider>
          <Stack screenOptions={{ animation: "fade" }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen
              name="session/[id]"
              options={{ title: "Edit Session", headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="template/templates"
              options={{ title: "Example Templates", headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="template/templateBuilder"
              options={{ title: "Template Builder", headerBackTitle: "Back" }}
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
        </SessionProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
  },
});
