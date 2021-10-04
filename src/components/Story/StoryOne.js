import React, { useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Orientation from "react-native-orientation";
import Tts from "react-native-tts";

const StoryOne = ({ navigation }) => {
  useEffect(() => {
    Orientation.lockToLandscapeRight();
    Orientation.addOrientationListener(onOrientaionChange);
    return () => {
      Orientation.unlockAllOrientations(),
        Orientation.removeOrientationListener(onOrientaionChange);
    };
  }, []);
  const onOrientaionChange = (orientation) => {
    if (orientation === "LANDSCAPE_RIGHT") {
      Orientation.lockToLandscape();
    }
  };
  const onOrientaionChange2 = (orientation) => {
    if (orientation === "LANDSCAPE_RIGHT") {
      Orientation.lockToLandscape();
    }
  };

  Tts.setDefaultLanguage("ko-KR");
  setTimeout(() => {
    Tts.speak("정원이 정말 아름답구나!");
  }, 1000);
  setTimeout(() => {
    Tts.speak("우와, 예쁜 장미꽃이 피어있네?");
  }, 4000);

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
        <View style={styles.textBox1}>
          <Text style={styles.line1}>정원이 정말 아름답구나!</Text>
        </View>
        <View style={styles.textBox2}>
          <Text style={styles.line2}>우와, 예쁜 </Text>
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
  textBox1: {
    width: 165,
    height: 78,
    left: "3%",
    top: "15%",
    backgroundColor: "#E8E8ED",
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textBox2: {
    width: 180,
    height: 78,
    left: "165%",
    top: "0%",
    backgroundColor: "#E8E8ED",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line1: {
    fontSize: 13,
  },
  word1: {
    fontSize: 13,
    color: "#fb5a60",
  },
  line2: {
    fontSize: 13,
  },
});
