import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { Text, View } from "@/components/Themed";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Modal</Text>
      <View
        className="my-8 h-[1px] w-[80%]"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
