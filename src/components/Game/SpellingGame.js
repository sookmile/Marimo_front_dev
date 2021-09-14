import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Stylesheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import hangul from "hangul-js";
import Voice from "react-native-voice";
import { SIZES } from "../../constants";
import CustomButton from "../CustomButton/CustomButton";

function SpellingGame({ navigation }) {
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

  const diassembleWords = (text) => {
    let diassemble = hangul.disassemble(text, true);

    let cho = "";
    if (diassemble) {
      console.log(diassemble);
      for (let i = 0, l = diassemble.length; i < l; i++) {
        cho += diassemble[i][0];
      }
      console.log(cho);
    }
  };

  return (
    <View style={{ flex: 1, zIndex: -1, display: "flex" }}>
      {renderHeader()}
    </View>
  );
}

export default SpellingGame;
