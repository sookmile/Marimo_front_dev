import React, { useState, useEffect } from "react";
import Styled from "styled-components/native";
import Voice from "react-native-voice";
import { Text, Button, Image, TouchableOpacity } from "react-native";

const ButtonRecord = Styled.Button``;
const VoiceText = Styled.Text`
  margin: 32px;
`;

const Login = ({ navigation, userName }) => {
  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 70) : (cntrMargin = 20);
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState("");
  const buttonLabel = isRecord ? "Stop" : "Start";
  const voiceLabel = isRecord
    ? text.length === 0
      ? "이름을 인식하고 있습니다\n 잠시만 기다려주세요.."
      : text
    : "마이크 버튼을 누르고 이름을 말해주세요!";

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
    Voice.stop();
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
  };
  useEffect(() => {
    if (text.length !== 0) {
      Voice.stop();
      userName = text;
      navigation.navigate("SignUp");
    }
  }, [text]);

  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  return (
    <Container style={{ marginTop: cntrMargin }}>
      <BackCntr onPress={() => navigation.navigate("StartMain")}>
        <BackIcon>뒤로 가기</BackIcon>
      </BackCntr>
      <IntroText>
        안녕, <AppName>마리모</AppName>에 온 걸 환영해!{"\n"}네 이름은 뭐니?
      </IntroText>
      <Cntr>
        <TouchableOpacity
          style={{
            borderRadius: 125,
            width: 250,
            height: 250,
          }}
          onPress={_onRecordVoice}
        >
          <Image
            style={{ width: 250, height: 250 }}
            source={require("../../assets/MikeIcon.png")}
          />
        </TouchableOpacity>
        <VoiceText>{voiceLabel}</VoiceText>
        <Text>{text ? `${text}` : "단어 없음.."}</Text>
      </Cntr>
    </Container>
  );
};

export default Login;

const Cntr = Styled.View`
width:100%;
height:80%;
align-items:center;
justify-content:center;
`;
const BackCntr = Styled.TouchableOpacity`
align-items:flex-start;
justify-content:center;
`;

const BackIcon = Styled.Text`
width:120px;
font-size:18px;
`;
const Container = Styled.View`
  flex: 1;
margin-left:10px;
margin-top:10px;
`;

const IntroText = Styled.Text`
  font-size:22px;
  font-weight: bold;
  margin-top:30px;
  line-height: 40px;


`;
const AppName = Styled.Text`
  font-size:22px;
  color: #F66C6C;
`;
