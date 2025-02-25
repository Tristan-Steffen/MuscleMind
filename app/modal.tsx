import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { Text, View } from "@/components/Themed";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-lg font-bold text-text">Modal</Text>
      <View className="my-8 h-[1px] w-[80%] bg-border" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
