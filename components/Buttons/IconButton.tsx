import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { CustomTheme } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

type IconButtonProps = {
    onPress: () => void;
    text?: string;
    active?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({ onPress, text, active }) => {
    const { colors } = useTheme() as CustomTheme;

    // Render the icon variant if no text is provided.
    if (text === undefined) {
        return (
            <TouchableOpacity onPress={onPress} className="mx-1">
                <FontAwesome name="arrow-circle-left" size={32} color={colors.text} />
            </TouchableOpacity>
        );
    }

    // Text button styling and classes.
    const buttonClasses = "h-7 w-[70px] rounded-full justify-center items-center mx-1";
    const textClasses = "text-base font-bold mx-2.5";
    const isActive = active === undefined || active;

    if (isActive) {
        return (
            <TouchableOpacity
                onPress={onPress}
                className={buttonClasses}
                style={{ backgroundColor: colors.text }}
            >
                <Text style={{ color: colors.card }} className={textClasses}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    } else {
        return (
            <View
                className={buttonClasses}
                style={{ backgroundColor: colors.border }}
            >
                <Text style={{ color: colors.card }} className={textClasses}>
                    {text}
                </Text>
            </View>
        );
    }
};

export default IconButton;
