import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Button, View, Text, StyleSheet, Image } from "react-native";
import Orientation from "react-native-orientation";

const StoryLoading = ({ navigation }) => {
  useEffect(() => {
    Orientation.lockToPortrait();
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
    if (orientation === "LANDSCAPE") {
      Orientation.lockToPortrait();
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>앗, 도와줘! 우당탕탕 왕국 모험</Text>
      <Image
        source={require("../../assets/LoadingImg.png")}
        style={styles.loadingImg}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.selectAg}
          onPress={() => navigation.navigate("Story1")}
        >
          <Text style={styles.btnText}>계속 모험을 진행할래요!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectAg}
          onPress={() => navigation.navigate("StoryMain")}
        >
          <Text style={styles.btnText}>아니요, 다른 모험을 선택할래요!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginTop: 35,
    marginBottom: 30,
    fontSize: 20,
  },
  loadingImg: {
    height: 300,
    width: 300,
    marginBottom: 30,
  },
  btnContainer: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  selectAg: {
    width: 343,
    height: 56,
    backgroundColor: "#B16CF7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginTop: 10,
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
});

export default StoryLoading;
