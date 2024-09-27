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

type ButtonAsTextProps = {
  title: string;
  onPress: () => void;
  textColor?: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
};

const ButtonAsText: React.FC<ButtonAsTextProps> = ({
  title,
  onPress,
  textColor,
  textStyle,
  style,
}) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <TouchableOpacity style={[style]} onPress={onPress} activeOpacity={0.6}>
      <Text
        style={[
          styles.buttonText,
          { color: textColor || colors.basicButton },
          textStyle,
        ]}
      >
        {title}
      </Text>
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
