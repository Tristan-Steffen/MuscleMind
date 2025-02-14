import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import { Href, Link } from "expo-router";

type ButtonAsTextProps = {
  title: string;
  onPress?: () => void;
  textColor?: string;
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
  const { colors } = useTheme() as CustomTheme;

  const textStyles = `text-base font-medium ${textStyle}`;

  if (href) {
    return (
      <Link href={href} className={style}>
        <Text style={{ color: textColor || colors.basicButton }} className={textStyles}>
          {title}
        </Text>
      </Link>
    );
  }

  return (
    <TouchableOpacity className={style} onPress={onPress} activeOpacity={0.6}>
      <Text style={{ color: textColor || colors.basicButton }} className={textStyles}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonAsText;