// src/components/Workout/CurrentSetInput.tsx
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Themed";
import { Set } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import InputField from "@/components/Inputs/TextInput";
import BigButton from "../Buttons/BigButton";
import { useWorkoutContext } from "@/context/WorkoutContext";

interface CurrentSetInputProps {
    currentSet: Set;
    currentSetIndex: number;
    colors: CustomTheme["colors"];
}

export const CurrentSetInput: React.FC<CurrentSetInputProps> = ({
    currentSet,
    currentSetIndex,
    colors,
}) => {
    const { updateCurrentSet, toggleSetDone } = useWorkoutContext();

    // Helpers for integer fields
    const incrementInt = (value: number | string | null) => {
        const num = typeof value === "number" ? value : parseInt(value || "0", 10);
        return num + 1;
    };
    const decrementInt = (value: number | string | null) => {
        const num = typeof value === "number" ? value : parseInt(value || "0", 10);
        return Math.max(num - 1, 0);
    };

    // Helpers for decimal fields (weight)
    const incrementDec = (value: number | string | null) => {
        const num = typeof value === "number" ? value : parseFloat(value || "0");
        return num + 1;
    };
    const decrementDec = (value: number | string | null) => {
        const num = typeof value === "number" ? value : parseFloat(value || "0");
        return Math.max(num - 1, 0);
    };

    // Utility to normalize input (replace all commas with periods)
    const normalizeInput = (value: string) => value.replace(/,/g, ".");

    // Local state for weight input (to preserve trailing decimals)
    const [weightInput, setWeightInput] = useState(
        currentSet.weight !== undefined && currentSet.weight !== null
            ? currentSet.weight.toString()
            : ""
    );

    // If the context changes externally, update the local state.
    useEffect(() => {
        setWeightInput(
            currentSet.weight !== undefined && currentSet.weight !== null
                ? currentSet.weight.toString()
                : ""
        );
    }, [currentSet.weight]);

    return (
        <View
            className="border p-4 rounded-3xl mb-6"
            style={[
                { borderColor: colors.border, backgroundColor: colors.darkerBackground },
            ]}
        >
            <View className="flex-row justify-between">
                {/* Reps Column */}
                <View className="items-center flex-1">
                    <Text className="text-xl">Reps</Text>
                    <TouchableOpacity
                        onPress={() =>
                            updateCurrentSet(currentSetIndex, "reps", incrementInt(currentSet.reps))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="plus-circle" size={44} color={colors.highlight} />
                    </TouchableOpacity>
                    <InputField
                        placeholder="0"
                        className="w-24 h-12 text-center text-2xl border rounded-full my-2"
                        style={{ color: colors.text }}
                        value={currentSet.reps?.toString() || ""}
                        keyboardType="numeric"
                        onChangeText={(value) => {
                            const normalized = normalizeInput(value);
                            if (normalized === "") {
                                updateCurrentSet(currentSetIndex, "reps", 0);
                            } else {
                                updateCurrentSet(currentSetIndex, "reps", parseInt(normalized, 10));
                            }
                        }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            updateCurrentSet(currentSetIndex, "reps", decrementInt(currentSet.reps))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="minus-circle" size={44} color={colors.highlight} />
                    </TouchableOpacity>
                </View>
                {/* Weight Column */}
                <View className="items-center flex-1">
                    <Text className="text-xl">Weight</Text>
                    <TouchableOpacity
                        onPress={() =>
                            updateCurrentSet(currentSetIndex, "weight", incrementDec(currentSet.weight))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="plus-circle" size={44} color={colors.highlight} />
                    </TouchableOpacity>
                    <InputField
                        placeholder="0"
                        className="w-24 h-12 text-center text-2xl border rounded-full my-2"
                        style={{ color: colors.text }}
                        value={weightInput}
                        keyboardType="decimal-pad"
                        onChangeText={(value) => {
                            const normalized = normalizeInput(value);
                            setWeightInput(normalized);
                            // If the input does NOT end with a period, update the context immediately.
                            if (!normalized.endsWith(".")) {
                                const parsed = parseFloat(normalized);
                                if (!isNaN(parsed)) {
                                    updateCurrentSet(currentSetIndex, "weight", parsed);
                                }
                            }
                        }}
                        onBlur={() => {
                            // On blur, parse and update the context.
                            const parsed = parseFloat(weightInput);
                            if (!isNaN(parsed)) {
                                updateCurrentSet(currentSetIndex, "weight", parsed);
                            }
                        }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            updateCurrentSet(currentSetIndex, "weight", decrementDec(currentSet.weight))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="minus-circle" size={44} color={colors.highlight} />
                    </TouchableOpacity>
                </View>
                {/* RIR Column */}
                <View className="items-center flex-1">
                    <Text className="text-xl">RIR</Text>
                    <TouchableOpacity
                        onPress={() =>
                            updateCurrentSet(
                                currentSetIndex,
                                "repsInReserve",
                                incrementInt(currentSet.repsInReserve!)
                            )
                        }
                        className="p-2"
                    >
                        <FontAwesome name="plus-circle" size={44} color={colors.highlight} />
                    </TouchableOpacity>
                    <InputField
                        placeholder="0"
                        className="w-24 h-12 text-center text-2xl border rounded-full my-2"
                        style={{ color: colors.text }}
                        value={currentSet.repsInReserve?.toString() || ""}
                        keyboardType="numeric"
                        onChangeText={(value) => {
                            const normalized = normalizeInput(value);
                            if (normalized === "") {
                                updateCurrentSet(currentSetIndex, "repsInReserve", 0);
                            } else {
                                updateCurrentSet(currentSetIndex, "repsInReserve", parseInt(normalized, 10));
                            }
                        }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            updateCurrentSet(
                                currentSetIndex,
                                "repsInReserve",
                                decrementInt(currentSet.repsInReserve!)
                            )
                        }
                        className="p-2"
                    >
                        <FontAwesome name="minus-circle" size={44} color={colors.highlight} />
                    </TouchableOpacity>
                </View>
            </View>
            <BigButton title="Finish Set" onPress={() => toggleSetDone(currentSetIndex)} />
        </View>
    );
};
