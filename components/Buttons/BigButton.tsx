import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
import { Href, useRouter } from "expo-router";

type BigButtonProps = {
  title: string;
  onPress?: () => void;
  style?: string; // Additional Tailwind classes for container
  textStyle?: string; // Additional Tailwind classes for text
  href?: Href;
};

const BigButton: React.FC<BigButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  href,
}) => {
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
      className={`w-full py-4 rounded-full items-center justify-center my-2.5 bg-basicButton ${style}`}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text className={`text-lg font-semibold text-text ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BigButton;
