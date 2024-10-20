import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

type BackButtonProps = {
  onPress: () => void;
};

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
      <FontAwesome name="arrow-circle-left" size={32} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { marginHorizontal: 4 },
});

export default BackButton;
