import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import { Href, Link } from "expo-router"; // Import Link from expo-router

type ButtonAsTextProps = {
  title: string;
  onPress?: () => void; // onPress is optional for links
  textColor?: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
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

  const textStyles = [
    styles.buttonText,
    { color: textColor || colors.basicButton },
    textStyle,
  ];

  if (href) {
    return (
      <Link href={href} style={[style]}>
        <Text style={textStyles}>{title}</Text>
      </Link>
    );
  }

  return (
    <TouchableOpacity style={[style]} onPress={onPress} activeOpacity={0.6}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "none",
  },
});

export default ButtonAsText;
