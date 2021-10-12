import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
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
    fontSize: heightPercentageToDP(2.8),
    fontWeight: "400",
    fontFamily: "Noto Sans CJK KR",
  },
});
