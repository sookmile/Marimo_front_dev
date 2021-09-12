import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

const CustomButton = ({ buttonText, onPress }) => {
  return (
    <TouchableOpacity style={styles.container_button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container_button: {
    marginTop: SIZES.radius,
    paddingVertical: 13,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  buttonText: { textAlign: "center", color: COLORS.white, ...FONTS.body2 },
});
