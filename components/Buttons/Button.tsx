import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
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
            className={`py-1 rounded-full items-center justify-center px-2 bg-basicButton ${style}`}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <Text className={`text-lg font-semibold text-text ${textStyle}`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
