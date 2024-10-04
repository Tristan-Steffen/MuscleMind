import React from "react";
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native"; // To access theme colors
import { CustomTheme } from "@/constants/Colors";

type InputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  style?: ViewStyle;
} & TextInputProps;

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style,
  ...props
}) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: colors.border,
          color: colors.text,
        },
        style,
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default InputField;
