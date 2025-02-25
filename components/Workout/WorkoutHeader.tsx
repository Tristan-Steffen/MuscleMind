import React, { useEffect, useState } from "react";
import { View, useWindowDimensions, Alert } from "react-native";
import { Text } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import IconButton from "@/components/Buttons/IconButton";
import HeaderButton from "../Buttons/HeaderButton";
import { useWorkoutContext } from "@/context/WorkoutContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface WorkoutHeaderProps {
  onBackToWorkout: () => void;
  onFinishWorkout: () => void;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({ onBackToWorkout, onFinishWorkout }) => {
  const { colors } = useTheme() as CustomTheme;
  const { workoutStartTime, selectedWorkoutInstance } = useWorkoutContext();
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const screenHeight = useWindowDimensions().height * 0.1;

  useEffect(() => {
    if (!workoutStartTime) return;
    setElapsedTime(Date.now() - workoutStartTime);
  }, []);

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
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleFinishWorkoutConfirmation = () => {
    Alert.alert(
      "End Workout",
      "Are you sure you want to end and save the workout so far?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: onFinishWorkout },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="justify-center rounded-t-[20px] bg-background" style={{ height: screenHeight }}>
      {/* Timer Bar */}
      <View
        className="absolute top-[10px] left-1/2 w-[80px] h-[5px] rounded-full bg-text"
        style={{ marginLeft: -40 }}
      />
      {/* Header Content */}
      <View className="flex-row justify-between items-center px-5">
        <View className="w-1/3 flex-row justify-start">
          {selectedWorkoutInstance && (
            <IconButton
              icon={<FontAwesome name="arrow-circle-left" size={32} color={colors.text} />}
              onPress={onBackToWorkout}
            />
          )}
        </View>
        <Text className="text-[20px] font-bold text-center text-text">
          {formatTime(elapsedTime)}
        </Text>
        <HeaderButton text="End Workout" onPress={handleFinishWorkoutConfirmation} />
      </View>
    </View>
  );
};

export default WorkoutHeader;
