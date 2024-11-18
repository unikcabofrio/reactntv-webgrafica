import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import PropTypes from "prop-types";

export default function ButtonPressable({
  text,
  onPress,
  color = "#007BFF",
  colorPressed = "#0056b3",
  colorText = "#FFFFFF",
  width = "auto",
  paddingV = 12,
  paddingH = 20,
  borderRadius = 4,
  borderWidth = 0,
  borderColor = "transparent",
  shadow = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.default,
        {
          backgroundColor: pressed ? colorPressed : color,
          width,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          borderRadius,
          borderWidth,
          borderColor,
          ...(shadow && styles.shadow),
        },
      ]}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.textButton,
            { color: pressed ? colorPressed : colorText },
          ]}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
}

ButtonPressable.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  colorPressed: PropTypes.string,
  colorText: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingV: PropTypes.number,
  paddingH: PropTypes.number,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  shadow: PropTypes.bool,
};

const styles = StyleSheet.create({
  default: {
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
