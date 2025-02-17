import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Themed";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

type HeaderButtonProps = {
  onPress: () => void;
  text: string;
  active?: boolean;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ onPress, text, active }) => {
  const { colors } = useTheme() as CustomTheme;

  const buttonClasses = "h-7 rounded-full justify-center items-center mx-1";
  const textClasses = "text-base font-bold mx-2.5";

  if (active === undefined || active) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={buttonClasses}
        style={{ backgroundColor: colors.text }}
        activeOpacity={0.8}
      >
        <Text className={textClasses} style={{ color: colors.card }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View className={buttonClasses} style={{ backgroundColor: colors.border }}>
        <Text className={textClasses} style={{ color: colors.card }}>
          {text}
        </Text>
      </View>
    );
  }
};

export default HeaderButton;
