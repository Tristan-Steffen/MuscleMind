import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import { CustomTheme } from "@/constants/Colors";
import { Href, Link } from "expo-router"; // Import Link from expo-router

type BigButtonProps = {
  title: string;
  onPress?: () => void; // onPress is optional for links
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  href?: Href; // Optional href for Link behavior
};

const BigButton: React.FC<BigButtonProps> = ({
  title,
  onPress,
  textColor,
  style,
  textStyle,
  href,
}) => {
  const { colors } = useTheme() as CustomTheme;

  const buttonStyles = [
    styles.button,
    style,
    { backgroundColor: colors.basicButton },
  ];

  const textStyles = [
    styles.buttonText,
    { color: textColor || colors.text },
    textStyle,
  ];

  // Render Link if href is provided
  if (href) {
    return (
      <View style={buttonStyles}>
        <Link href={href}>
          <Text style={textStyles}>{title}</Text>
        </Link>
      </View>
    );
  }

  // Otherwise render as a regular button
  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default BigButton;
