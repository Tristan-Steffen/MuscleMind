import SearchInput from "@/components/Inputs/SearchInput";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExerciseSelector: React.FC = () => {
  const { colors } = useTheme() as CustomTheme;
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search"
        value={searchValue}
        onChangeText={setSearchValue}
      ></SearchInput>
      <Text style={[styles.text, { color: colors.text }]}>
        Exercise Selector
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default ExerciseSelector;
