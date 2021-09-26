import React, { useState, useEffect, useRef, setTim } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { icons, images } from "../../constants";

import hangul from "hangul-js";
import Voice from "@react-native-community/voice";
import { SIZES, dummyData, COLORS } from "../../constants";
import CustomButton from "../CustomButton/CustomButton";
import Tts from "react-native-tts";
import axios from "axios";
import { preURL } from "../../preURL/preURL";
import Sound from "react-native-sound";

const correctSound = require("../../assets/sfx/mixkit-unlock-game-notification-253.wav");
let music = new Sound(correctSound, (error) => {
  if (error) {
    console.log("play failed", error);
  }
});

function SpellingGame({ route, navigation }) {
  const { userId = 1, userNickname = "유진" } = route.params ?? {};
  // game states
  const [questions, setquestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [successWord, setsuccessWord] = useState([]);
  const [failedWord, setfailedWord] = useState([]);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  let userAnswer = "";

  // record
  const [isRecord, setisRecord] = useState(false);
  const [text, setText] = useState("");
  const buttonLabel = isRecord ? "Stop" : "Start";
  const voiceLabel = isRecord ? "말해주세요..." : "버튼을 눌러주세요!";

  const _onSpeechStart = () => {
    console.log("onSpeechStart");
    setText("");
  };
  const _onSpeechEnd = () => {
    console.log("onSpeechEnd");
  };
  const _onSpeechResults = (event) => {
    console.log("onSpeechResults");
    setText(event.value[0]);
  };
  const _onSpeechError = (event) => {
    console.log("_onSpeechError");
    console.log(event.error);
  };

  const _onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
      validateAnswer(userAnswer);
    } else {
      Voice.start("ko-KR");
    }
    setisRecord(!isRecord);
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

  useEffect(() => {
    setquestions(shuffleArray(dummyData.wordList));
  }, []);

  //tts
  Tts.setDefaultLanguage("ko-KR");
  Tts.addEventListener("tts-start", (event) => console.log("start", event));
  Tts.addEventListener("tts-finish", (event) => console.log("finish", event));
  Tts.addEventListener("tts-cancel", (event) => console.log("cancel", event));

  const readUserAnswer = (userAnswer) => {
    Tts.speak(userAnswer);
  };

  // post
  const postGameResult = async () => {
    const data = {
      userId: 1,
      success: ["사과"],
      fail: ["토끼"],
      category: 1,
      score: score,
    };
    console.log("data", data);
    await axios
      .post(preURL + "/marimo/game/save", data)
      .then((res) => {
        const response = res.data;
        console.log("성공여부", response);
      })
      .catch((err) => {
        console.log("전송에 실패 ");
        console.log(err);
      });
  };

  // game

  // 퀴즈 다시 시작
  const restartQuiz = () => {
    setText("");
    setShowScoreModal(false);

    setquestions(shuffleArray(dummyData.wordList));
    setCurrentQuestionIndex(0);
    setScore(0);

    setCorrectAnswer(null);
    setModalVisible(false);
  };

  // 무작위
  function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

  // 초성 분리
  const diassembleWords = (text) => {
    let diassemble = hangul.disassemble(text, true);

    let cho = "";
    if (diassemble && _onSpeechEnd) {
      console.log(diassemble);
      for (let i = 0, l = diassemble.length; i < l; i++) {
        cho += diassemble[i][0];
      }
    }
    userAnswer = cho;
    console.log("사용자 정답: ", userAnswer);
    return cho;
  };

  // 정답 체크
  const validateAnswer = (userAnswer) => {
    console.log("ValidateAnswer 실행");
    let correct_answer = questions[currentQuestionIndex]?.word;
    setCurrentAnswer(userAnswer);
    console.log("userAnswer ", userAnswer);
    setCorrectAnswer(correct_answer);
    if (userAnswer === correct_answer) {
      // Set Score
      showModal();
      music.play((success) => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
      setScore(score + 30);
      console.log("점수", score);
    }
    // Show Next Button
    setTimeout(handleNext, 2000);
  };

  // 다음 문제로 이동
  const handleNext = () => {
    console.log("handleNext 실행");
    setModalVisible(false);
    if (currentQuestionIndex == questions.length - 1) {
      // Last Question
      // Show Score Modal
      // navigation.navigate("SpellingGameResult", {
      //   userNickname: userNickname,
      //   userId: userId ? userId : 1,
      //   score: score,
      //   length: questions.length,
      // });
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log("넘어가기");
      setText(" ");
      setCurrentAnswer(null);
      setCorrectAnswer(null);
      setModalVisible(false);
    }
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {/* Question Counter */}
        <View style={styles.game_quesstionContainer}>
          <View style={styles.game_questionCounter}>
            <Text style={styles.game_currentIndex}>
              {currentQuestionIndex + 1}
            </Text>
            <Text style={{ color: COLORS.black, fontSize: 18, opacity: 0.6 }}>
              / {questions.length}
            </Text>
          </View>
          <View
            style={{ marginHorizontal: SIZES.padding, backgroundColor: "" }}
          >
            <Text style={styles.scoreText}>score: {score}</Text>
          </View>
        </View>

        {/* Question */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={images.gameOb_wordContainer}
            resizeMode="contain"
            style={{
              justifyContent: "center",
              width: wp(40),
              height: hp(10),
            }}
          >
            <Text style={styles.game_question}>
              {questions[currentQuestionIndex]?.word}
            </Text>
          </ImageBackground>
        </View>
      </View>
    );
  };

  const renderUserAnswer = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: hp(3), fontFamily: "NanumSquareRoundB" }}>
            {_onSpeechEnd && text}
          </Text>
          <Text style={{ fontSize: hp(3), fontFamily: "NanumSquareRoundB" }}>
            {text && _onSpeechEnd && diassembleWords(text)}
          </Text>
        </View>
      </View>
    );
  };

  const renderRecordButton = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.voiceLabel}>{voiceLabel}</Text>
        <CustomButton buttonText={buttonLabel} onPress={_onRecordVoice} />
      </View>
    );
  };

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1000);
  };

  const renderAnswerModal = () => {
    if (modalVisible) {
      return (
        <Modal
          transparent={true}
          animationType={"slide"}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modal_background}>
            <Image source={icons.wellDoneIcon} />
          </View>
        </Modal>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.gameBackground}
        resizeMode="cover"
        style={styles.image}
      >
        {/* Question */}
        {renderQuestion()}

        {/* userAnswer */}
        {renderUserAnswer()}

        {/* Answer Correct Modal */}
        {renderAnswerModal()}

        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View style={styles.resultModal_background}>
            <View style={styles.resultModal_Container}>
              <Text style={styles.resultModal_congratText}>
                우와, 대단해요!
              </Text>
              <View style={styles.resultModal_innerContainer}>
                <Text style={{ fontSize: 25, fontFamily: "NanumSquareRoundB" }}>
                  {userNickname ? userNickname : "송이"}의 최종 점수는
                </Text>

                <View style={styles.resultModal_scoreContainer}>
                  <Text
                    style={{
                      fontSize: 30,
                      color: score > questions.length / 2 ? "green" : "red",
                    }}
                  >
                    {score}
                  </Text>
                </View>
              </View>
              {/* Retry Quiz button */}
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.resultModal_goHomeBtn}
                  onPress={() =>
                    postGameResult() && navigation.navigate("GameMain")
                  }
                >
                  <Text style={{ color: COLORS.white, textAlign: "center" }}>
                    홈으로 돌아가기
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.resultModal_restartGameBtn}
                  onPress={restartQuiz}
                >
                  <Text style={{ textAlign: "center" }}>다시 하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.resultModal_showRankingBtn}
                  onPress={() => navigation.navigate("GameRank")}
                >
                  <Text style={{ textAlign: "center" }}>랭킹 확인하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ width: "100%", height: "25%" }}>
          {renderRecordButton()}
        </View>
      </ImageBackground>
    </View>
  );
}

export default SpellingGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  game: {
    flex: 1,
    width: "100%",
    height: "70%",
  },
  game_quesstionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  game_questionCounter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    justifyContent: "center",
    backgroundColor: COLORS.bgPurple,
    width: "20%",
    borderRadius: 15,
    marginHorizontal: SIZES.padding,
  },
  game_currentIndex: {
    color: COLORS.darkGray,
    fontSize: 20,
    opacity: 0.6,
    marginRight: 2,
    fontFamily: "NanumSquareRoundB",
  },
  game_question: {
    color: COLORS.black,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "NanumSquareRoundB",
  },
  scoreText: {
    color: "#464D46",
    fontSize: wp(4),
    fontFamily: "Cafe24Ssurround",
  },
  voiceLabel: {
    marginTop: SIZES.radius,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    fontFamily: "NanumSquareRoundB",
    textAlign: "center",
  },
  modal_background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultModal_background: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  resultModal_Container: {
    backgroundColor: COLORS.white,
    width: "90%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  resultModal_congratText: {
    fontSize: hp(2),
    fontFamily: "NanumSquareRoundB",
    color: "#E86565",
    marginBottom: hp(1),
  },
  resultModal_innerContainer: {
    backgroundColor: COLORS.bgPurple,
    width: "90%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  resultModal_scoreContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 20,
  },
  resultModal_goHomeBtn: {
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    marginTop: SIZES.radius,
    width: wp(25),
    height: hp(4),
    justifyContent: "center",
    marginHorizontal: 5,
  },
  resultModal_restartGameBtn: {
    borderRadius: 15,
    backgroundColor: "#9CCDFA",
    marginTop: SIZES.radius,
    width: wp(20),
    justifyContent: "center",
    marginHorizontal: 5,
  },
  resultModal_showRankingBtn: {
    borderRadius: 15,
    backgroundColor: "#FA9C9C",
    marginTop: SIZES.radius,
    width: wp(23),
    justifyContent: "center",
    marginHorizontal: 5,
  },
});
