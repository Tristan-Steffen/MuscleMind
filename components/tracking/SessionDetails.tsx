// components/SessionDetails.tsx
import React, { useState, useRef } from "react";
import { TouchableOpacity, Modal, View as RNView } from "react-native";
import { Session } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "../Themed";

interface SessionDetailsProps {
    session: Session;
    onDelete: (session: Session) => void;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ session, onDelete }) => {
    const { colors } = useTheme() as CustomTheme;
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const dropdownButtonRef = useRef<RNView>(null);

    const toggleCollapsed = () => setIsCollapsed((prev) => !prev);
    const getTotal = (weight: number, reps: number) => weight * reps;

    const dropdownData = [
        { label: "Edit", value: "edit" },
        { label: "Delete", value: "delete" },
    ];

    const handleDropdownChange = (item: { label: string; value: string }) => {
        console.log("Selected option:", item.value);
        if (item.value === "delete") {
            onDelete(session);
        }
        setDropdownVisible(false);
    };

    const openDropdown = () => {
        if (dropdownButtonRef.current) {
            dropdownButtonRef.current.measureInWindow(
                (x: number, y: number, width: number, height: number) => {
                    setDropdownPosition({ top: y + height, left: x - width - 30 });
                    setDropdownVisible(true);
                }
            );
        }
    };

    return (
        <View
            className="border rounded-lg"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
            {/* Header Row */}
            <TouchableOpacity
                onPress={toggleCollapsed}
                className={`flex-row items-center justify-between p-3 rounded-t-lg ${isCollapsed ? "rounded-b-lg" : "border-b"
                    }`}
                style={{ borderColor: colors.border, backgroundColor: colors.navigator }}
            >
                <Text className="font-bold text-lg ml-2">{session.name}</Text>
                <FontAwesome
                    name={isCollapsed ? "chevron-down" : "chevron-up"}
                    size={24}
                    color={colors.text}
                />
            </TouchableOpacity>

            {/* Additional Session Details */}
            {!isCollapsed && (
                <View className="p-2 pb-0" style={{ backgroundColor: colors.card }}>
                    <View className="rounded-md flex-row items-center justify-between pl-2 mt-2 mb-4">
                        <Text className="flex-1">{session.description}</Text>
                        <RNView ref={dropdownButtonRef}>
                            <TouchableOpacity
                                onPress={openDropdown}
                                className="w-10 h-10 flex items-center justify-center"
                            >
                                <FontAwesome name="ellipsis-v" size={20} color={colors.text} />
                            </TouchableOpacity>
                        </RNView>
                    </View>

                    {/* Exercise Instances */}
                    {session.exercise_instances.map((exerciseInstance) => (
                        <View key={exerciseInstance.id} className="mb-4 rounded-md">
                            <View
                                className="border-b rounded-t-md p-2"
                                style={{ borderColor: colors.border }}
                            >
                                <Text className="font-bold">
                                    {exerciseInstance.exercise.name}
                                </Text>
                            </View>
                            <View className="flex-row mb-1 pt-2">
                                <Text className="flex-1 text-center font-bold">Set</Text>
                                <Text className="flex-1 text-center font-bold">Weight</Text>
                                <Text className="flex-1 text-center font-bold">Reps</Text>
                                <Text className="flex-1 text-center font-bold">Total</Text>
                                <Text className="flex-1 text-center font-bold">RIR</Text>
                            </View>
                            {exerciseInstance.sets.map((set, index) => (
                                <View key={set.id || index} className="flex-row my-1">
                                    <Text className="flex-1 text-center">{index + 1}</Text>
                                    <Text className="flex-1 text-center">{set.weight}</Text>
                                    <Text className="flex-1 text-center">{set.reps}</Text>
                                    <Text className="flex-1 text-center">
                                        {getTotal(set.weight!, set.reps!)}
                                    </Text>
                                    <Text className="flex-1 text-center">{set.repsInReserve}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            )}

            {/* Modal for the dropdown list */}
            <Modal
                visible={dropdownVisible}
                transparent
                animationType="none"
                onRequestClose={() => setDropdownVisible(false)}
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={() => setDropdownVisible(false)}
                >
                    <View
                        style={{
                            position: "absolute",
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                        }}
                    >
                        <View
                            className="w-50 border rounded py-1 shadow-lg"
                            style={{
                                width: 100,
                                backgroundColor: colors.card,
                                borderColor: colors.border,
                                borderWidth: 1,
                            }}
                        >
                            {dropdownData.map((item) => (
                                <TouchableOpacity
                                    key={item.value}
                                    onPress={() => handleDropdownChange(item)}
                                    className="p-2"
                                >
                                    <Text style={{ color: colors.text }}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default SessionDetails;
