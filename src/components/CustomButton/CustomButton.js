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
    backgroundColor: "#D4AEF9",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 22,
    fontWeight: "400",
    ...FONTS.body2,
  },
});
