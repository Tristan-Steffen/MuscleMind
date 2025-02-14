import React from "react";
import { View, Text } from "@/components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/constants/Colors";
import { router } from "expo-router";
import { Session } from "@/Interfaces/sessionInterfaces";

type PresetCardProps = {
  session: Session;
  className?: string;
};

const PresetCard: React.FC<PresetCardProps> = ({ session, className }) => {
  const lastIndex = session.exercise_instances.length - 1;
  const { colors } = useTheme() as CustomTheme;

  const onPressCard = () => {
    return () => {
      router.navigate({
        pathname: "/workouts/workoutBuilder",
        params: { session: JSON.stringify(session) },
      });
    };
  };

  return (
    <View
      className={`rounded-[25px] w-[48%] ${className || ""}`}
      style={[{ backgroundColor: colors.darkBackground }]}
    >
      <TouchableOpacity onPress={onPressCard()}>
        <View
          className="h-10 rounded-[25px] px-2.5 justify-center"
          style={{ backgroundColor: colors.basicButton }}
        >
          <Text className="text-base font-semibold" style={{ color: colors.text }}>
            {session.name}
          </Text>
        </View>

        <View>
          {session.exercise_instances.map((exerciseInstance, index) => (
            <View
              key={exerciseInstance.exercise.id?.toString() || index}
              className={`h-10 flex-row justify-between items-center px-1.5 ${index === lastIndex ? "rounded-b-[25px]" : ""
                }`}
              style={{
                backgroundColor:
                  index % 2 === 0 ? colors.darkBackground : colors.darkerBackground,
              }}
            >
              <Text className="text-xs" style={{ color: colors.text }}>
                {exerciseInstance.exercise.name}
              </Text>
              <Text className="text-xs font-medium" style={{ color: colors.text }}>
                {exerciseInstance.sets.length} sets
              </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PresetCard;
