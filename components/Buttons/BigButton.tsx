import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Text } from "@/components/Themed";
import { CustomTheme } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";

type BigButtonProps = {
  title: string;
  onPress?: () => void;
  style?: string; // Use string for Tailwind classes
  textStyle?: string; // Use string for Tailwind classes
  href?: Href;
};

const BigButton: React.FC<BigButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  href,
}) => {
  const { colors } = useTheme() as CustomTheme;
  const router = useRouter();

  const handlePress = () => {
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      className={`w-full py-4 rounded-full items-center justify-center my-2.5 ${style}`}
      style={{ backgroundColor: colors.basicButton }} // Dynamic color from theme
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text className={`text-lg font-semibold ${textStyle}`} style={{ color: colors.text }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BigButton;
