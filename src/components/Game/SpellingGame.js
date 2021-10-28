import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import hangul from "hangul-js";
import { icons, images } from "../../constants";
import Voice from "@react-native-community/voice";
import { SIZES, dummyData, COLORS } from "../../constants";
import CustomButton from "../CustomButton/CustomButton";
import Tts from "react-native-tts";
import axios from "axios";
import { preURL } from "../../preURL/preURL";
import Sound from "react-native-sound";
import BouncingComponent from "../CustomButton/BouncingComponent";
import Svg from "react-native-svg";
import Orientation from "react-native-orientation";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../constants/responsive";

const correctSound = require("../../assets/sounds/mixkit-unlock-game-notification-253.wav");
const wrongSound = require("../../assets/sounds/mixkit-small-hit-in-a-game-2072.wav");
const resultSound = require("../../assets/sounds/mixkit-game-experience-level-increased-2062.wav");

function SpellingGame({ route, navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const { userId, userNickname, characterNum } = route.params;
  //user Id
  const [userID, setUserID] = useState(0);
  const [userNickName, setUserNickName] = useState("");

  const id = userId ? userId : 0;
  const nickname = userNickname ? userNickname : "송이";
  const characterImg =
    characterNum == 1 ? images.mallangCharacter : images.marimoCharacter;

  // game states
  const [questions, setQuestions] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFeedbackModalVisible, setisFeedbackModalVisible] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [userAnswerState, setuserAnswerState] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [saveResult, setSaveResult] = useState(false);
  // record
  const [isRecord, setisRecord] = useState(false);
  const [speakWord, setSpeakWord] = useState("");
  const [voiceLabel, setVoiceLabel] = useState("버튼을 눌러주세요!");

  // animation
  const animatedValue = useRef(new Animated.Value(0)).current;
  const slideInLeft = useRef(new Animated.Value(0)).current;
  const anim = useRef(new Animated.Value(1));

  //game music
  let correctMusic = new Sound(correctSound, (error) => {
    if (error) {
      console.log("play failed", error);
    }
  });
  let wrongMusic = new Sound(wrongSound, (error) => {
    if (error) {
      console.log("play failed", error);
    }
  });
  let resultMusic = new Sound(resultSound, (error) => {
    if (error) {
      console.log("play failed", error);
    }
  });

  // 백으로부터 게임 정보 가져오기
  const getGameData = async () => {
    try {
      const response = await axios.get(preURL + "/marimo/game/data");
      if (response.data) {
        const responseJson = response.data;
        await setQuestions(responseJson);
      }
    } catch (error) {
      console.log(error);
      console.log("게임 데이터를 가져오지 못했습니다.");
      setQuestions(dummyData.wordList);
    }
  };

  // 백으로 피드백 받기
  const getFeedback = async (userId) => {
    const userSpeechData = {
      userId: userId,
      word: questions[currentQuestionIndex]?.answer,
      speakWord: speakWord,
    };
    await axios
      .post(preURL + "/marimo/game/feedback", userSpeechData)
      .then(async (res) => {
        const response = res.data;
        await setFeedback(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buttonLabel = isRecord ? "그만하기" : "따라하기";

  const _onSpeechStart = () => {
    console.log("onSpeechStart");
  };
  const _onSpeechEnd = () => {
    console.log("onSpeechEnd");
  };
  const _onSpeechResults = (event) => {
    console.log("onSpeechResults");
    setSpeakWord(event.value[0]);
    setVoiceLabel(event.value[0]);
  };
  const _onSpeechError = (event) => {
    console.log("_onSpeechError");
    setVoiceLabel("잘 알아듣지 못했어요! 다시 말해줄래요?");
    console.log(event.error);
  };

  const _onRecordVoice = () => {
    if (isRecord && speakWord) {
      Voice.stop();
      getFeedback(userId);
      setModalVisible(false);
      setisFeedbackModalVisible(true);
    } else if (isRecord && !speakWord) {
      Voice.stop();
    } else {
      Voice.stop();
      setVoiceLabel("말해주세요...");
      Voice.start("ko-KR");
    }
    setisRecord(!isRecord);
  };

  useEffect(() => {
    console.log("퀴즈");
    console.log(questions);
  }, [questions]);

  useEffect(async () => {
    // 세로 화면 고정
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(onOrientationDidChange);
    const questionFrom = await getGameData();

    setUserID(id);
    setUserNickName(nickname);
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    console.log("windowHeight: ", windowHeight);
    console.log("windowWidth: ", windowWidth);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      Tts.removeEventListeners;
      Orientation.unlockAllOrientations();
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  }, []);

  // oreintation
  const onOrientationDidChange = (orientation) => {
    if (orientation === "LANDSCAPE") {
      Orientation.lockToPortrait();
    }
  };

  // character animation
  const _start = () => {
    if (currentQuestionIndex > 0) {
      animatedValue.setValue(0);
      slideInLeft.setValue(0);
    }

    return Animated.parallel([
      Animated.timing(slideInLeft, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  //tts
  Tts.setDefaultLanguage("ko-KR");
  Tts.setDefaultRate(0.3);
  Tts.addEventListener("tts-start", (event) => {
    console.log("start", event);
  });
  Tts.addEventListener("tts-finish", (event) => {
    console.log("finish", event);
  });

  Tts.addEventListener("tts-cancel", (event) => {
    console.log("cancel", event);
  });

  const readText = async (speakWord) => {
    Tts.stop();
    if (speakWord) Tts.speak(speakWord);
  };

  // 렌더링 시 글자 읽기
  useEffect(() => {
    _start();
    setTimeout(() => {
      questions !== undefined
        ? readText(questions[currentQuestionIndex]?.answer)
        : {};
    }, 1000);
    return () => {
      Tts.removeEventListeners;
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [currentQuestionIndex, questions]);

  // 캐릭터 애니메이션
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // post
  const postGameResult = async () => {
    if (saveResult) {
      const data = {
        userId: userID,
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
          Alert.alert("게임 결과 저장에 실패했습니다!");
        });
      setSaveResult(false);
    } else {
      return null;
    }
  };

  // game

  // 퀴즈 다시 시작
  const restartQuiz = () => {
    setSpeakWord("");
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setModalVisible(false);
    setIsOptionsDisabled(false);
    setCurrentOptionSelected(false);
    setCorrectOption(null);
    setFeedback("");
    setVoiceLabel("버튼을 눌러주세요!");
  };

  // 정답 체크
  const validateAnswer = (selectedOption) => {
    let correct_answer = questions[currentQuestionIndex]?.vowelAnswer;
    let fullWord = questions[currentQuestionIndex]?.answer;
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_answer);
    setIsOptionsDisabled(true);
    if (selectedOption === correct_answer) {
      // user answer state
      setuserAnswerState(true);
      // Set Score
      setScore(score + 20);
      // music

      correctMusic.play((success) => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
    } else {
      setuserAnswerState(false);
      wrongMusic.play((success) => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
    }
    readText(fullWord);
    // Show Modal
    setModalVisible(true);
  };

  // 다음 문제로 이동
  const handleNext = () => {
    if (currentQuestionIndex == questions?.length - 1) {
      setisFeedbackModalVisible(false);
      setShowScoreModal(true);
      setSaveResult(true);
      resultMusic.play((success) => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSpeakWord("");
      setCurrentOptionSelected(false);
      setCorrectOption(null);
      setModalVisible(false);
      setisFeedbackModalVisible(false);
      setIsOptionsDisabled(false);
      setFeedback("");
      setVoiceLabel("버튼을 눌러주세요!");
    }
  };

  const assembleVowelForOption = (option) => {
    let assembleWord = hangul.a(["ㅇ", option[0], "ㅇ", option[1]]);
    return assembleWord;
  };

  // 옵션 렌더링
  const renderOptions = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        {questions !== undefined &&
          questions[currentQuestionIndex]?.vowel.map((option, index) => (
            <View
              key={index}
              style={{
                flexDirection: "column",
              }}
            >
              <Animated.View style={{ flex: 1, opacity: animatedValue }}>
                <TouchableOpacity
                  onPress={() => validateAnswer(option)}
                  disabled={isOptionsDisabled}
                  key={index}
                  style={{
                    borderWidth: 3,
                    borderColor:
                      option == correctOption
                        ? COLORS.correct
                        : option == currentOptionSelected
                        ? COLORS.red
                        : COLORS.black,
                    backgroundColor:
                      option == correctOption
                        ? COLORS.correct + "50"
                        : option == currentOptionSelected
                        ? COLORS.wrong + "50"
                        : COLORS.plateColor,
                    height:
                      windowWidth < windowHeight
                        ? heightPercentage(160)
                        : widthPercentage(80),
                    borderRadius:
                      windowWidth < windowHeight
                        ? heightPercentage(160) / 2
                        : widthPercentage(80) / 2,
                    justifyContent: "center",
                    alignItems: "center",
                    width:
                      windowWidth < windowHeight
                        ? heightPercentage(160)
                        : widthPercentage(80),
                  }}
                >
                  <View
                    style={{
                      borderWidth: 3,
                      borderColor:
                        option == correctOption
                          ? COLORS.correct
                          : option == currentOptionSelected
                          ? COLORS.red
                          : COLORS.black,
                      width:
                        windowWidth < windowHeight
                          ? heightPercentage(120)
                          : widthPercentage(60),
                      height:
                        windowWidth < windowHeight
                          ? heightPercentage(120)
                          : widthPercentage(60),

                      borderRadius:
                        windowWidth < windowHeight
                          ? heightPercentage(120) / 2
                          : widthPercentage(60) / 2,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontPercentage(28),
                        color: COLORS.black,
                        textAlign: "center",
                        fontFamily: "Cafe24Ssurround",
                      }}
                    >
                      {option}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
              {/* 발음 듣기 */}
              <View>
                <TouchableOpacity
                  onPress={() => readText(assembleVowelForOption(option))}
                  key={index}
                  style={{
                    borderWidth: 3,
                    backgroundColor: COLORS.bgPurple,
                    // height: heightPercentage(50),
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontPercentage(24),
                      color: COLORS.black,
                      textAlign: "center",
                      fontFamily: "Cafe24Ssurround",
                      marginVertical: "5%",
                    }}
                  >
                    소리 듣기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    );
  };

  const renderResultModal = () => {
    if (modalVisible) {
      const message = userAnswerState ? "참 잘했어요!" : "괜찮아요!";

      return (
        <Modal
          transparent={true}
          animationType={"slide"}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert(
              "피드백 종료",
              "피드백 창을 끄면 게임을 계속할 수 없어요!",
              [
                {
                  text: "종료",
                  onPress: () => navigation.goBack(),
                },
                {
                  text: "취소",
                  onPress: () => console.log("종료 취소"),
                  style: "cancel",
                },
              ],
              {
                cancelable: false,
              }
            );
          }}
        >
          <View style={styles.modal_background}>
            <ImageBackground
              source={images.gameResultModal}
              resizeMode="contain"
              style={{
                width:
                  windowWidth < windowHeight ? widthPercentage(300) : hp(80),
                height:
                  windowWidth < windowHeight ? heightPercentage(450) : wp(70),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BouncingComponent characterNum={characterNum} />
              <Text
                style={{
                  marginVertical: "4%",
                  fontSize: fontPercentage(24),
                  fontFamily: "Cafe24Ssurround",
                  color: COLORS.primary,
                }}
              >
                {message}
              </Text>
              <Text
                style={{
                  fontSize: fontPercentage(18),
                  fontFamily: "NanumSquareRoundB",
                }}
              >
                정답은 {correctOption}입니다!
              </Text>
              <Text
                style={{
                  marginTop: "2%",
                  fontSize: fontPercentage(18),
                  fontFamily: "NanumSquareRoundB",
                }}
              >
                그럼 함께 따라읽어 볼까요?
              </Text>
              <Text style={styles.voiceLabel}>{voiceLabel}</Text>
              <View style={{ width: "35%" }}>
                <CustomButton
                  buttonText={buttonLabel}
                  onPress={_onRecordVoice}
                  backgroundColor={"#D4AEF9"}
                />
              </View>
            </ImageBackground>
          </View>
        </Modal>
      );
    } else {
      return null;
    }
  };

  const renderFeedbackModal = () => {
    const feedbackWord = feedback
      ? feedback
      : "연결 불안정의 문제로 현재는 피드백을 얻을 수 없어요!";
    if (isFeedbackModalVisible) {
      return (
        <Modal
          transparent={true}
          animationType={"slide"}
          visible={isFeedbackModalVisible}
          onRequestClose={() => {
            Alert.alert("피드백 도중에는 뒤로 갈 수 없어요!");
          }}
        >
          <View style={styles.modal_background}>
            <ImageBackground
              source={images.gameResultModal}
              resizeMode="contain"
              style={{
                width:
                  windowWidth < windowHeight ? widthPercentage(300) : hp(80),
                height:
                  windowWidth < windowHeight ? heightPercentage(450) : wp(70),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Image
                  source={images.feedbackImage}
                  resizeMode="contain"
                  style={{
                    // width: widthPercentage(230),
                    height:
                      windowWidth < windowHeight
                        ? heightPercentage(175)
                        : widthPercentage(90),
                  }}
                />
                <Text
                  style={{
                    marginTop: "5%",
                    fontFamily: "Cafe24Ssurround",
                    fontSize: fontPercentage(30),
                    marginVertical: "1%",
                    color: COLORS.red,
                    textAlign: "center",
                  }}
                >
                  피드백 시간!
                </Text>
                <View>
                  <Text
                    style={{
                      fontFamily: "NanumSquareRoundB",
                      fontSize: fontPercentage(18),
                      textAlign: "center",
                      marginTop: "3%",
                      marginHorizontal: "5%",
                      marginBottom: feedbackWord.length > 30 ? -20 : 15,
                    }}
                  >
                    {feedbackWord}
                  </Text>
                </View>
                <View style={{ width: "45%" }}>
                  <CustomButton
                    buttonText="다음 문제로!"
                    onPress={handleNext}
                    backgroundColor={"#D4AEF9"}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.spellingGameBackground}
        resizeMode="cover"
        style={styles.image}
      >
        {/* Question */}
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
                / {questions?.length}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: SIZES.padding,
                backgroundColor: "#F6E08D",
                width: "25%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 5,
                borderRadius: 15,
                borderWidth: 3,
              }}
            >
              <Text style={styles.scoreText}>점수: {score}</Text>
            </View>
          </View>

          {/* Question */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                questions !== undefined
                  ? readText(questions[currentQuestionIndex]?.answer)
                  : {}
              }
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: slideInLeft.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-600, 0],
                      }),
                    },
                  ],
                }}
              >
                <ImageBackground
                  source={images.gameWordBoard}
                  resizeMode="contain"
                  style={{
                    justifyContent: "center",
                    width:
                      windowWidth < windowHeight
                        ? widthPercentage(140)
                        : widthPercentage(70),

                    height:
                      windowWidth < windowHeight
                        ? heightPercentage(100)
                        : heightPercentage(180),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.game_question}>
                      {questions !== undefined &&
                        questions[currentQuestionIndex]?.initial}
                    </Text>
                  </View>
                </ImageBackground>
              </Animated.View>
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: "#0078fe",
                padding: 10,
                marginLeft: "10%",
                borderRadius: 20,
                marginTop: 5,
                marginRight: "5%",
                maxWidth: "60%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: fontPercentage(22),
                  color: "#fff",
                  fontFamily: "Cafe24Ssurround",
                }}
              >
                모음을 연결해보자!
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.9,
          }}
        >
          <Animated.View
            style={{
              transform: [{ scale: anim.current }],
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Svg
              style={{
                width:
                  windowWidth < windowHeight ? widthPercentage(165) : wp(25),
                height:
                  windowWidth < windowHeight ? heightPercentage(140) : wp(20),
              }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                source={characterImg}
                resizeMode="contain"
              />
            </Svg>
            {/* <Image source={images.marimoCharacter} resizeMode="contain" /> */}
          </Animated.View>
        </View>
        {/* userAnswer */}
        {renderOptions()}

        {/* Answer Correct Modal */}
        {renderResultModal()}
        {renderFeedbackModal()}

        {/* 점수 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View style={styles.resultModal_background}>
            <View style={styles.resultModal_Container}>
              {/* 게임 결과 */}
              <View
                style={{
                  position: "absolute",
                  bottom: "105%",
                  width: "100%",
                  height: "20%",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    width:
                      windowWidth < windowHeight
                        ? widthPercentage(130)
                        : widthPercentage(70),
                    backgroundColor: "#B29262",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    borderWidth: 3,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Cafe24Ssurround",
                      fontSize: fontPercentage(26),
                      color: COLORS.white,
                    }}
                  >
                    게임 결과
                  </Text>
                </View>
              </View>
              <View style={styles.resultModal_innerContainer}>
                <Text style={styles.resultModal_congratText}>
                  {score / 20 > questions?.length / 2
                    ? "우와 대단해요!"
                    : "충분히 잘했어요!"}
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: "NanumSquareRoundB",
                    textAlign: "center",
                  }}
                >
                  {userNickname}(이)의{"\n"} 최종 점수는
                </Text>

                <View style={styles.resultModal_scoreContainer}>
                  <Text
                    style={{
                      fontSize: 30,
                      color: score > questions?.length / 2 ? "green" : "red",
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
                    postGameResult() &&
                    Voice.destroy().then(Voice.removeAllListeners) &&
                    navigation.navigate("GameMain")
                  }
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      textAlign: "center",
                      fontFamily: "Cafe24Ssurround",
                      fontSize: fontPercentage(22),
                    }}
                  >
                    메인화면으로
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.resultModal_restartGameBtn}
                  onPress={postGameResult() && restartQuiz}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Cafe24Ssurround",
                      fontSize: fontPercentage(22),
                    }}
                  >
                    다시 하기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
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
    backgroundColor: "#F6E08D",
    width: "20%",
    borderRadius: 15,
    marginHorizontal: SIZES.padding,
  },
  game_currentIndex: {
    color: "#B29262",
    fontSize: 20,
    opacity: 0.6,
    marginRight: 2,
    fontFamily: "NanumSquareRoundB",
  },
  game_question: {
    color: COLORS.black,
    fontSize: fontPercentage(28),
    textAlign: "center",
    fontFamily: "NanumSquareRoundB",
  },
  scoreText: {
    color: "#464D46",
    fontSize: fontPercentage(15),
    fontFamily: "Cafe24Ssurround",
  },
  voiceLabel: {
    marginTop: SIZES.radius,
    paddingTop: 12,
    paddingHorizontal: SIZES.padding,
    fontFamily: "NanumSquareRoundB",
    textAlign: "center",
    fontSize: fontPercentage(14),
  },
  modal_background: {
    flex: 1,
    alignItems: "center",
    // flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#00000040",
  },
  ultModal_background: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  resultModal_background: {
    flex: 1,
    backgroundColor: "#EBE9B3",
    alignItems: "center",
    justifyContent: "center",
  },
  resultModal_Container: {
    backgroundColor: "#F6E08D",
    width: "90%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 3,
  },
  resultModal_congratText: {
    fontSize: 18,
    fontFamily: "NanumSquareRoundB",
    color: "#E86565",
    marginBottom: "3%",
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
    justifyContent: "center",
    marginHorizontal: 5,
    paddingHorizontal: 5,
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  resultModal_restartGameBtn: {
    borderRadius: 15,
    backgroundColor: "#9CCDFA",
    marginTop: SIZES.radius,
    justifyContent: "center",
    marginHorizontal: 5,
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
