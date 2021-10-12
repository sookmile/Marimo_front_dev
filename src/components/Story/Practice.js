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
  const [userId, setuserId] = useState(0);
  const [activateRecord, setActivation] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState("");
  const [isRModalVisible, setRModalVisible] = useState(false);
  const [isWModalVisible, setWModalVisible] = useState(false);
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [URI, setURI] = useState("");

  const { oWord, LastPage, taleName } = route.params;
  const taleNameSet = taleName ? taleName : "호랑이의 생일 잔치";

  // ID 받아오기
  const getUserId = async () => {
    const id = await AsyncStorage.getItem("userId");
    return id;
  };

  // 유저  정보
  const getData = async () => {
    const userId = await getUserId();
    setuserId(userId);
    console.log(userId);
  };

  // 음성인식
  const voiceLabel = text
    ? text
    : isRecord
    ? "단어를 발음해주세요"
    : "마이크 버튼을 눌러주세요";

  const _onSpeechStart = () => {
    console.log("onSpeechStart");
    setText("");
    setFeedback("");
  };
  const _onSpeechEnd = () => {
    console.log("onSpeechEnd");
  };
  const _onSpeechResults = (event) => {
    console.log("onSpeechResults");
    setText(event.value[0]);
    console.log("발음한 단어:", text);
    if (event.value[0] === oWord) {
      Voice.stop();
      let rWord = event.value[0];
      postResult(rWord);
      console.log("정답");
      setRModalVisible(!isRModalVisible);
    } else if (event.value[0] != oWord) {
      Voice.stop();
      let rWord = event.value[0];
      postResult(rWord);
      console.log("오답");
      setWModalVisible(!isWModalVisible);
    }
    setText("");
  };

  const _onSpeechError = (event) => {
    console.log("_onSpeechError");
    console.log(event.error);
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
    getData();
    console.log("유저 아이디: ", userId);
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
  const postResult = async (word) => {
    // 저장용 데이터 전송
    const data1 = {
      userId: userId,
      taleName: taleNameSet,
      lastpage: LastPage,
    };
    console.log("data1:", data1);
    await axios
      .post(preURL.preURL + "/marimo/tale/save", data1)
      .then((res) => {
        setResponse(res.data);
        console.log("저장:", response);
      })
      .catch((err) => {
        console.log("전송에 실패 ");
        console.log(err);
      });
    // 피드백용 데이터 전송
    const data2 = {
      userId: userId,
      oWord: oWord,
      rWord: word,
      lastpage: LastPage,
    };
    console.log("data2:", data2);
    await axios
      .post(preURL.preURL + "/marimo/tale/feedback", data2)
      .then((res) => {
        setFeedback(res.data);
        console.log("피드백: ", feedback);
      })
      .catch((err) => {
        console.log("전송에 실패 ");
        console.log(err);
      });
  };

  // 모달 닫는 함수
  const closeRModal = () => {
    setRModalVisible(!isRModalVisible);
  };
  const closeWModal = () => {
    setWModalVisible(!isWModalVisible);
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
              top: "1.5%",
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
              navigation.navigate("Story1") && setText("");
            }}
          >
            이전
          </Text>
          <View style={[styles.videoContainer, {}]}>
            <Video
              source={{
                uri: URI,
              }}
              style={styles.mediaPlayer}
              volume={10}
              onEnd={() => setActivation(!activateRecord)}
            />
          </View>
          <View style={styles.recordContainer}>
            <Text style={styles.text}>{voiceLabel}</Text>
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
    justifyContent: "space-between",
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
    width: 320,
    height: 200,
    marginRight: "2%",
  },
  text: {
    fontSize: 20,
    marginTop: "20%",
    marginBottom: "10%",
    fontFamily: "Cafe24Ssurround",
  },
  button: {
    width: 200,
    height: 200,
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
    marginBottom: "10%",
  },
  feedback: {
    fontSize: 25,
    fontFamily: "Cafe24Ssurround",
    color: "#B16CF6",
    textAlign: "center",
  },
  close: {
    fontSize: 20,
    fontFamily: "Cafe24Ssurround",
    color: "#B16CF6",
    marginBottom: "3%",
  },
});
