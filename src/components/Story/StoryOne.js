import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Orientation from "react-native-orientation";
import StoryMain from "./StoryMain";
import Sound from "react-native-sound";

const path1 = require("../../assets/sounds/story1page1.m4a");
const path2 = require("../../assets/sounds/story1page2.m4a");
const path3 = require("../../assets/sounds/story1page3.mp3");
const path4 = require("../../assets/sounds/story1page4.m4a");

let music1 = new Sound(path1, null, (error) => {
  if (error) {
    console.log("play failed");
  }
});

let music2 = new Sound(path2, null, (error) => {
  if (error) {
    console.log("play failed");
  }
});

let music3 = new Sound(path3, null, (error) => {
  if (error) {
    console.log("play failed");
  }
});

let music4 = new Sound(path4, null, (error) => {
  if (error) {
    console.log("play failed");
  }
});

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

  if (pageNum == 1) {
    music2.pause();
    music3.pause();
    music4.pause();
    setTimeout(() => {
      music1.play();
    }, 1000);
  } else if (pageNum == 2) {
    music1.pause();
    music3.pause();
    music4.pause();
    setTimeout(() => {
      music2.play();
    }, 1000);
  } else if (pageNum == 3) {
    music1.pause();
    music2.pause();
    music4.pause();
    setTimeout(() => {
      music3.play();
    }, 1000);
  } else if (pageNum == 4) {
    music1.pause();
    music2.pause();
    music3.pause();
    setTimeout(() => {
      music4.play();
    }, 1000);
  } else {
    console.log("동화1 끝!");
  }

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
                height: 90,
                top: "0%",
                left: "32%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.pause();
                navigation.navigate("Practice", {
                  oWord: "침대",
                  LastPage: 1,
                });
              }}
            >
              <Text style={styles.word}>침대</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 290,
                height: 120,
                top: "40%",
                left: "27%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.pause();
                navigation.navigate("Practice", {
                  oWord: "이불",
                  LastPage: 1,
                });
              }}
            >
              <Text style={styles.word}>이불</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                top: "-4%",
                left: "66%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.pause();

                navigation.navigate("Practice", {
                  oWord: "시계",
                  LastPage: 1,
                });
              }}
            >
              <Text style={styles.word}>시계</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 70,
                height: 70,
                top: "-37%",
                left: "91%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.pause();
                navigation.navigate("Practice", {
                  oWord: "축구공",
                  LastPage: 1,
                });
              }}
            >
              <Text style={styles.word}>축구공</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 120,
                height: 70,
                top: "-75%",
                left: "73%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.pause();
                navigation.navigate("Practice", {
                  oWord: "액자",
                  LastPage: 1,
                });
              }}
            >
              <Text style={styles.word}>액자</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("StoryLoading");
                }}
              >
                <Text style={styles.navBoxText}> 이전 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(2);
                }}
              >
                <Text style={styles.navBoxText}> 다음</Text>
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
                top: "1%",
                left: "0%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.pause();
                navigation.navigate("Practice", {
                  oWord: "냉장고",
                  LastPage: 2,
                });
              }}
            >
              <Text style={styles.word}>냉장고</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                top: "15%",
                left: "32%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.pause();
                navigation.navigate("Practice", {
                  oWord: "사과",
                  LastPage: 2,
                });
              }}
            >
              <Text style={styles.word}>사과</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                top: "-13%",
                left: "52%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.pause();
                navigation.navigate("Practice", {
                  oWord: "포도",
                  LastPage: 2,
                });
              }}
            >
              <Text style={styles.word}>포도</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                top: "-33%",
                left: "69%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.pause();
                navigation.navigate("Practice", {
                  oWord: "수박",
                  LastPage: 2,
                });
              }}
            >
              <Text style={styles.word}>수박</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                top: "-67%",
                left: "85%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.pause();
                navigation.navigate("Practice", {
                  oWord: "바나나",
                  LastPage: 2,
                });
              }}
            >
              <Text style={styles.word}>바나나</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 90,
                top: "-123%",
                left: "79%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.pause();
                navigation.navigate("Practice", {
                  oWord: "달력",
                  LastPage: 2,
                });
              }}
            >
              <Text style={styles.word}>달력</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(1);
                }}
              >
                <Text style={styles.navBoxText}>이전 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(3);
                }}
              >
                <Text style={styles.navBoxText}> 다음</Text>
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
                <Text style={styles.navBoxText}>이전 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(4);
                }}
              >
                <Text style={styles.navBoxText}> 다음</Text>
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
                top: "82%",
                left: "16%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.pause();
                navigation.navigate("Practice", {
                  oWord: "기차",
                  LastPage: 4,
                });
              }}
            >
              <Text style={styles.word}>기차</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 200,
                height: 120,
                top: "52%",
                left: "32%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.pause();
                navigation.navigate("Practice", {
                  oWord: "자전거",
                  LastPage: 4,
                });
              }}
            >
              <Text style={styles.word}>자전거</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                top: "-15%",
                left: "61%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.pause();
                navigation.navigate("Practice", {
                  oWord: "색연필",
                  LastPage: 4,
                });
              }}
            >
              <Text style={styles.word}>색연필</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 50,
                top: "12%",
                left: "61%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.pause();
                navigation.navigate("Practice", {
                  oWord: "도토리",
                  LastPage: 4,
                });
              }}
            >
              <Text style={styles.word}>도토리</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                top: "-35%",
                left: "77%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.pause();
                navigation.navigate("Practice", {
                  oWord: "장갑",
                  LastPage: 4,
                });
              }}
            >
              <Text style={styles.word}>장갑</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(3);
                }}
              >
                <Text style={styles.navBoxText}>이전 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(5);
                  music4.pause;
                }}
              >
                <Text style={styles.navBoxText}> 다음</Text>
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
    position: "absolute",
    width: 45,
    top: "3%",
    left: "1.5%",
    backgroundColor: "white",
    textAlign: "center",
    padding: 7,
    paddingTop: 9,
    borderRadius: 10,
    fontFamily: "Cafe24Ssurround",
  },
  word: {
    fontSize: 15,
    color: "black",
    backgroundColor: "white",
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: "#B16CF6",
    textAlign: "center",
    fontFamily: "Cafe24Ssurround",
  },
  navBox: {
    position: "absolute",
    width: 88,
    top: "90%",
    left: "88.5%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 7,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBoxText: {
    fontFamily: "Cafe24Ssurround",
  },
});
