import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

type BackButtonProps = {
  onPress: () => void;
  text: string;
  active?: boolean;
};

const BackButton: React.FC<BackButtonProps> = ({ onPress, text, active }) => {
  const { colors } = useTheme() as CustomTheme;

  if (active == undefined || active) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { backgroundColor: colors.text }]}
      >
        <Text style={[styles.text, { color: colors.card }]}>{text}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.button, { backgroundColor: colors.border }]}>
        <Text style={[styles.text, { color: colors.card }]}>{text}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    height: 28,
    width: 70,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 700,
    marginHorizontal: 10,
  },
});

export default BackButton;
