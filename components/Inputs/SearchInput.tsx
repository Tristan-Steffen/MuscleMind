import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { View } from "../Themed";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  /** Additional Tailwind classes for the container */
  className?: string;
  /** Inline styles for the container */
  style?: any;
} & TextInputProps;

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder,
  className,
  style,
  ...props
}) => {
  const { colors } = useTheme() as CustomTheme;
  return (
    <View
      className={`flex-row items-center border rounded-full px-4 w-full h-12 border-border ${className || ""}`}
      style={style}
    >
      <SearchIcon
        width={20}
        height={20}
        fill={colors.text}  // Use the resolved color value
        className="mr-2.5"
      />
      <TextInput
        className="flex-1 text-base bg-background text-text"
        placeholder={placeholder}
        placeholderTextColor={colors.placeHolderText}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default SearchInput;
