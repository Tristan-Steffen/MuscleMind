import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useTheme } from "@react-navigation/native"; // To access theme colors

type InputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
} & TextInputProps;

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <TextInput
      style={[styles.input, { borderColor: colors.border, color: colors.text }]}
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
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default InputField;
