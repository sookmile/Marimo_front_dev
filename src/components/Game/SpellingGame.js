import React, { useState, useEffect } from "react";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { images } from "../../constants";

import Box from "./Box";

import hangul from "hangul-js";
import Voice from "react-native-voice";
import { SIZES, dummyData, COLORS } from "../../constants";
import CustomButton from "../CustomButton/CustomButton";
import { create } from "react-test-renderer";

function SpellingGame({ navigation }) {
  //game
  const { width, height } = Dimensions.get("screen");
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;
  const initialBox = Matter.Bodies.rectangle(
    width / 2,
    height * 0.4,
    boxSize,
    boxSize
  );
  const floor = Matter.Bodies.rectangle(
    width / 2,
    (height - boxSize) * 0.7,
    width,
    boxSize,
    { isStatic: true }
  );
  Matter.World.add(world, [initialBox, floor]);

  const Physics = (entities, { time }) => {
    let engine = entities["physics"].engine;
    Matter.Engine.update(engine, time.delta);
    return entities;
  };

  let boxIds = 0;

  const questions = dummyData.wordList;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  let userAnswer = "";

  // record
  const [isRecord, setisRecord] = useState(false);
  const [text, setText] = useState("");
  const buttonLabel = isRecord ? "Stop" : "Start";
  const voiceLabel = text
    ? text
    : isRecord
    ? "Say something"
    : "press Start Button";

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

  const CreateBox = (entities, { touches, screen }) => {
    let world = entities["physics"].world;
    let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
    if (currentAnswer === correctAnswer && userAnswer !== "") {
      let body = Matter.Bodies.rectangle(
        width / 2,
        height * 0.2,
        boxSize,
        boxSize,
        {
          frictionAir: 0.021,
          restitution: 1.0,
        }
      );

      Matter.World.add(world, [body]);

      entities[++boxIds] = {
        body: body,
        size: [boxSize, boxSize],
        renderer: Box,
        texture: images.gameOb_Crate,
      };
    }
    return entities;
  };

  const validateAnswer = (userAnswer) => {
    let correct_answer = questions[currentQuestionIndex]?.word;
    setCurrentAnswer(userAnswer);
    setCorrectAnswer(correct_answer);
    if (userAnswer == correct_answer) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex == questions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer(null);
      setCorrectAnswer(null);
      setShowNextButton(false);
    }
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: "black", fontSize: 18, opacity: 0.6 }}>
            / {questions.length}
          </Text>
        </View>

        {/* Question */}
        <View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 30,
            }}
          >
            {questions[currentQuestionIndex]?.word}
          </Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={{ height: SIZES.height > 700 ? "65%" : "60%" }}>
        <Text
          style={{
            marginTop: SIZES.radius,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
        >
          {voiceLabel}
        </Text>
        <Text>{text && _onSpeechEnd && diassembleWords(text)}</Text>
        <CustomButton buttonText={buttonLabel} onPress={_onRecordVoice} />
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: COLORS.red,
            padding: 20,
            borderRadius: 5,
          }}
        >
          <Text
            style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const diassembleWords = (text) => {
    let diassemble = hangul.disassemble(text, true);

    let cho = "";
    if (diassemble && _onSpeechEnd) {
      console.log(diassemble);
      for (let i = 0, l = diassemble.length; i < l; i++) {
        cho += diassemble[i][0];
      }
      console.log(cho);
    }
    userAnswer = cho;
    console.log("사용자 정답: ", userAnswer);
    return cho;
  };

  return (
    <View style={styles.container}>
      {/* Question */}
      {renderQuestion()}

      {/* Next Button */}
      {renderNextButton()}

      {/* Score Modal */}
      <Modal animationType="slide" transparent={true} visible={showScoreModal}>
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
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {score > questions.length / 2 ? "Congratulations!" : "Oops!"}
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
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.black,
                }}
              >
                / {questions.length}
              </Text>
            </View>
            {/* Retry Quiz button */}
            <TouchableOpacity onPress={() => navigation.navigate("GameMain")}>
              <Text>홈으로 돌아가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ width: "100%", height: "20%", backgroundColor: "yellow" }}>
        {renderHeader()}
      </View>
    </View>
  );
}

export default SpellingGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  game: {
    width: "100%",
    height: "80%",
  },
});
