import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";

type InputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  style?: any;
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
      className="h-12 border rounded-3xl px-4 text-base"
      style={[{ borderColor: colors.border, color: colors.text }, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      {...props}
    />
  );
};

export default InputField;
