import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SIZES } from "../../constants";
import { fontPercentage } from "../../constants/responsive";

const CustomButton = ({ buttonText, onPress, backgroundColor, color }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        paddingVertical: 13,
        borderRadius: 20,
        backgroundColor: backgroundColor,
        alignContent: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          textAlign: "center",
          color: color,
          fontSize: fontPercentage(20),
          fontFamily: "NotoSansCJKkr-Regular",
          lineHeight: fontPercentage(24),
        }}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  backgroundColor: "#D4AEF9",
  color: "black",
};

export default CustomButton;
