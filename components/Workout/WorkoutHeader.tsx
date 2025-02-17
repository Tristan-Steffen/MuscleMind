import React, { useEffect, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Text } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import { useSessionContext } from "@/context/SessionContext";
import IconButton from "@/components/Buttons/IconButton";
import BigButton from "@/components/Buttons/BigButton";
import Button from "../Buttons/Button";
import HeaderButton from "../Buttons/HeaderButton";

interface WorkoutHeaderProps {
  onBackToWorkout: () => void;
  onFinishWorkout: () => void;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  onBackToWorkout,
  onFinishWorkout,
}) => {
  const { colors } = useTheme() as CustomTheme;
  const { workoutStartTime, selectedExerciseInstance } = useSessionContext();
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const screenHeight = useWindowDimensions().height * 0.1;

  useEffect(() => {
    if (!workoutStartTime) return;
    setElapsedTime(Date.now() - workoutStartTime);
  }, []);

  // Update elapsed time every second
  useEffect(() => {
    if (!workoutStartTime) return;
    const timer = setInterval(() => {
      setElapsedTime(Date.now() - workoutStartTime);
    }, 200);
    return () => clearInterval(timer);
  }, [workoutStartTime]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View
      className="justify-center rounded-t-[20px]"
      style={{
        height: screenHeight,
        backgroundColor: colors.background,
      }}
    >
      {/* Timer Bar */}
      <View
        className="absolute top-[10px] left-1/2 w-[80px] h-[5px] rounded-[20px]"
        style={{ marginLeft: -40, backgroundColor: colors.text }}
      />

      {/* Header Content */}
      <View className="flex-row justify-between items-center px-5">
        <View className="w-1/3 flex-row justify-start">
          {selectedExerciseInstance && (
            <IconButton onPress={onBackToWorkout} />
          )}
        </View>
        <Text className="text-[20px] font-bold text-center" style={{ color: colors.text }}>
          {formatTime(elapsedTime)}
        </Text>
        <HeaderButton text="End Workout" onPress={onFinishWorkout} />
      </View>
    </View>
  );
};

export default WorkoutHeader;
