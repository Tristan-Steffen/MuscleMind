import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Themed";

type HeaderButtonProps = {
  onPress: () => void;
  text: string;
  active?: boolean;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ onPress, text, active }) => {
  const isActive = active === undefined || active;

  // When active, use bg-text and text-card; otherwise, use bg-border.
  if (isActive) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="h-7 rounded-full justify-center items-center mx-1 bg-text"
        activeOpacity={0.8}
      >
        <Text className="text-base font-bold mx-2.5 text-card">{text}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View className="h-7 rounded-full justify-center items-center mx-1 bg-border">
        <Text className="text-base font-bold mx-2.5 text-card">{text}</Text>
      </View>
    );
  }
};

export default HeaderButton;
