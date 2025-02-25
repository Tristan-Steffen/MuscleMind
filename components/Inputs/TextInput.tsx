import React from "react";
import { TextInput, TextInputProps } from "react-native";

type InputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  className?: string;
} & TextInputProps;

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  className,
  ...props
}) => {
  return (
    <TextInput
      className={`h-12 border rounded-3xl px-4 text-base border-border text-text bg-background ${className}`}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      {...props}
    />
  );
};

export default InputField;
