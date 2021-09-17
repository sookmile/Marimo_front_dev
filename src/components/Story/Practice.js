import React from "react";
import { ImageBackground, View, Text, StyleSheet } from "react-native";

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
      >
        <View style={styles.word}>
          <Text>장미꽃</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Practice;

const styles = StyleSheet.create({
  word: {
    width: 70,
    height: 35,
    top: "10%",
    left: "43%",
    backgroundColor: "#FACE34",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
