import React from "react";
import { View, Dimensions } from "react-native";
import { theme } from "../styles/styles";

const getBreakpointForScreenSize = ({ theme, dimensions }) => {
  const sortedBreakpoints = Object.entries(theme.breakpoints).sort(
    (valA, valB) => {
      return valA[1] - valB[1];
    }
  );

  return sortedBreakpoints.reduce((acc, [breakpoint, minWidth]) => {
    if (dimensions.width >= minWidth) {
      return breakpoint;
    }
    return acc;
  }, null);
};

const getResponsiveValue = ({ value, dimensions, theme }) => {
  if (typeof value === "object") {
    return value[getBreakpointForScreenSize({ theme, dimensions })];
  }
  return value;
};

const Box = ({
  style,
  padding,
  margin,
  width,
  height,
  backgroundColor,
  ...rest
}) => {
  const dimensions = Dimensions.get("window");

  return (
    <View
      style={{
        margin:
          theme.spacing[
            getResponsiveValue({ value: margin, dimensions, theme })
          ],
        padding:
          theme.spacing[
            getResponsiveValue({ value: padding, dimensions, theme })
          ],
        width: getResponsiveValue({ value: width, dimensions, theme }),
        height: getResponsiveValue({ value: height, dimensions, theme }),
        backgroundColor:
          theme.colors[
            getResponsiveValue({ value: backgroundColor, dimensions, theme })
          ],
        ...style,
      }}
      {...rest}
    />
  );
};
export default Box;
