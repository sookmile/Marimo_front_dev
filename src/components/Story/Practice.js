import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import Video from "react-native-video";
import Voice from "@react-native-community/voice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import preURL from "../../preURL/preURL";

const Practice = ({ route, navigation }) => {
  // const [userID, setUserID] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activateRecord, setActivation] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState("");
  const [isRModalVisible, setRModalVisible] = useState(false);
  const [isWModalVisible, setWModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [URI, setURI] = useState("");

  const { userID, oWord, LastPage, taleName, statusBar, screenHeight } =
    route.params;

  // ID 받아오기
  // const getUserId = () => {
  //   const userId = AsyncStorage.getItem("userId");
  //   return userId;
  // };

  // const getId = () => {
  //   const userId = getUserId();
  //   const userIdCheck = userId === null ? 1 : userId;
  //   setUserID(userIdCheck);
  // };
  // useEffect(() => {
  //   getId();
  // }, []);

  // 음성인식
  const voiceLabel = text
    ? text
    : isRecord
    ? "단어를 발음해주세요"
    : "마이크 버튼을 눌러주세요";

  const constructor = activateRecord ? "" : "영상이 끝나면";

  const _onSpeechStart = () => {
    console.log("onSpeechStart====================================");
    setText("");
  };
  const _onSpeechEnd = () => {
    console.log("onSpeechEnd");
  };
  const _onSpeechResults = async (event) => {
    console.log("onSpeechResults");
    if (event.value[0] !== undefined) {
      await setText(event.value[0]);
      console.log("isRModalVisible before:", isRModalVisible);
      console.log("isWModalVisible before:", isWModalVisible);
      postResult(event.value[0]);
      // if (event.value[0] === oWord) {
      //   console.log("isRModalVisible:", isRModalVisible);
      //   setRModalVisible((isRModalVisible) => {
      //     return !isRModalVisible;
      //   });
      //   console.log("정답");
      //   console.log("isRModalVisible:", isRModalVisible);
      // } else {
      //   console.log("isWModalVisible:", isWModalVisible);
      //   setWModalVisible((isWModalVisible) => {
      //     return !isWModalVisible;
      //   });
      //   console.log("오답");
      //   console.log("isWModalVisible:", isWModalVisible);
      // }
    }
  };
  const _onSpeechError = (event) => {
    console.log("_onSpeechError");
    console.log(event.error);
    if (event.error.message == "7/No match") {
      setFeedback("다시 발음해보세요!");
      setWModalVisible((isWModalVisible) => {
        return !isWModalVisible;
      });
    }
  };

  const _onRecordVoice = () => {
    if (activateRecord) {
      if (isRecord) {
        Voice.stop();
      } else {
        Voice.start("ko-KR");
      }
      setIsRecord(!isRecord);
    } else {
      console.log("영상 진행중");
    }
  };

  useEffect(() => {
    // 비디오 가져오기
    const data = {
      word: oWord,
    };
    axios
      .post(preURL.preURL + "/marimo/tale/speechuri", data)
      .then((res) => {
        setURI(res.data.uri);
        console.log("비디오 링크: ", URI);
      })
      .catch((err) => {
        console.log("전송에 실패 ");
        console.log(err);
      });

    // 음성인식 부분
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // 결과 전송
  const postResult = async (inputText) => {
    Voice.stop();
    console.log("발음한 단어:", inputText);
    const userId = await AsyncStorage.getItem("userId");

    // 피드백용 데이터 전송
    const data2 = {
      userId: userID,
      oWord: oWord,
      rWord: inputText,
      lastpage: LastPage,
      taleName: taleName,
    };
    console.log("data2:", data2);
    axios
      .post(preURL.preURL + "/marimo/tale/feedback", data2)
      .then((res) => {
        setFeedback(res.data);
        console.log("피드백: ", res.data);
      })
      .catch((err) => {
        console.log("전송에 실패 ");
        console.log(err);
        setFeedback("다시 발음해보세요");
      });

    // 답 확인 후 모달 띄우기
    if (inputText === oWord) {
      console.log("isRModalVisible:", isRModalVisible);
      setRModalVisible((isRModalVisible) => {
        return !isRModalVisible;
      });
      console.log("정답✅");
      console.log("isRModalVisible:", isRModalVisible);
    } else {
      console.log("isWModalVisible:", isWModalVisible);
      setWModalVisible((isWModalVisible) => {
        return !isWModalVisible;
      });
      console.log("오답❎");
      console.log("isWModalVisible:", isWModalVisible);
    }
  };

  // 모달 닫는 함수
  const closeRModal = () => {
    setText("");
    setRModalVisible(false);
    console.log("isRModalVisible after:", isRModalVisible);
    setIsRecord(false);
    setText("");
  };
  const closeWModal = () => {
    setText("");
    setWModalVisible(false);
    console.log("isWModalVisible after:", isWModalVisible);
    setIsRecord(false);
    setText("");
  };

  return (
    <View style={{ display: "flex", flex: 1, backgroundColor: "#D5CEFF" }}>
      <ImageBackground
        source={require("../../assets/images/story/practice.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="contain"
      >
        <View style={styles.container}>
          <Text
            style={{
              top: "3.5%",
              left: "3%",
              fontFamily: "Cafe24Ssurround",
              backgroundColor: "white",
              textAlign: "center",
              width: 50,
              height: 25,
              borderRadius: 15,
              paddingTop: 5,
            }}
            onPress={() => {
              navigation.navigate("Story1", {
                userID: userID,
                statusBar: statusBar,
                screenHeight: screenHeight,
              });
            }}
          >
            이전
          </Text>
          <View style={[styles.videoContainer, {}]}>
            {loaded == false ? (
              <Text>비디오를 로딩중입니다...</Text>
            ) : (
              <Text>영상이 끝날 때까지 집중해주세요!</Text>
            )}

            <Video
              source={{
                uri: URI,
              }}
              style={styles.mediaPlayer}
              volume={10}
              onLoad={() => setLoaded(!loaded)}
              onEnd={() => setActivation(!activateRecord)}
            />
          </View>
          <View style={styles.recordContainer}>
            <View style={{ marginTop: "20%", marginBottom: "10%" }}>
              <Text style={styles.text}>{constructor}</Text>
              <Text style={styles.text}>{voiceLabel}</Text>
            </View>
            <TouchableOpacity onPress={_onRecordVoice}>
              <Image
                style={styles.button}
                source={require("../../assets/MikeIcon.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={isRModalVisible} style={styles.modal1}>
          <TouchableOpacity onPress={closeRModal}>
            <Image
              style={styles.sticker}
              source={require("../../assets/Sticker.png")}
            />
          </TouchableOpacity>
        </Modal>
        <Modal isVisible={isWModalVisible} style={styles.modal2}>
          <Image
            style={styles.cloud}
            source={require("../../assets/cloud.png")}
          />
          <View>
            <Text style={styles.feedback}>{feedback}</Text>
          </View>
          <TouchableOpacity onPress={closeWModal}>
            <Text style={styles.close}>닫기</Text>
          </TouchableOpacity>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default Practice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  videoContainer: {
    flex: 0.5,
    paddingTop: "8%",
    paddingRight: "6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  recordContainer: {
    flex: 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "5%",
    marginRight: "3%",
  },
  mediaPlayer: {
    width: "80%",
    height: "50%",
    marginRight: "2%",
    marginTop: "2%",
  },
  text: {
    fontSize: 20,
    fontFamily: "Cafe24Ssurround",
  },
  button: {
    width: 160,
    height: 160,
  },
  modal1: {
    display: "flex",
    alignItems: "center",
    borderRadius: 25,
  },
  modal2: {
    flex: 1,
    width: "50%",
    marginLeft: "25%",
    padding: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 120,
    borderWidth: 7,
    borderColor: "#C5A1F3",
  },
  sticker: {
    width: 200,
    height: 200,
  },
  cloud: {
    width: 155,
    height: 105,
    marginBottom: "7%",
  },
  feedback: {
    fontSize: 25,
    fontFamily: "Cafe24Ssurround",
    color: "#B16CF6",
    textAlign: "center",
    marginBottom: "0%",
  },
  close: {
    fontSize: 20,
    fontFamily: "Cafe24Ssurround",
    color: "#B16CF6",
    marginBottom: "2%",
    marginTop: "0%",
  },
});
