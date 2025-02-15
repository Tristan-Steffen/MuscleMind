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
    containerStyle?: string; // Additional Tailwind classes for the container
    textStyle?: string;      // Additional Tailwind classes for the text
};

const IconButton: React.FC<IconButtonProps> = ({
    onPress,
    text,
    active,
    containerStyle = "",
    textStyle = "",
}) => {
    const { colors } = useTheme() as CustomTheme;

    // Render the icon variant if no text is provided.
    if (text === undefined) {
        return (
            <TouchableOpacity onPress={onPress} className={`mx-1 ${containerStyle}`}>
                <FontAwesome name="arrow-circle-left" size={32} color={colors.text} />
            </TouchableOpacity>
        );
    }

    // Default classes.
    const defaultButtonClasses = "h-7 w-[70px] rounded-full justify-center items-center mx-1";
    const defaultTextClasses = "text-base font-bold mx-2.5";
    const isActive = active === undefined || active;

    if (isActive) {
        return (
            <TouchableOpacity
                onPress={onPress}
                className={`${defaultButtonClasses} ${containerStyle}`}
                style={{ backgroundColor: colors.text }}
            >
                <Text
                    className={`${defaultTextClasses} ${textStyle}`}
                    style={{ color: colors.card }}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        );
    } else {
        return (
            <View
                className={`${defaultButtonClasses} ${containerStyle}`}
                style={{ backgroundColor: colors.border }}
            >
                <Text
                    className={`${defaultTextClasses} ${textStyle}`}
                    style={{ color: colors.card }}
                >
                    {text}
                </Text>
            </View>
        );
    }
};

export default IconButton;
