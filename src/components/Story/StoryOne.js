import React, { useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Orientation from "react-native-orientation";

const StoryOne = ({ navigation }) => {
  useEffect(() => {
    Orientation.lockToLandscape();
    Orientation.addOrientationListener(onOrientaionChange);
    return (
      () => {
        Orientation.unlockAllOrientations(),
          Orientation.removeOrientationListener(onOrientaionChange);
      },
      []
    );
  });
  const onOrientaionChange = (orientation) => {
    if (orientation === "PORTRAIT") {
      Orientation.lockToLandscape();
    }
  };

  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/story/story1.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      >
        <Text style={styles.line1}>정원이 정말 아름답구나!</Text>
        <View>
          <Text style={styles.line2}>우와, 예쁜</Text>
          <Text
            style={styles.word1}
            onPress={() => navigation.navigate("Practice")}
          >
            장미꽃
          </Text>
          <Text style={styles.line2}>이 피어있네?</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default StoryOne;

const styles = StyleSheet.create({
  line1: {
    top: "25%",
    left: "5%",
    fontSize: 13,
  },
  word1: {
    top: "65%",
    left: "73%",
    fontSize: 13,
    color: "#fb5a60",
  },
  line2: {
    top: "65%",
    left: "73%",
    fontSize: 13,
  },
});
