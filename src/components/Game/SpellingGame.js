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

import Box from "./Box";

import hangul from "hangul-js";
import Voice from "@react-native-community/voice";
import { SIZES, dummyData, COLORS } from "../../constants";
import CustomButton from "../CustomButton/CustomButton";
import AwesomeButton from "react-native-really-awesome-button";
import Tts from "react-native-tts";
import SpellingGameResult from "./SpellingGameResult";
import axios from "axios";
import { preURL } from "../../preURL/preURL";

function SpellingGame({ navigation, route }) {
  const { userId, userNickname } = route.params;
  // game states
  const [questions, setquestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [successWord, setsuccessWord] = useState([]);
  const [failedWord, setfailedWord] = useState([]);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  let userAnswer = "";
  const slideInAnim = useRef(new Animated.Value(0)).current;

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

  const restartQuiz = () => {
    setText("");
    setShowScoreModal(false);

    setquestions(shuffleArray(dummyData.wordList));
    setCurrentQuestionIndex(0);
    setScore(0);

    setCorrectAnswer(null);
    setShowNextButton(false);
  };

  function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

  const validateAnswer = (userAnswer) => {
    console.log("ValidateAnswer 실행");
    let correct_answer = questions[currentQuestionIndex]?.word;
    setCurrentAnswer(userAnswer);
    console.log("userAnswer ", userAnswer);
    setCorrectAnswer(correct_answer);
    if (userAnswer === correct_answer) {
      // Set Score
      setScore(score + 30);
      console.log("점수", score);
      setShowNextButton(true);
    }
    // Show Next Button
    handleNext();
  };

  const handleNext = () => {
    console.log("handleNext 실행");
    setShowNextButton(false);
    if (currentQuestionIndex == questions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log("넘어가기");
      setText(" ");
      setCurrentAnswer(null);
      setCorrectAnswer(null);
      setShowNextButton(false);
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              justifyContent: "center",
              backgroundColor: COLORS.bgPurple,
              width: "20%",
              borderRadius: 15,
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                color: COLORS.darkGray,
                fontSize: 20,
                opacity: 0.6,
                marginRight: 2,
                fontFamily: "NanumSquareRoundB",
              }}
            >
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

  const renderHeader = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            marginTop: SIZES.radius,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            fontFamily: "NanumSquareRoundB",
            textAlign: "center",
          }}
        >
          {voiceLabel}
        </Text>
        <CustomButton buttonText={buttonLabel} onPress={_onRecordVoice} />
      </View>
    );
  };

  const renderAnswerModal = () => {
    if (showNextButton) {
      return (
        <Modal
          transparent={true}
          animationType={"slide"}
          visible={showNextButton}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!showNextButton);
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

  const diassembleWords = (text) => {
    console.log("showModal", showScoreModal);
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
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: "NanumSquareRoundB",
                  color: "#E86565",
                  marginBottom: hp(1),
                }}
              >
                우와, 대단해요!
              </Text>
              <View
                style={{
                  backgroundColor: COLORS.bgPurple,
                  width: "90%",
                  borderRadius: 20,
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 25, fontFamily: "NanumSquareRoundB" }}>
                  {userNickname ? userNickname : "송이"}의 최종 점수는
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                >
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
                  style={{
                    borderRadius: 15,
                    backgroundColor: COLORS.primary,
                    marginTop: SIZES.radius,
                    paddingVertical: hp(1),
                    paddingHorizontal: wp(2),
                    marginHorizontal: wp(1),
                  }}
                  onPress={() =>
                    postGameResult() && navigation.navigate("GameMain")
                  }
                >
                  <Text style={{ color: COLORS.white, textAlign: "center" }}>
                    홈으로 돌아가기
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    backgroundColor: "#9CCDFA",
                    marginTop: SIZES.radius,
                    paddingVertical: hp(1),
                    paddingHorizontal: wp(2),
                  }}
                  onPress={restartQuiz}
                >
                  <Text>다시 하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    backgroundColor: "#FA9C9C",
                    marginTop: SIZES.radius,
                    paddingVertical: hp(1),
                    paddingHorizontal: wp(2),
                  }}
                  onPress={() => navigation.navigate("GameRank")}
                >
                  <Text>랭킹 확인하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ width: "100%", height: "25%" }}>{renderHeader()}</View>
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
  game_quesstionContainer: {},
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
  modal_background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
