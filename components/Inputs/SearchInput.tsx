import React from "react";
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native"; // To access theme colors
import { CustomTheme } from "@/constants/Colors";
import { View } from "../Themed";
import SearchIcon from "@/assets/icons/SearchIcon.svg";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: ViewStyle;
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
      style={[styles.inputContainer, { borderColor: colors.border }, style]}
    >
      <SearchIcon
        width={20}
        height={20}
        fill={colors.text}
        style={styles.icon}
      />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.background,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeHolderText}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchInput;
