import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Orientation from "react-native-orientation";
import Tts from "react-native-tts";
import StoryMain from "./StoryMain";

const StoryOne = ({ navigation }) => {
  const [pageNum, setPageNum] = useState(1);
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

  // Tts.setDefaultLanguage("ko-KR");
  // setTimeout(() => {
  //   Tts.speak("정원이 정말 아름답구나!");
  // }, 1000);
  // setTimeout(() => {
  //   Tts.speak("우와, 예쁜 장미꽃이 피어있네?");
  // }, 4000);

  return (
    <View>
      {pageNum == 1 ? (
        <View>
          <ImageBackground
            source={require("../../assets/images/story/Story1Page1.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          >
            <Text style={styles.pageIndex}>{pageNum}/4</Text>
            <TouchableOpacity
              style={{
                width: 265,
                height: 100,
                position: "absolute",
                top: "2%",
                left: "32%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", { oWord: "침대", LastPage: 1 })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 290,
                height: 120,
                position: "absolute",
                top: "68%",
                left: "27%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", { oWord: "이불", LastPage: 1 })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                top: "39%",
                left: "67%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", { oWord: "시계", LastPage: 1 })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 70,
                height: 70,
                position: "absolute",
                top: "45%",
                left: "90%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "축구공",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 120,
                height: 70,
                position: "absolute",
                top: "8%",
                left: "73%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "액자",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("StoryLoading");
                }}
              >
                <Text>이전 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(2);
                }}
              >
                <Text> 다음</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : pageNum == 2 ? (
        <View>
          <ImageBackground
            source={require("../../assets/images/story/Story1Page2.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          >
            <Text style={styles.pageIndex}>{pageNum}/4</Text>
            <TouchableOpacity
              style={{
                width: 130,
                height: 230,
                position: "absolute",
                top: "1%",
                left: "0%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "냉장고",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                top: "65%",
                left: "32%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "사과",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                top: "55%",
                left: "52%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "포도",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                position: "absolute",
                top: "58%",
                left: "69.5%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "수박",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                top: "68%",
                left: "83%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "바나나",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 90,
                position: "absolute",
                top: "8%",
                left: "79%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "달력",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(1);
                }}
              >
                <Text>이전 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(3);
                }}
              >
                <Text> 다음</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : pageNum == 3 ? (
        <View>
          <ImageBackground
            source={require("../../assets/images/story/Story1Page3.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          >
            <Text style={styles.pageIndex}>{pageNum}/4</Text>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(2);
                }}
              >
                <Text>이전 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(4);
                }}
              >
                <Text> 다음</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : pageNum == 4 ? (
        <View>
          <ImageBackground
            source={require("../../assets/images/story/Story1Page4.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          >
            <Text style={styles.pageIndex}>{pageNum}/4</Text>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                position: "absolute",
                top: "70%",
                left: "16%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "기차",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 200,
                height: 120,
                position: "absolute",
                top: "55%",
                left: "30%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "자전거",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                position: "absolute",
                top: "50%",
                left: "60%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "색연필",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: "absolute",
                top: "75%",
                left: "63%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "도토리",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                position: "absolute",
                top: "65%",
                left: "74%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Practice", {
                  oWord: "장갑",
                  LastPage: 1,
                })
              }
            >
              <Text style={styles.word}>✓</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(3);
                }}
              >
                <Text>이전 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(5);
                }}
              >
                <Text> 다음</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : pageNum == 5 ? (
        <StoryMain />
      ) : (
        <View>
          <Text>오류</Text>
        </View>
      )}
    </View>
  );
};

export default StoryOne;

const styles = StyleSheet.create({
  pageIndex: {
    width: 35,
    top: "3%",
    left: "94%",
    backgroundColor: "#E5E5E5",
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
  },
  word: {
    fontSize: 30,
    color: "white",
  },
  navBox: {
    top: "38%",
    left: "195%",
    display: "flex",
    flexDirection: "row",
  },
});
