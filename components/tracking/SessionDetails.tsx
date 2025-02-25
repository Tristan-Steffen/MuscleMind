// components/SessionDetails.tsx
import React from "react";
import { View, Text } from "@/components/Themed";
import { Session } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

interface SessionDetailsProps {
    session: Session;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ session }) => {
    const { colors } = useTheme() as CustomTheme;

    return (
        <View
            className="p-4 mb-2 rounded-lg border"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
            <Text className="font-bold text-lg" style={{ color: colors.text }}>
                {session.name}
            </Text>
            <Text style={{ color: colors.text }}>{session.description}</Text>
            <Text style={{ color: colors.text }}>
                {new Date(session.date).toLocaleTimeString()}
            </Text>

            <View className="mt-2 gap-4" style={{ backgroundColor: colors.card }}>
                {session.exercise_instances.map((exerciseInstance) => (
                    <View key={exerciseInstance.id} className="mb-4 rounded-lg border">
                        <Text className="font-bold mb-2" style={{ color: colors.text }}>
                            {exerciseInstance.exercise.name}
                        </Text>

                        {/* Header row */}
                        <View
                            className="flex-row border-b pb-1 mb-1"
                            style={{ borderColor: colors.border }}
                        >
                            <Text className="flex-1 font-bold" style={{ color: colors.text }}>
                                Set
                            </Text>
                            <Text className="flex-1 font-bold" style={{ color: colors.text }}>
                                Weight
                            </Text>
                            <Text className="flex-1 font-bold" style={{ color: colors.text }}>
                                Reps
                            </Text>
                            <Text className="flex-1 font-bold" style={{ color: colors.text }}>
                                Total
                            </Text>
                            <Text className="flex-1 font-bold" style={{ color: colors.text }}>
                                RIR
                            </Text>
                        </View>

                        <View className="gap-2">
                            {exerciseInstance.sets.map((set, index) => (
                                <View key={set.id || index} className="flex-row py-1">
                                    <Text className="flex-1" style={{ color: colors.text }}>
                                        {index + 1}
                                    </Text>
                                    <Text className="flex-1" style={{ color: colors.text }}>
                                        {set.weight}
                                    </Text>
                                    <Text className="flex-1" style={{ color: colors.text }}>
                                        {set.reps}
                                    </Text>
                                    <Text className="flex-1" style={{ color: colors.text }}>
                                        {set.weight! * set.reps!}
                                    </Text>
                                    <Text className="flex-1" style={{ color: colors.text }}>
                                        {set.repsInReserve}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default SessionDetails;
