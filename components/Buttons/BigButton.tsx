import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Text } from "@/components/Themed";
import { CustomTheme } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";

type BigButtonProps = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
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

  const buttonStyles = [
    styles.button,
    style,
    { backgroundColor: colors.basicButton },
  ];

  const textStyles = [styles.buttonText, { color: colors.text }, textStyle];

  const handlePress = () => {
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
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
