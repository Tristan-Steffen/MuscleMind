import React from "react";
import { TouchableOpacity } from "react-native";
import { Href, Link } from "expo-router";
import { Text } from "@/components/Themed";

type ButtonAsTextProps = {
  title: string;
  onPress?: () => void;
  textColor?: string; // Optional override, if needed
  textStyle?: string;
  style?: string;
  href?: Href;
};

const ButtonAsText: React.FC<ButtonAsTextProps> = ({
  title,
  onPress,
  textColor,
  textStyle,
  style,
  href,
}) => {
  // If no override is provided, default to our Tailwind class for basicButton text
  const defaultTextClass = textColor ? "" : "text-basicButton";
  const combinedTextClasses = `text-base font-medium ${textStyle} ${defaultTextClass}`;

  if (href) {
    return (
      <Link href={href} className={style}>
        <Text className={combinedTextClasses}>{title}</Text>
      </Link>
    );
  }

  return (
    <TouchableOpacity className={style} onPress={onPress} activeOpacity={0.6}>
      <Text className={combinedTextClasses}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonAsText;
