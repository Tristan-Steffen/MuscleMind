import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface WorkoutHeaderProps {
  onDeleteWorkout: () => void;
  onFinishWorkout: () => void;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  onDeleteWorkout,
  onFinishWorkout,
}) => {
  const { colors } = useTheme() as CustomTheme;

  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 59) {
              setHours((prevHours) => prevHours + 1);
              return 0;
            }
            return prevMinutes + 1;
          });
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => (value < 10 ? `0${value}` : value);

  return (
    <View
      style={[styles.headerContainer, { backgroundColor: colors.background }]}
    >
      <TouchableOpacity style={styles.button} onPress={onDeleteWorkout}>
        <FontAwesome name="trash" size={24} color={colors.text} />
      </TouchableOpacity>

      <Text style={[styles.timerText, { color: colors.text }]}>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </Text>

      <TouchableOpacity style={styles.button} onPress={onFinishWorkout}>
        <FontAwesome name="check" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: "10%",
  },
  button: {},
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WorkoutHeader;
