import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Text } from "@/components/Themed";
import { CustomTheme } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";

type ButtonProps = {
    title: string;
    onPress?: () => void;
    style?: string;
    textStyle?: string;
    href?: Href;
};

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    href,
}) => {
    const { colors } = useTheme() as CustomTheme;
    const router = useRouter();

    const handlePress = () => {
        if (href) {
            router.push(href);
        } else if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            className={`py-1 rounded-full items-center justify-center px-2 ${style}`}
            style={{ backgroundColor: colors.highlight }} // Dynamic color from theme
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <Text className={`text-lg font-semibold ${textStyle}`} style={{ color: colors.text }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
