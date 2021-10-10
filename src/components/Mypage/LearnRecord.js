import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import { Circle } from "react-native-svg";
import CustomSwitch from "./CustomSwitch";
import { ProgressBar, Colors, ActivityIndicator } from "react-native-paper";
import ToggleSwitch from "rn-toggle-switch";

import {
  BarChart,
  XAxis,
  Grid,
  LineChart,
  YAxis,
} from "react-native-svg-charts";
import * as scale from "d3-scale";

import CustomButton from "../CustomButton/CustomButton";
import { FONTS, COLORS, SIZES, icons, navTabIcons } from "../../constants";
import styled from "styled-components";
import Character1 from "../../assets/icons/Character/Character1.png";
import Character2 from "../../assets/icons/Character/Character2.png";
import Character3 from "../../assets/icons/Character/Character3.png";
import Character4 from "../../assets/icons/Character/Character4.png";
import Contents from "../../assets/images/memories/sunflowers.png";
import Inactive from "../../assets/icons/Character/Inactive.png";
import { FlatList } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/Ionicons";

import axios from "axios";
// post 성공시 User id 저장
import AsyncStorage from "@react-native-async-storage/async-storage";
import preURL from "../../preURL/preURL";
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";
import Tts from "react-native-tts";

const character = [
  { value: 0, src: Character1, label: "모모" },
  { value: 1, src: Character2, label: "말랑이" },
  { value: 2, src: Character3, label: "행복이" },
  { value: 3, src: Character4, label: "기쁨이" },
];

const LearnRecord = ({ navigation, route }) => {
  const onSelectSwitch = (index) => {
    alert("Selected index: " + index);
  };
  const [getSelectionMode, setSelectionMode] = useState(1);
  const [grade, setGrade] = useState(80);
  const [diffWord, setDiffWord] = useState(["양동이", "옷걸이", "장미꽃"]);
  const [userId, setUserID] = useState(-1);
  const [recordInfo, setRecordInfo] = useState([]);
  const [word, setWord] = useState({});
  const [joinNum, setJoinNum] = useState({});
  const [userNickname, setUserNickName] = useState("");
  const fill = "rgb(134, 65, 244)";
  const data = [50, 10, 40, 95, 40, 20];
  const data2 = [
    {
      value: 50,
      label: "One",
    },
    {
      value: 10,
      label: "Two",
    },
    {
      value: 40,
      label: "Three",
    },
    {
      value: 95,
      label: "Four",
    },
    {
      value: 85,
      label: "Five",
    },
  ];
  const CUT_OFF = 20;
  const Labels = ({ x, y, bandwidth, data }) =>
    data.map((value, index) => (
      <Text
        key={index}
        x={-10}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={14}
        fill={value >= CUT_OFF ? "white" : "black"}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
      >
        {value}
      </Text>
    ));
  useEffect(async () => {
    const id = await AsyncStorage.getItem("userId");
    const nickname = await AsyncStorage.getItem("userNickname");
    setUserNickName(nickname);
    setUserID(Number(id));
    await getRecord(id);
  }, []);

  useEffect(() => {
    if (recordInfo.length !== 0) {
      setWord({ success: recordInfo.mostSuccess, fail: recordInfo.mostFail });
      setJoinNum({
        game: recordInfo.gameJoinNum,
        tail: recordInfo.taleJoinNum,
      });
      setGrade(recordInfo.achievementRate);
    }
  }, [recordInfo]);
  const getRecord = async (id) => {
    console.log(id);
    await axios
      .post(preURL.preURL + "/marimo/user/record", {
        userId: 1,
      })
      .then(async (res) => {
        const response = res.data;
        console.log(res.data);
        await setRecordInfo(response);
      })
      .catch((err) => {
        console.log("에러 발생 ");
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(getSelectionMode);
  }, [getSelectionMode]);
  const item = character[0];
  const [alarm, setAlarm] = useState(false);
  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 70) : (cntrMargin = 20);
  let chMargin = 0;
  Platform.OS === "ios" ? (chMargin = 40) : (chMargin = 20);

  // tts 설정
  Tts.setDefaultLanguage("ko-KR");
  Tts.addEventListener("tts-start", (event) => console.log("start", event));
  Tts.addEventListener("tts-finish", (event) => console.log("finish", event));
  Tts.addEventListener("tts-cancel", (event) => console.log("cancel", event));

  const _onPressSpeech = (word) => {
    Tts.stop();
    Tts.speak(word);
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFFBF8" }}>
      <Container style={{ marginTop: cntrMargin }}>
        <BackCntr onPress={() => navigation.navigate("Home")}>
          <Icon
            name="chevron-back"
            style={{ marginRight: 10 }}
            size={23}
            color={"#555555"}
          ></Icon>
          <BackIcon>뒤로 가기</BackIcon>
        </BackCntr>
        <Cntr style>
          <Text
            style={{
              fontFamily: "Cafe24Ssurround",
              lineHeight: 21,
              fontSize: 18,
            }}
          >
            나의 기록들
          </Text>
          <BasicCntr>
            <ImgCntr>
              <ChImage style={{ width: 75, height: 75 }} source={item.src} />
            </ImgCntr>
            <Info>
              <UserName>{userNickname}</UserName>
              <UserRegister>가입일자: {recordInfo?.registerDate}</UserRegister>
              <ProgressBar
                style={{
                  width: 200,
                  marginTop: 15,
                  height: 10,
                  borderRadius: 5,
                }}
                progress={0.5}
                color={"#A49CFA"}
              />
            </Info>
          </BasicCntr>
          <RecordCntr>
            <Text
              style={{
                fontFamily: "Cafe24Ssurround",
                lineHeight: 21,
                fontSize: 18,
                width: "100%",
                textAlign: "left",
              }}
            >
              {userNickname}의 기록들
            </Text>

            <View style={{ alignItems: "center", margin: 20 }}>
              <CustomSwitch
                getSelectionMode={getSelectionMode}
                setSelectionMode={setSelectionMode}
                roundCorner={true}
                option1={"결과분석"}
                option2={"플레이 기록"}
                onSelectSwitch={() => {}}
                selectionColor={"white"}
              />
            </View>
            {getSelectionMode === 1 ? (
              <MainCntr isResult>
                <ChartCntr>
                  <ResultText>{userNickname} 의 전반적 성취도</ResultText>
                  <ProgressCntr>
                    <AnimatedCircularProgress
                      size={150}
                      width={15}
                      fill={grade}
                      rotation={0}
                      tintColor="#B16CF6"
                      backgroundColor="#D3C1F0"
                      renderCap={({ center }) => (
                        <Circle
                          cx={center.x}
                          cy={center.y}
                          r="8"
                          fill="#B16CF6"
                        />
                      )}
                    >
                      {(fill) => <GradeText>{grade}%</GradeText>}
                    </AnimatedCircularProgress>
                  </ProgressCntr>
                  <ResultText isSmall>
                    {userNickname} (은)는 모음과 자음의 발음에 능숙합니다.{"\n"}
                    아직 받침이 있는 단어의 발음과 된자음의 발음에 어려움을
                    겪습니다.
                  </ResultText>
                  <Wrapper style={{ height: 35 }} />
                  <ResultText isMiddle style={{ marginBottom: 5 }}>
                    {userNickname} (이)가 잘 발음하는 단어
                  </ResultText>
                  <View style={{ height: 210, padding: 20 }}>
                    <BarChart
                      style={{ flex: 1 }}
                      data={data2.map((obj) => obj.value)}
                      gridMin={0}
                      svg={{ fill: "rgb(134, 65, 244)" }}
                    >
                      <Grid />
                    </BarChart>
                    <XAxis
                      style={{ marginTop: 10 }}
                      data={data2}
                      scale={scale.scaleBand}
                      formatLabel={(value, index) => data2[index].label}
                      contentInset={{ left: 0 }}
                      svg={{ fontSize: 13, fill: "black" }}
                    />
                    <XAxis
                      style={{ marginTop: 10 }}
                      data={data2}
                      scale={scale.scaleBand}
                      formatLabel={(value, index) => data2[index].value}
                      contentInset={{ left: 0 }}
                      svg={{ fontSize: 13, fill: "black" }}
                    />
                  </View>

                  <Wrapper style={{ height: 35 }} />
                  <ResultText isMiddle>
                    {userNickname}가 잘 발음하지 못하는 단어
                  </ResultText>
                  {diffWord.map((obj) => (
                    <>
                      <Wrapper />
                      <ContnetWordCntr>
                        <ContentTexts>
                          <ContentDiffWord
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {obj}
                          </ContentDiffWord>
                          <ContentText
                            style={{ width: "100%", fontSize: 13 }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {obj === "장미꽃"
                              ? "모험-앗, 도와줘! 우당탕탕 왕국 모험"
                              : "게임-마리모와 함께하는 모음학습"}
                          </ContentText>
                        </ContentTexts>
                        <TouchableOpacity onPress={() => _onPressSpeech(obj)}>
                          <ChImage
                            style={{
                              borderRadius: 0,
                              width: 37,
                              height: 37,
                            }}
                            source={navTabIcons.ic_voice}
                          />
                        </TouchableOpacity>
                      </ContnetWordCntr>
                    </>
                  ))}
                </ChartCntr>
              </MainCntr>
            ) : (
              <MainCntr>
                <ContentCntr>
                  <ContentExp
                    style={{ textAlign: "left" }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {userNickname} (이)가 가장 많이 플레이한 동화는 '앗, 도와줘!
                    우당탕탕 왕국 모험' 이에요
                  </ContentExp>

                  <ContnetSubCntr>
                    <View style={{ width: "30%" }}>
                      <ChImage
                        style={{
                          borderRadius: 20,
                          width: 85,
                          height: 90,
                        }}
                        source={navTabIcons.ic_story1}
                      />
                    </View>
                    <ContentTexts style={{ width: "64%" }}>
                      <ContentTitle numberOfLines={1} ellipsizeMode="tail">
                        마리모 친구들의 얼음성 탐험
                      </ContentTitle>
                      <ContentText>10회 플레이 </ContentText>
                      <ContentText>최고점 단어 : '양동이' </ContentText>
                    </ContentTexts>
                  </ContnetSubCntr>
                </ContentCntr>
                <Wrapper />
                <ContentCntr>
                  <ContentExp
                    style={{ textAlign: "right" }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {userNickname} (이)가 가장 많이 플레이한 게임은 '동물
                    친구들의 초성 게임' 이에요
                  </ContentExp>
                  <ContnetSubCntr>
                    <View style={{ width: "30%" }}>
                      <ChImage
                        style={{
                          borderRadius: 20,
                          width: 85,
                          height: 90,
                        }}
                        source={navTabIcons.ic_game1}
                      />
                    </View>
                    <ContentTexts style={{ width: "64%" }}>
                      <ContentTitle numberOfLines={1} ellipsizeMode="tail">
                        호두까기 인형
                      </ContentTitle>
                      <ContentText>15회 플레이 </ContentText>
                      <ContentText>최고점 단어 : '병정 인형' </ContentText>
                    </ContentTexts>
                  </ContnetSubCntr>
                </ContentCntr>
                <Wrapper isLast />
              </MainCntr>
            )}
          </RecordCntr>
        </Cntr>
      </Container>
    </ScrollView>
  );
};

export default LearnRecord;
const Info = styled.View`
  width: 65%;
`;
const ImgCntr = styled.View`
  width: 30%;
  align-items: center;
`;
const Wrapper = styled.View`
  height: ${(props) => (props.isLast ? "50px" : "20px")};
`;
const ContnetSubCntr = styled.View`
  width: 100%;
  height: 108px;
  background: #fbf8ff;
  box-shadow: 0px 5px 8px rgba(62, 31, 251, 0.25);
  border-radius: 23;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 0px 8px;
  elevation: 25;
`;
const ContnetWordCntr = styled.View`
  width: 100%;
  height: 72px;
  background: #fbf8ff;
  box-shadow: 0px 5px 8px rgba(62, 31, 251, 0.25);
  border-radius: 20;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 0px 20px;
  elevation: 25;
`;
const MainCntr = styled.View`
  width: 100%;
  background-color: ${(props) => (props.isResult ? "#EDE7F5" : "#ba8df2")};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20;
`;
const ContentCntr = styled.View`
  width: 100%;
  height: 200px;
  padding: 30px 25px;
`;
const ChartCntr = styled.View`
  width: 100%;
  padding: 30px 25px;
`;
const ProgressCntr = styled.View`
  width: 100%;
  padding: 30px 0px;
  justify-content: center;
  align-items: center;
`;
const ContentTexts = styled.View`
  width: 80%;
  padding-horizontal: 3.5%;
`;
const GradeText = styled.Text`
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.3px;

  color: #000000;
`;

const UserName = styled.Text`
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 8px;
  color: #000000;
`;

const UserRegister = styled.Text`
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height */
  color: #9b979d;
`;

const ContentText = styled.Text`
  width: 100%;
  font-family: Noto Sans CJK KR;
  font-weight: ${(props) => (props.isTitle ? "700" : "400")};
  margin-bottom: ${(props) => (props.isTitle ? 15 : 0)};
  font-size: 14px;
  line-height: 21px;
  color: #434141;
`;
const ContentDiffWord = styled.Text`
  font-family: Noto Sans CJK KR;
  font-weight: bold;
  margin-bottom: 3;
  font-size: 20px;
  line-height: 25px;
  color: #000000;
`;

const ContentTitle = styled.Text`
  width: 100%;
  font-family: Noto Sans CJK KR;
  margin-bottom: 15;
  font-weight: bold;
  font-size: 15px;
  line-height: 24px;
  color: #000000;
  overflow: hidden;
`;

const ResultText = styled.Text`
  font-family: Noto Sans CJK KR;
  font-weight: ${(props) => (props.isSmall ? "400" : "bold")};
  font-size: ${(props) =>
    props.isSmall ? "14px" : props.isMiddle ? "20px" : "24px"};
  line-height: ${(props) => (props.isSmall ? "20.7px" : "30px")};
  text-align: ${(props) => (props.isMiddle ? "left" : "center")};
`;

const ContentExp = styled.Text`
  width: 100%;
  color: #f2f2f2;
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.5px;
  margin-bottom: 20px;
`;
const BasicCntr = styled.View`
  width: 100%;
  height: 150px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
const RecordCntr = styled.View`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChImage = styled(Image)`
  width: 90px;
`;
const ImageCntr = styled.TouchableOpacity`
  border-color: #b16cf7;
  width: 128;
  height: 128;
  border-radius: 63;
  border-width: ${(props) => (props.isActive ? 4 : 0)};
`;
const GoodsList = styled.View``;

const GoodsCntr = styled.View``;

const BtnCntr = styled.View`
  margin-top: 20px;
`;
const Btn = styled.TouchableOpacity`
  background-color: #b16cf6;
  color: white;
  width: 343px;
  height: 56px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  letter-spacing: -0.408px;
`;

const Cntr = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const BackCntr = styled.TouchableOpacity`
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
`;

const BackIcon = styled.Text`
  width: 120px;
  font-size: 18px;
`;
const Container = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
`;

const IntroText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-top: 30px;
  line-height: 40px;
`;
const AppName = styled.Text`
  font-size: 22px;
  color: #f66c6c;
`;

const CharacterName = styled.Text`
font-size: 16px;
line-height: 23.5
color: #191919;
margin-top: 10;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_header: {
    flexDirection: "row",
    height: 50,
    marginTop: 25,
  },
  container_headerIcon: {
    width: 55,
    paddingLeft: 14,
    justifyContent: "center",
  },
  container_headerText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: COLORS.darkGray,
    ...FONTS.h3,
  },
  container_img: {
    flexDirection: "column",
    marginVertical: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SIZES.padding,
  },
  container_imgShadow: {
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: 250,
    height: 150,
    borderRadius: 35,
    borderColor: COLORS.purple,
    borderWidth: 2,
  },
  description: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: "700",
  },
  container_button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: SIZES.padding,
  },
});
