import React from "react";
import { View } from "react-native";
import { Text } from "@/components/Themed";
import { Set } from "@/Interfaces/sessionInterfaces";
import BigButton from "../Buttons/BigButton";

interface PlannedSetsProps {
    sets: Set[];
    currentSetIndex: number;
    onAddSet: () => void;
    // No longer passing colors—Tailwind classes will handle that.
    mutedColorClass?: string;
}

export const PlannedSets: React.FC<PlannedSetsProps> = ({
    sets,
    currentSetIndex,
    onAddSet,
    mutedColorClass = "text-muted",
}) => {
    return (
        <View className="mb-6">
            <Text className="text-xl font-bold mb-2 text-text">Planned Sets</Text>
            {/* Header Row */}
            <View className="flex-row justify-between border-b pb-2 border-border">
                <Text className="flex-1 text-center font-bold text-text">Set</Text>
                <Text className="flex-1 text-center font-bold text-text">Reps</Text>
                <Text className="flex-1 text-center font-bold text-text">Weight</Text>
                <Text className="flex-1 text-center font-bold text-text">Total</Text>
                <Text className="flex-1 text-center font-bold text-text">RIR</Text>
            </View>
            {/* Sets List */}
            {sets.map((set, index) => {
                const isCurrent = index === currentSetIndex && !set.done;
                // If set is not done, use muted class; otherwise use normal text
                const valueClass = set.done ? "text-text" : mutedColorClass;
                return (
                    <View
                        key={index}
                        className={`flex-row justify-between py-2 ${isCurrent ? "bg-darkBackground" : "bg-background"
                            }`}
                    >
                        <Text className="flex-1 text-center text-text">{index + 1}</Text>
                        <Text className={`flex-1 text-center ${valueClass}`}>
                            {set.reps !== undefined ? set.reps!.toString() : "-"}
                        </Text>
                        <Text className={`flex-1 text-center ${valueClass}`}>
                            {set.weight !== undefined ? set.weight!.toString() : "-"}
                        </Text>
                        <Text className={`flex-1 text-center ${valueClass}`}>
                            {set.reps !== undefined && set.weight !== undefined
                                ? (set.reps! * set.weight!).toString()
                                : "-"}
                        </Text>
                        <Text className={`flex-1 text-center ${valueClass}`}>
                            {set.repsInReserve ? set.repsInReserve!.toString() : "-"}
                        </Text>
                    </View>
                );
            })}
            <BigButton title="Add Set" onPress={onAddSet} />
        </View>
    );
};
