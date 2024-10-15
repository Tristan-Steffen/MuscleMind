import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Text } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CustomTheme } from "@/constants/Colors";

interface WorkoutHeaderProps {
  onDeleteWorkout: () => void;
  onFinishWorkout: () => void;
  colors: CustomTheme["colors"];
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  onDeleteWorkout,
  onFinishWorkout,
  colors,
}) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);

  const screenHeight = useWindowDimensions().height * 0.1;

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
      style={[
        styles.container,
        {
          height: screenHeight,
          backgroundColor: colors.darkerBackground,
        },
      ]}
    >
      <View style={[styles.bar, { backgroundColor: colors.text }]}></View>
      <View style={[styles.headerContent]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bar: {
    position: "absolute",
    top: 10,
    height: 5,
    left: "50%",
    marginLeft: -40,
    width: 80,
    borderRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: { width: 25 },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WorkoutHeader;
