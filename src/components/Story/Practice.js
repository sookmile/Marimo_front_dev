import React from "react";
import { ImageBackground, View } from "react-native";

const Practice = () => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/story/practice.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      ></ImageBackground>
    </View>
  );
};

export default Practice;
