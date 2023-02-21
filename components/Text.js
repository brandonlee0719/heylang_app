import React from "react";
import { Text as RNText } from "react-native";
import { theme } from "../styles/styles";

const Text = ({ style, variant, color, ...rest }) => {
  return (
    <RNText
      style={{
        color: theme.colors[color],
        ...theme.textVariants[variant],
        ...style,
      }}
      {...rest}
    />
  );
};
export default Text;
