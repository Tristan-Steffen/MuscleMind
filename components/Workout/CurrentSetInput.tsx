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
        value: number
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
    const increment = (value: number | null) => (value || 0) + 1;
    const decrement = (value: number | null) => Math.max((value || 0) - 1, 0);

    return (
        <View className="border p-4 rounded mb-6" style={{ borderColor: colors.border }}>
            <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
                Current Set
            </Text>
            <View className="flex-row justify-between">
                {/* Reps Column */}
                <View className="items-center flex-1">
                    <Text style={{ color: colors.text, marginBottom: 4 }}>Reps</Text>
                    <TouchableOpacity
                        onPress={() => onSetChange(currentSetIndex, "reps", increment(currentSet.reps))}
                        className="p-2"
                    >
                        <FontAwesome name="plus-circle" size={24} color={colors.lightBackground} />
                    </TouchableOpacity>
                    <InputField
                        placeholder="0"
                        className="w-16 text-center"
                        style={{
                            backgroundColor: colors.background,
                            color: colors.text,
                            marginVertical: 8,
                            textAlign: "center",
                        }}
                        value={currentSet.reps ? currentSet.reps.toString() : "0"}
                        keyboardType="numeric"
                        onChangeText={(value) =>
                            onSetChange(currentSetIndex, "reps", Number(value))
                        }
                    />
                    <TouchableOpacity
                        onPress={() => onSetChange(currentSetIndex, "reps", decrement(currentSet.reps))}
                        className="p-2"
                    >
                        <FontAwesome name="minus-circle" size={24} color={colors.lightBackground} />
                    </TouchableOpacity>
                </View>
                {/* Weight Column */}
                <View className="items-center flex-1">
                    <Text style={{ color: colors.text, marginBottom: 4 }}>Weight</Text>
                    <TouchableOpacity
                        onPress={() => onSetChange(currentSetIndex, "weight", increment(currentSet.weight))}
                        className="p-2"
                    >
                        <FontAwesome name="plus-circle" size={24} color={colors.lightBackground} />
                    </TouchableOpacity>
                    <InputField
                        placeholder="0"
                        className="w-16 text-center"
                        style={{
                            backgroundColor: colors.background,
                            color: colors.text,
                            marginVertical: 8,
                            textAlign: "center",
                        }}
                        value={currentSet.weight ? currentSet.weight.toString() : "0"}
                        keyboardType="numeric"
                        onChangeText={(value) =>
                            onSetChange(currentSetIndex, "weight", Number(value))
                        }
                    />
                    <TouchableOpacity
                        onPress={() => onSetChange(currentSetIndex, "weight", decrement(currentSet.weight))}
                        className="p-2"
                    >
                        <FontAwesome name="minus-circle" size={24} color={colors.lightBackground} />
                    </TouchableOpacity>
                </View>
                {/* RIR Column */}
                <View className="items-center flex-1">
                    <Text style={{ color: colors.text, marginBottom: 4 }}>RIR</Text>
                    <TouchableOpacity
                        onPress={() =>
                            onSetChange(currentSetIndex, "repsInReserve", increment(currentSet.repsInReserve!))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="plus-circle" size={24} color={colors.lightBackground} />
                    </TouchableOpacity>
                    <InputField
                        placeholder="0"
                        className="w-16 text-center"
                        style={{
                            backgroundColor: colors.background,
                            color: colors.text,
                            marginVertical: 8,
                            textAlign: "center",
                        }}
                        value={currentSet.repsInReserve ? currentSet.repsInReserve.toString() : "0"}
                        keyboardType="numeric"
                        onChangeText={(value) =>
                            onSetChange(currentSetIndex, "repsInReserve", Number(value))
                        }
                    />
                    <TouchableOpacity
                        onPress={() =>
                            onSetChange(currentSetIndex, "repsInReserve", decrement(currentSet.repsInReserve!))
                        }
                        className="p-2"
                    >
                        <FontAwesome name="minus-circle" size={24} color={colors.lightBackground} />
                    </TouchableOpacity>
                </View>
            </View>
            <BigButton title="Finish Set" onPress={() => onSetDone(currentSetIndex)} />
        </View>
    );
};