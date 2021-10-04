import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import Modal from "react-native-modal";
import Video from "react-native-video";
import Voice from "@react-native-community/voice";
import axios from "axios";

const Practice = () => {
  const [activateRecord, setActivation] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState("");
  const [isRModalVisible, setRModalVisible] = useState(false);
  const [isWModalVisible, setWModalVisible] = useState(false);
  const [response, setResponse] = useState("");
  const storyData = ["장미꽃"];

  const voiceLabel = text
    ? text
    : isRecord
    ? "단어를 발음해주세요"
    : "마이크 버튼을 눌러주세요";

  const _onSpeechStart = () => {
    console.log("onSpeechStart");
    setText("");
  };
  const _onSpeechEnd = () => {
    console.log("onSpeechEnd");
  };
  const _onSpeechResults = (event) => {
    console.log("onSpeechResults");
    console.log(event.value[0]);
    setText(event.value[0]);
    console.log(text);
    if (event.value[0] === storyData[0]) {
      postResult();
      console.log("정답");
      setRModalVisible(!isRModalVisible);
    } else {
      postResult();
      console.log("오답");
      setWModalVisible(!isWModalVisible);
    }
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
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const postResult = () => {
    const data = {
      userId: 1,
      oWord: storyData[0],
      rWord: text,
      Lastpage: 1,
    };
    console.log("data: ", data);
    axios
      .post("192.168.35.40" + "/marimo/tale/save", data)
      .then((res) => {
        setResponse(res.data);
        console.log("성공여부: ", response);
      })
      .catch((err) => {
        console.log("전송에 실패 ");
        console.log(err);
      });
  };

  const closeRModal = () => {
    setRModalVisible(!isRModalVisible);
  };
  const closeWModal = () => {
    setWModalVisible(!isWModalVisible);
  };
  return (
    <>
      <ImageBackground
        source={require("../../assets/images/story/practice.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.videoContainer}>
            <Video
              source={{
                uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
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
        <Modal isVisible={isRModalVisible} style={styles.modal}>
          <TouchableOpacity onPress={closeRModal}>
            <Image
              style={styles.sticker}
              source={require("../../assets/Sticker.png")}
            />
          </TouchableOpacity>
        </Modal>
        <Modal isVisible={isWModalVisible} style={styles.modal}>
          <View>
            <Text>{response}</Text>
          </View>
          <TouchableOpacity onPress={closeWModal}>
            <Text>닫기</Text>
          </TouchableOpacity>
        </Modal>
      </ImageBackground>
    </>
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
    display: "flex",
    alignItems: "center",
  },
  recordContainer: {
    flex: 0.5,
    display: "flex",
    alignItems: "center",
    marginTop: 50,
    marginRight: 20,
  },
  mediaPlayer: {
    position: "absolute",
    width: 500,
    height: 300,
    top: 100,
    left: 100,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
  button: {
    width: 200,
    height: 200,
  },
  modal: {
    display: "flex",
    alignItems: "center",
  },
  sticker: {
    width: 200,
    height: 200,
  },
});
