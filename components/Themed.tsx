import { Text as DefaultText, View as DefaultView } from "react-native";
import { useColorScheme } from "react-native";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, className, ...otherProps } = props;
  const scheme = useColorScheme();
  const resolvedColor = scheme === "dark" ? darkColor : lightColor;
  // Only set an inline color if a color override is provided.
  return (
    <DefaultText
      className={className}
      style={[resolvedColor ? { color: resolvedColor } : {}, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, className, ...otherProps } = props;
  const scheme = useColorScheme();
  const resolvedBg = scheme === "dark" ? darkColor : lightColor;
  return (
    <DefaultView
      className={className}
      style={[resolvedBg ? { backgroundColor: resolvedBg } : {}, style]}
      {...otherProps}
    />
  );
}
