import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import { View } from "../Themed";
import SearchIcon from "@/assets/icons/SearchIcon.svg";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: any;
} & TextInputProps;

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  ...props
}) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View
      className="flex-row items-center border rounded-full px-4 w-full h-12"
      style={[{ borderColor: colors.border }, style]}
    >
      <SearchIcon
        width={20}
        height={20}
        fill={colors.text}
        className="mr-2.5"
      />
      <TextInput
        className="flex-1 text-base"
        style={{
          borderColor: colors.border,
          color: colors.text,
          backgroundColor: colors.background,
        }}
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
