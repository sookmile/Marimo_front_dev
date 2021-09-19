import React, { useState, useEffect } from "react";
import Styled from "styled-components/native";
import Voice from "react-native-voice";
import {
  Text,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import preURL from "../../preURL/preURL";

const ButtonRecord = Styled.Button``;

const Login = ({ navigation }) => {
  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 70) : (cntrMargin = 20);
  // for recording
  const [isRecord, setIsRecord] = useState(false);
  // for userName
  const [text, setText] = useState("");
  // 삭제해야함
  const [isConfirm, setIsConfirm] = useState(false);
  // for input method
  const [pageNum, setPageNum] = useState(0);

  // for ui design
  const { width, height } = Dimensions.get("window");
  const buttonLabel = isRecord ? "Stop" : "Start";
  const voiceLabel = isRecord
    ? text.length === 0
      ? "이름을 인식하고 있습니다\n 잠시만 기다려주세요.."
      : text
    : "마이크 버튼을 누르고 말해주세요!";

  useEffect(async () => {
    console.log("변했니");
    console.log(await AsyncStorage.getItem("userId"));
    const id = await AsyncStorage.getItem("userId");
  }, []);

  // 음성인식 과정
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
  const postSpeechUserName = async (body) => {
    console.log(body);
    await axios
      .post(preURL.preURL + "/marimo/nickname", body)
      .then(async (res) => {
        const response = res.data;
        console.log(response);
        console.log("설명", response);
      })
      .catch((err) => {
        console.log("에러  발생 ");
        console.log(err);
      });
  };

  useEffect(async () => {
    if (pageNum === 0 && text.length !== 0) {
      console.log(text);
      Voice.stop();
      setIsConfirm(true);
      setPageNum(1);
    }
  }, [text]);

  useEffect(() => {
    if (pageNum === 0 || pageNum === 2) {
      setText("");
    }
  }, [pageNum]);

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
<<<<<<< HEAD
    <>
      {pageNum === 0 ? (
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
                width: 290,
                height: 290,
                marginTop: -1 * cntrMargin,
              }}
              onPress={_onRecordVoice}
            >
              <Image
                style={{ width: 290, height: 290 }}
                source={require("../../assets/MikeIcon.png")}
              />
            </TouchableOpacity>
            <VoiceText>{voiceLabel}</VoiceText>

            <TouchableOpacity onPress={() => setPageNum(2)}>
              <KeyText>자판으로 입력할게요</KeyText>
            </TouchableOpacity>
            <Text>{text ? `${text}` : "단어 없음.."}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("NavTab")}>
              <Text>Move</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Character", {
                  name: "우진",
                })
              }
            >
              <Text>캐릭터 선택</Text>
            </TouchableOpacity>
          </Cntr>
        </Container>
      ) : pageNum === 1 ? (
        <Container style={{ marginTop: cntrMargin }}>
          <BackCntr onPress={() => setPageNum(0)}>
            <BackIcon>뒤로 가기</BackIcon>
          </BackCntr>
          <Cntr>
            <Box>
              <ConfirmText>친구의 이름은</ConfirmText>
              <ConfirmNameText>{text}</ConfirmNameText>
              <ConfirmText>가 맞나요?</ConfirmText>
            </Box>
            <BtnCntr>
              <Btn
                onPress={async () => {
                  const userId = await AsyncStorage.getItem("userId");
                  console.log(userId);
                  const postData = {
                    id: userId === null ? 3 : userId,
                    nickname: text,
                  };
                  console.log(postData);
                  await postSpeechUserName(postData);
                  navigation.navigate("Character", {
                    name: text,
                  });
                }}
              >
                <BtnText>네, 맞아요!</BtnText>
              </Btn>
              <Btn
                style={{ marginTop: height * 0.025 }}
                onPress={() => setPageNum(0)}
              >
                <BtnText>아니요. 다시 말할래요</BtnText>
              </Btn>
            </BtnCntr>
            <TouchableOpacity onPress={() => setPageNum(2)}>
              <KeyText>자판으로 입력할게요</KeyText>
            </TouchableOpacity>
          </Cntr>
          <Text>{text}</Text>
        </Container>
      ) : pageNum == 2 ? (
        <Container style={{ marginTop: cntrMargin }}>
          <BackCntr onPress={() => navigation.navigate("StartMain")}>
            <BackIcon>뒤로 가기</BackIcon>
          </BackCntr>
          <IntroText>
            안녕, <AppName>마리모</AppName>에 온 걸 환영해!{"\n"}네 이름은 뭐니?
          </IntroText>
          <Cntr>
            <NameInput
              placeholder="이름을 입력해주세요"
              value={text}
              onChangeText={setText}
            />
            <BtnCntr>
              <Btn
                style={{ marginTop: height * 0.025 }}
                onPress={() =>
                  navigation.navigate("Character", {
                    name: text,
                  })
                }
              >
                <BtnText>입력을 완료했어요</BtnText>
              </Btn>
            </BtnCntr>
          </Cntr>
        </Container>
      ) : (
        <></>
      )}
    </>
=======
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
        <TouchableOpacity onPress={() => navigation.navigate("NavTab")}>
          <Text>Move</Text>
        </TouchableOpacity>
      </Cntr>
    </Container>
>>>>>>> 4c9e0d1c9508bbd461d14695cefe9367b7198c7d
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
const VoiceText = Styled.Text`
  margin: 32px;
  color:#999999;
  font-size:20px;
  line-height:29.6px;
`;
const KeyText = Styled.Text`
  color:#E86565
  font-size:18px;
  line-height:27px;
  border-bottom-width:1
  border-bottom-color:#E86565

  `;
const AppName = Styled.Text`
  font-size:22px;
  color: #F66C6C;
`;

const Box = Styled.View`
width:237px;
height:243px;
border-radius:1;
border-width:2;
border-color:#E86565;
align-items:center;
justify-content:center;
`;

const ConfirmText = Styled.Text`
color:#999999;
font-size:20px;
line-height: 30px;
`;

const ConfirmNameText = Styled.Text`
color:#E86565;
font-size:36px;
line-height: 53.28px;
font-weight:700;
`;

const BtnCntr = Styled.View`
    margin-top:20px;
`;

const Btn = Styled.TouchableOpacity`
  background-color: #B16CF6;
  color: white;
  width: 343px;
  height: 56px;
  border-radius: 14px;
  align-items:center;
  justify-content:center;
`;
const BtnText = Styled.Text`
  color:white;
  font-size: 18px;
  letter-spacing: -0.408px;
`;
const NameInput = Styled.TextInput`
height:55px;
width:80%;
font-size:16px;
border-width:1
padding:10px
margin-top:-200;
`;
