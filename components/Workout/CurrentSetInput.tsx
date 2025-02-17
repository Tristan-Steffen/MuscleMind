import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Themed";
import { Set } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import InputField from "@/components/Inputs/TextInput";
import BigButton from "../Buttons/BigButton";

interface CurrentSetInputProps {
    currentSet: Set;
    currentSetIndex: number;
    onSetChange: (
        setIndex: number,
        field: "reps" | "weight" | "repsInReserve",
        value: number | string
    ) => void;
    onSetDone: (setIndex: number) => void;
    colors: CustomTheme["colors"];
}

export const CurrentSetInput: React.FC<CurrentSetInputProps> = ({
    currentSet,
    currentSetIndex,
    onSetChange,
    onSetDone,
    colors,
}) => {
    // Helper functions for incrementing and decrementing.
    // For reps and RIR (integers), we use parseInt.
    const incrementInt = (value: number | string | null) => {
        const num = typeof value === "number" ? value : parseInt(value || "0", 10);
        return num + 1;
    };

    const decrementInt = (value: number | string | null) => {
        const num = typeof value === "number" ? value : parseInt(value || "0", 10);
        return Math.max(num - 1, 0);
    };

    // For weight, allow decimals.
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

    return (
        <View
            className="border p-4 rounded-3xl mb-6"
            style={[
                { borderColor: colors.border, backgroundColor: colors.darkerBackground },
            ]}
        >
            <Text className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
                Current Set
            </Text>
            <View className="flex-row justify-between">
                {/* Reps Column */}
                <View className="items-center flex-1">
                    <Text className="text-xl">Reps</Text>
                    <TouchableOpacity
                        onPress={() =>
                            onSetChange(currentSetIndex, "reps", incrementInt(currentSet.reps))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="plus-circle" size={44} color={colors.lightBackground} />
                    </TouchableOpacity>
                    <InputField
                        placeholder="0"
                        className="w-24 h-12 text-center text-2xl border rounded-full my-2"
                        style={{ color: colors.text }}
                        value={
                            currentSet.reps !== undefined && currentSet.reps !== null
                                ? currentSet.reps.toString()
                                : ""
                        }
                        keyboardType="numeric"
                        onChangeText={(value) => {
                            const normalized = normalizeInput(value);
                            if (normalized === "") {
                                onSetChange(currentSetIndex, "reps", "");
                            } else {
                                onSetChange(currentSetIndex, "reps", parseInt(normalized, 10));
                            }
                        }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            onSetChange(currentSetIndex, "reps", decrementInt(currentSet.reps))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="minus-circle" size={44} color={colors.lightBackground} />
                    </TouchableOpacity>
                </View>
                {/* Weight Column */}
                <View className="items-center flex-1">
                    <Text className="text-xl">Weight</Text>
                    <TouchableOpacity
                        onPress={() =>
                            onSetChange(currentSetIndex, "weight", incrementDec(currentSet.weight))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="plus-circle" size={44} color={colors.lightBackground} />
                    </TouchableOpacity>
                    <InputField
                        placeholder="0"
                        className="w-24 h-12 text-center text-2xl border rounded-full my-2"
                        style={{ color: colors.text }}
                        value={
                            currentSet.weight !== undefined && currentSet.weight !== null
                                ? currentSet.weight.toString()
                                : ""
                        }
                        keyboardType="decimal-pad"
                        onChangeText={(value) => {
                            const normalized = normalizeInput(value);
                            if (normalized === "") {
                                onSetChange(currentSetIndex, "weight", "");
                            } else if (normalized.endsWith(".")) {
                                // Preserve trailing dot for decimal input
                                onSetChange(currentSetIndex, "weight", normalized);
                            } else {
                                onSetChange(currentSetIndex, "weight", parseFloat(normalized));
                            }
                        }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            onSetChange(currentSetIndex, "weight", decrementDec(currentSet.weight))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="minus-circle" size={44} color={colors.lightBackground} />
                    </TouchableOpacity>
                </View>
                {/* RIR Column */}
                <View className="items-center flex-1">
                    <Text className="text-xl">RIR</Text>
                    <TouchableOpacity
                        onPress={() =>
                            onSetChange(currentSetIndex, "repsInReserve", incrementInt(currentSet.repsInReserve!))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="plus-circle" size={44} color={colors.lightBackground} />
                    </TouchableOpacity>
                    <InputField
                        placeholder="0"
                        className="w-24 h-12 text-center text-2xl border rounded-full my-2"
                        style={{ color: colors.text }}
                        value={
                            currentSet.repsInReserve !== undefined && currentSet.repsInReserve !== null
                                ? currentSet.repsInReserve.toString()
                                : ""
                        }
                        keyboardType="numeric"
                        onChangeText={(value) => {
                            const normalized = normalizeInput(value);
                            if (normalized === "") {
                                onSetChange(currentSetIndex, "repsInReserve", "");
                            } else {
                                onSetChange(currentSetIndex, "repsInReserve", parseInt(normalized, 10));
                            }
                        }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            onSetChange(currentSetIndex, "repsInReserve", decrementInt(currentSet.repsInReserve!))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="minus-circle" size={44} color={colors.lightBackground} />
                    </TouchableOpacity>
                </View>
            </View>
            <BigButton title="Finish Set" onPress={() => onSetDone(currentSetIndex)} />
        </View>
    );
};
