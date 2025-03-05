// components/SessionDetails.tsx
import React, { useState, useRef } from "react";
import {
    TouchableOpacity,
    Modal,
    View as RNView,
    TextInput,
} from "react-native";
import { Session } from "@/Interfaces/sessionInterfaces";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "../Themed";

interface SessionDetailsProps {
    session: Session;
    onDelete: (session: Session) => void;
    onSave: (updatedSession: Session) => void;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({
    session,
    onDelete,
    onSave,
}) => {
    const { colors } = useTheme() as CustomTheme;
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const dropdownButtonRef = useRef<RNView>(null);

    // New editing state and a local copy of the session for editing
    const [isEditing, setIsEditing] = useState(false);
    const [editedSession, setEditedSession] = useState<Session>(session);

    const toggleCollapsed = () => setIsCollapsed((prev) => !prev);
    const getTotal = (weight: number, reps: number) => weight * reps;

    const dropdownData = [
        { label: "Edit", value: "edit" },
        { label: "Delete", value: "delete" },
    ];

    const handleDropdownChange = (item: { label: string; value: string }) => {
        if (item.value === "delete") {
            onDelete(session);
        } else if (item.value === "edit") {
            // Initialize our local copy for editing and enable editing mode.
            setEditedSession({
                ...session,
                // Create a deep copy of the exercise_instances and their sets
                exercise_instances: session.exercise_instances.map((ex) => ({
                    ...ex,
                    sets: ex.sets.map((s) => ({ ...s })),
                })),
            });
            setIsEditing(true);
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

    // Called when the user taps the save button.
    const handleSave = () => {
        onSave(editedSession);
        setIsEditing(false);
    };

    // Renders a row for each set. If editing, show TextInputs; otherwise, plain text.
    const renderSetRow = (
        set: any,
        exerciseIndex: number,
        setIndex: number
    ) => {
        if (isEditing) {
            return (
                <View key={set.id || setIndex} className="flex-row my-1">
                    <Text className="flex-1 text-center">{setIndex + 1}</Text>
                    <TextInput
                        className="flex-1 text-center border"
                        style={{ color: colors.text, borderColor: colors.border }}
                        value={String(
                            editedSession.exercise_instances[exerciseIndex].sets[setIndex].weight
                        )}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const newWeight = Number(text);
                            setEditedSession((prev) => {
                                const updatedSession = { ...prev };
                                updatedSession.exercise_instances = updatedSession.exercise_instances.map(
                                    (ex, exIndex) => {
                                        if (exIndex === exerciseIndex) {
                                            return {
                                                ...ex,
                                                sets: ex.sets.map((s, sIndex) => {
                                                    if (sIndex === setIndex) {
                                                        return { ...s, weight: newWeight };
                                                    }
                                                    return s;
                                                }),
                                            };
                                        }
                                        return ex;
                                    }
                                );
                                return updatedSession;
                            });
                        }}
                    />
                    <TextInput
                        className="flex-1 text-center border"
                        style={{ color: colors.text, borderColor: colors.border }}
                        value={String(
                            editedSession.exercise_instances[exerciseIndex].sets[setIndex].reps
                        )}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const newReps = Number(text);
                            setEditedSession((prev) => {
                                const updatedSession = { ...prev };
                                updatedSession.exercise_instances = updatedSession.exercise_instances.map(
                                    (ex, exIndex) => {
                                        if (exIndex === exerciseIndex) {
                                            return {
                                                ...ex,
                                                sets: ex.sets.map((s, sIndex) => {
                                                    if (sIndex === setIndex) {
                                                        return { ...s, reps: newReps };
                                                    }
                                                    return s;
                                                }),
                                            };
                                        }
                                        return ex;
                                    }
                                );
                                return updatedSession;
                            });
                        }}
                    />
                    <Text style={{ flex: 1, textAlign: "center", color: colors.text }}>
                        {Number(
                            editedSession.exercise_instances[exerciseIndex].sets[setIndex].weight
                        ) *
                            Number(
                                editedSession.exercise_instances[exerciseIndex].sets[setIndex].reps
                            )}
                    </Text>
                    <TextInput
                        className="flex-1 text-center border"
                        style={{ color: colors.text, borderColor: colors.border }}
                        value={String(
                            editedSession.exercise_instances[exerciseIndex].sets[setIndex]
                                .repsInReserve
                        )}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const newRIR = Number(text);
                            setEditedSession((prev) => {
                                const updatedSession = { ...prev };
                                updatedSession.exercise_instances = updatedSession.exercise_instances.map(
                                    (ex, exIndex) => {
                                        if (exIndex === exerciseIndex) {
                                            return {
                                                ...ex,
                                                sets: ex.sets.map((s, sIndex) => {
                                                    if (sIndex === setIndex) {
                                                        return { ...s, repsInReserve: newRIR };
                                                    }
                                                    return s;
                                                }),
                                            };
                                        }
                                        return ex;
                                    }
                                );
                                return updatedSession;
                            });
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View key={set.id || setIndex} className="flex-row my-1">
                    <Text className="flex-1 text-center">{setIndex + 1}</Text>
                    <Text className="flex-1 text-center">{set.weight}</Text>
                    <Text className="flex-1 text-center">{set.reps}</Text>
                    <Text className="flex-1 text-center">{getTotal(set.weight, set.reps)}</Text>
                    <Text className="flex-1 text-center">{set.repsInReserve}</Text>
                </View>
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
                {isEditing ? (
                    // Show save button in editing mode
                    <TouchableOpacity
                        onPress={handleSave}
                        className="w-10 h-10 flex items-center justify-center"
                    >
                        <FontAwesome name="save" size={20} color={colors.text} />
                    </TouchableOpacity>
                ) : (
                    // Otherwise, show the dropdown button
                    <RNView ref={dropdownButtonRef}>
                        <TouchableOpacity
                            onPress={openDropdown}
                            className="w-10 h-10 flex items-center justify-center"
                        >
                            <FontAwesome name="ellipsis-v" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </RNView>
                )}
            </TouchableOpacity>

            {/* Additional Session Details */}
            {!isCollapsed && (
                <View className="p-2 pb-0" style={{ backgroundColor: colors.card }}>
                    <View className="rounded-md flex-row items-center justify-between pl-2 mt-2 mb-4">
                        <Text className="flex-1">{session.description}</Text>
                        {/* Only show dropdown if not editing */}
                        {!isEditing && (
                            <RNView ref={dropdownButtonRef}>
                                <TouchableOpacity
                                    onPress={openDropdown}
                                    className="w-10 h-10 flex items-center justify-center"
                                >
                                    <FontAwesome name="ellipsis-v" size={20} color={colors.text} />
                                </TouchableOpacity>
                            </RNView>
                        )}
                    </View>

                    {/* Exercise Instances */}
                    {(isEditing
                        ? editedSession.exercise_instances
                        : session.exercise_instances
                    ).map((exerciseInstance, exerciseIndex) => (
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
                            {exerciseInstance.sets.map((set, setIndex) =>
                                renderSetRow(set, exerciseIndex, setIndex)
                            )}
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
