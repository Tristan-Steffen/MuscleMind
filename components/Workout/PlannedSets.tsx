// src/components/Workout/PlannedSets.tsx
import React from "react";
import { View } from "react-native";
import { Text } from "@/components/Themed";
import { Set } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import BigButton from "../Buttons/BigButton";

interface PlannedSetsProps {
    sets: Set[];
    currentSetIndex: number;
    onAddSet: () => void;
    colors: CustomTheme["colors"];
    mutedColor?: string;
}

export const PlannedSets: React.FC<PlannedSetsProps> = ({
    sets,
    currentSetIndex,
    onAddSet,
    colors,
    mutedColor = "#999",
}) => {
    return (
        <View className="mb-6">
            <Text className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                Planned Sets
            </Text>
            {/* Header Row */}
            <View
                className="flex-row justify-between border-b pb-2"
                style={{ borderColor: colors.border }}
            >
                <Text className="flex-1 text-center font-bold" style={{ color: colors.text }}>
                    Set
                </Text>
                <Text className="flex-1 text-center font-bold" style={{ color: colors.text }}>
                    Reps
                </Text>
                <Text className="flex-1 text-center font-bold" style={{ color: colors.text }}>
                    Weight
                </Text>
                <Text className="flex-1 text-center font-bold" style={{ color: colors.text }}>
                    Total
                </Text>
                <Text className="flex-1 text-center font-bold" style={{ color: colors.text }}>
                    RIR
                </Text>
            </View>
            {/* Sets List */}
            {sets.map((set, index) => {
                const isCurrent = index === currentSetIndex && !set.done;
                const textColor = set.done ? colors.text : mutedColor;
                return (
                    <View
                        key={index}
                        className="flex-row justify-between py-2"
                        style={{
                            backgroundColor: isCurrent
                                ? (colors.darkBackground || "#e0e0e0")
                                : colors.background,
                        }}
                    >
                        <Text className="flex-1 text-center" style={{ color: colors.text }}>
                            {index + 1}
                        </Text>
                        <Text className="flex-1 text-center" style={{ color: textColor }}>
                            {set.reps !== undefined ? set.reps!.toString() : "-"}
                        </Text>
                        <Text className="flex-1 text-center" style={{ color: textColor }}>
                            {set.weight !== undefined ? set.weight!.toString() : "-"}
                        </Text>
                        <Text className="flex-1 text-center" style={{ color: textColor }}>
                            {(set.reps !== undefined && set.weight !== undefined)
                                ? (set.reps! * set.weight!).toString()
                                : "-"}
                        </Text>
                        <Text className="flex-1 text-center" style={{ color: textColor }}>
                            {set.repsInReserve !== null ? set.repsInReserve!.toString() : "-"}
                        </Text>
                    </View>
                );
            })}
            <BigButton title="Add Set" onPress={onAddSet} />
        </View>
    );
};
