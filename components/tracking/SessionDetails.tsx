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
            className="p-4 mb-2 rounded-lg"
            style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}
        >
            <Text className="font-bold text-lg" style={{ color: colors.text }}>
                {session.name}
            </Text>
            <Text style={{ color: colors.text }}>{session.description}</Text>
            <Text style={{ color: colors.text }}>
                {new Date(session.date).toLocaleTimeString()}
            </Text>
            <View className="mt-2">
                {session.exercise_instances.map((exerciseInstance) => (
                    <View key={exerciseInstance.id} className="mb-2">
                        <Text className="font-bold" style={{ color: colors.text }}>
                            {exerciseInstance.exercise.name}
                        </Text>
                        {exerciseInstance.sets.map((set, index) => (
                            <Text key={set.id || index} style={{ color: colors.text }}>
                                Set {index + 1}: {set.weight} kg x {set.reps} reps (RIR: {set.repsInReserve})
                            </Text>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default SessionDetails;
