// components/SessionDetails.tsx
import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { Session } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface SessionDetailsProps {
    session: Session;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ session }) => {
    const { colors } = useTheme() as CustomTheme;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setIsCollapsed((prev) => !prev);
    };

    const getTotal = (weight: number, reps: number) => weight * reps;

    return (
        <View
            className="mb-2 border rounded-lg"
            style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
            }}
        >
            {/* Header Row with Chevron */}
            <View className="flex-row items-center justify-between p-3 rounded-lg">
                <Text className="font-bold text-lg ml-2">{session.name}</Text>

                <TouchableOpacity onPress={toggleCollapsed}>
                    <FontAwesome
                        name={isCollapsed ? "chevron-down" : "chevron-up"}
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
            </View>

            {/* Additional Session Details (only visible when expanded) */}
            {!isCollapsed && (
                <>
                    {/* Exercise Instances */}
                    <View className="mt-2 gap-2" style={{ backgroundColor: colors.card }}>
                        <View className="m-2 mb-0 p-2 rounded-md">
                            <Text>{session.description}</Text>
                        </View>
                        {session.exercise_instances.map((exerciseInstance) => (
                            <View key={exerciseInstance.id} className="mb-4 m-2 p-2 rounded-md">
                                {/* Always show the exercise name */}
                                <Text className="font-bold">
                                    {exerciseInstance.exercise.name}
                                </Text>
                                {/* Only show the table of sets when expanded */}
                                {/* Header Row */}
                                <View
                                    className="flex flex-row border-b mb-1"
                                    style={{ borderColor: colors.border }}
                                >
                                    <Text className="flex-1 text-center font-bold">Set</Text>
                                    <Text className="flex-1 text-center font-bold">Weight</Text>
                                    <Text className="flex-1 text-center font-bold">Reps</Text>
                                    <Text className="flex-1 text-center font-bold">Total</Text>
                                    <Text className="flex-1 text-center font-bold">RIR</Text>
                                </View>
                                {/* Data Rows */}
                                {exerciseInstance.sets.map((set, index) => (
                                    <View key={set.id || index} className="flex flex-row my-1">
                                        <Text className="flex-1 text-center">{index + 1}</Text>
                                        <Text className="flex-1 text-center">{set.weight}</Text>
                                        <Text className="flex-1 text-center">{set.reps}</Text>
                                        <Text className="flex-1 text-center">
                                            {getTotal(set.weight!, set.reps!)}
                                        </Text>
                                        <Text className="flex-1 text-center">
                                            {set.repsInReserve}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

export default SessionDetails;
