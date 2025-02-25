import React from "react";
import { TextInput, TextInputProps } from "react-native";

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
  return (
    <TextInput
      className="h-12 border rounded-3xl px-4 text-base border-border text-text bg-background"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      {...props}
      style={style}
    />
  );
};

export default InputField;
