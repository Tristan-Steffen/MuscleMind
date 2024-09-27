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

type BigButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const BigButton: React.FC<BigButtonProps> = ({
  title,
  onPress,
  textColor,
  style,
  textStyle,
}) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: colors.basicButton }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          { color: textColor || colors.text },
          textStyle,
        ]}
      >
        {title}
      </Text>
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
