import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import { Text } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

interface WorkoutHeaderProps {
  onBackToWorkout: () => void; // updated prop
  onFinishWorkout: () => void;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  onBackToWorkout,
  onFinishWorkout,
}) => {
  const { colors } = useTheme() as CustomTheme;
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
      className="justify-center rounded-t-[20px]"
      style={{
        height: screenHeight,
        backgroundColor: colors.darkerBackground,
      }}
    >
      <View
        className="absolute top-[10px] left-1/2 w-[80px] h-[5px] rounded-[20px]"
        style={{ marginLeft: -40, backgroundColor: colors.text }}
      />

      <View className="flex-row justify-between items-center px-5">
        <TouchableOpacity
          onPress={onBackToWorkout}
          className="flex-row items-center"
        >
          <FontAwesome name="arrow-left" size={24} color={colors.text} />
          <Text className="ml-2 text-base font-bold" style={{ color: colors.text }}>
            Back to Workout
          </Text>
        </TouchableOpacity>

        <Text className="text-[20px] font-bold" style={{ color: colors.text }}>
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </Text>

        <TouchableOpacity
          onPress={onFinishWorkout}
          className="px-3 py-1 rounded bg-blue-500"
        >
          <Text className="text-base font-bold" style={{ color: colors.text }}>
            Finish Workout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutHeader;
