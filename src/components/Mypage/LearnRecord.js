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
import Orientation from "react-native-orientation";

import {
  BarChart,
  XAxis,
  Grid,
  LineChart,
  YAxis,
} from "react-native-svg-charts";
import * as scale from "d3-scale";
import { FONTS, COLORS, SIZES, icons, navTabIcons } from "../../constants";
import styled from "styled-components";
import { character } from "../../assets/icons/Character/Character";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/Ionicons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";
// post 성공시 User id 저장
import AsyncStorage from "@react-native-async-storage/async-storage";
import preURL from "../../preURL/preURL";
import Tts from "react-native-tts";

const LearnRecord = ({ navigation, route }) => {
  // toggle section
  const [getSelectionMode, setSelectionMode] = useState(1);
  // achivement
  const [grade, setGrade] = useState(0);
  // difficult word
  const [diffWord, setDiffWord] = useState([]);

  const [userId, setUserID] = useState(-1);
  const [chrImage, setChrImage] = useState("");
  const [recordInfo, setRecordInfo] = useState([]);
  const [goodWord, setGoodWord] = useState([]);
  const [userNickname, setUserNickName] = useState("");

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
    const chrNum = await AsyncStorage.getItem("characterNum");
    const nickname = await AsyncStorage.getItem("userNickname");

    console.log(id);
    console.log(chrNum);
    console.log(nickname);
    await setChrImage(character[chrNum].src);
    await setUserNickName(nickname);
    await setUserID(Number(id));

    await getRecord(id);
  }, []);

  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(onOrientaionChange);
    return () => {
      Orientation.unlockAllOrientations(),
        Orientation.removeOrientationListener(onOrientaionChange);
    };
  }, []);
  const onOrientaionChange = (orientation) => {
    if (orientation === "LANDSCAPE-RIGHT") {
      console.log(orientation);
      Orientation.lockToLandscapeLeft();
    }
  };

  const setData = (response) => {
    if (response.length !== 0) {
      console.log(response);
      const getEntries = response.mostSuccessWord.map((obj) => {
        return { label: obj.word, value: Number(obj.count) };
      });

      setGoodWord([...getEntries]);
      console.log(getEntries);
      const failWord = response.mostFailWord.map((obj) => {
        console.log(obj);
        return { label: obj.count, value: obj.word };
      });
      console.log("실패");
      console.log(failWord);
      setDiffWord(failWord);
      setGrade(response.achievementRate);
    }
  };

  const getRecord = async (id) => {
    console.log(id);
    await axios
      .post(preURL.preURL + "/marimo/user/record", {
        userId: id,
      })
      .then(async (res) => {
        const response = res.data;
        console.log(res.data);
        console.log("data");
        await setRecordInfo(response);
        setData(response);
      })
      .catch((err) => {
        console.log(id);
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
        <BackCntr></BackCntr>
        <Cntr>
          <Text
            style={{
              fontFamily: "NanumSquareRoundB",
              lineHeight: 25,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            나의 기록들
          </Text>
          <BasicCntr>
            <ImgCntr>
              <ChImage
                resizeMode="contain"
                style={{ width: "90%", height: "90%" }}
                source={chrImage}
              />
            </ImgCntr>
            <Info>
              <UserName>{userNickname}</UserName>
              <UserRegister>가입일자: {recordInfo?.registerDate}</UserRegister>
              <ProgressBar
                style={{
                  width: "90%",
                  marginTop: 15,
                  height: 10,
                  borderRadius: 5,
                }}
                progress={grade * 0.01}
                color={"#A49CFA"}
              />
            </Info>
          </BasicCntr>
          <RecordCntr>
            <Text
              style={{
                fontFamily: "NanumSquareRoundB",
                lineHeight: 24,
                fontSize: 20,
                fontWeight: "700",
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
                  <ResultText style={{ fontFamily: "NanumSquareRoundB" }}>
                    {userNickname} 의 전반적 성취도
                  </ResultText>
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
                  {recordInfo?.analysis !== "" ? (
                    <ResultText isSmall>
                      {userNickname} 은(는)
                      {recordInfo?.analysis}
                    </ResultText>
                  ) : (
                    <ResultText isSmall style={{ color: "#555555" }}>
                      분석결과 생성을 위해 학습에 참여해주세요.
                    </ResultText>
                  )}
                  <Wrapper style={{ height: 35 }} />
                  <ResultText isMiddle style={{ marginBottom: 5 }}>
                    {userNickname} (이)가 잘 발음하는 단어
                  </ResultText>
                  {goodWord.length > 0 ? (
                    <View style={{ height: 210, padding: 20 }}>
                      <BarChart
                        style={{ flex: 1 }}
                        data={goodWord.map((obj) => obj.value)}
                        gridMin={0}
                        svg={{ fill: "rgb(134, 65, 244)" }}
                      >
                        <Grid />
                      </BarChart>
                      <XAxis
                        style={{ marginTop: 10 }}
                        data={goodWord}
                        scale={scale.scaleBand}
                        formatLabel={(value, index) => goodWord[index].label}
                        contentInset={{ left: 0 }}
                        svg={{ fontSize: 13, fill: "black" }}
                      />
                      <XAxis
                        style={{ marginTop: 10 }}
                        data={goodWord}
                        scale={scale.scaleBand}
                        formatLabel={(value, index) =>
                          `${goodWord[index].value}회`
                        }
                        contentInset={{ left: 0 }}
                        svg={{ fontSize: 13, fill: "black" }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Wrapper />
                      <ResultText isSmall style={{ color: "#555555" }}>
                        분석결과 생성을 위해 학습에 참여해주세요.
                      </ResultText>
                    </View>
                  )}

                  <Wrapper style={{ height: 35 }} />
                  <ResultText isMiddle>
                    {userNickname} (이)가 잘 발음하지 못하는 단어
                  </ResultText>
                  {diffWord.length > 0 ? (
                    diffWord.map((obj) => (
                      <>
                        <Wrapper />
                        <ContnetWordCntr>
                          <ContentTexts>
                            <ContentDiffWord
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {obj?.value}
                            </ContentDiffWord>
                            <ContentText
                              style={{ width: "100%", fontSize: 13 }}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {obj?.label === "TALE"
                                ? "동화- 호랑이의 생일잔치"
                                : "게임-마리모와 함께하는 모음학습"}
                            </ContentText>
                          </ContentTexts>
                          <TouchableOpacity
                            onPress={() => _onPressSpeech(obj.value)}
                          >
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
                    ))
                  ) : (
                    <>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        <Wrapper />
                        <ResultText isSmall style={{ color: "#555555" }}>
                          분석결과 생성을 위해 학습에 참여해주세요.
                        </ResultText>
                      </View>
                    </>
                  )}
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
                    {userNickname} (이)가 가장 많이 플레이한 동화는 '호랑이의
                    생일잔치' 이에요
                  </ContentExp>

                  <ContnetSubCntr>
                    <View style={{ width: "30%" }}>
                      <ChImage
                        style={{
                          borderRadius: 20,
                          width: 85,
                          height: 90,
                        }}
                        source={require("../../assets/images/story/Story1Page1.png")}
                      />
                    </View>
                    <ContentTexts style={{ width: "64%" }}>
                      <ContentTitle numberOfLines={1} ellipsizeMode="tail">
                        호랑이의 생일잔치
                      </ContentTitle>
                      <ContentText>
                        {recordInfo?.talePlayCount !== 0
                          ? `${recordInfo?.talePlayCount}회 플레이`
                          : "미참여"}{" "}
                      </ContentText>
                      <ContentText>
                        최고점 단어 :{" "}
                        {recordInfo?.taleBestWord !== ""
                          ? `'${recordInfo?.taleBestWord}'`
                          : "기록 없음"}
                      </ContentText>
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
                    {userNickname} (이)가 가장 많이 플레이한 게임은 ' 냠냠
                    맛있는 모음게임' 이에요
                  </ContentExp>
                  <ContnetSubCntr>
                    <View style={{ width: "30%" }}>
                      <ChImage
                        style={{
                          borderRadius: 20,
                          width: 85,
                          height: 90,
                        }}
                        source={navTabIcons.cv_game}
                      />
                    </View>
                    <ContentTexts style={{ width: "64%" }}>
                      <ContentTitle numberOfLines={1} ellipsizeMode="tail">
                        냠냠 맛있는 모음게임
                      </ContentTitle>
                      <ContentText>
                        <ContentText>
                          {recordInfo?.gamePlayCount !== 0
                            ? `${recordInfo?.gamePlayCount}회 플레이`
                            : "미참여"}
                        </ContentText>
                      </ContentText>
                      <ContentText>
                        최고점 단어 :
                        {recordInfo?.gameBestWord !== ""
                          ? ` '${recordInfo?.gameBestWord}'`
                          : "기록 없음"}
                      </ContentText>
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
  width: 60%;
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
font-family: NotoSansCJKkr-Regular;
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
  font-family: NotoSansCJKkr-Regular;
  font-weight: ${(props) => (props.isTitle ? "700" : "400")};
  margin-bottom: ${(props) => (props.isTitle ? 15 : 0)};
  font-size: 14px;
  line-height: 21px;
  color: #434141;
`;
const ContentDiffWord = styled.Text`
font-family: NotoSansCJKkr-Regular;
font-weight: bold;
  margin-bottom: 3;
  font-size: 20px;
  line-height: 25px;
  color: #000000;
`;

const ContentTitle = styled.Text`
  width: 100%;
  font-family: NotoSansCJKkr-Regular;
  margin-bottom: 15;
  font-weight: bold;
  font-size: 15px;
  line-height: 24px;
  color: #000000;
  overflow: hidden;
`;

const ResultText = styled.Text`
  font-family: NotoSansCJKkr-Regular;
  font-weight: ${(props) => (props.isSmall ? "400" : "bold")};
  font-size: ${(props) =>
    props.isSmall ? "14px" : props.isMiddle ? "20px" : "24px"};
  line-height: ${(props) => (props.isSmall ? "20.7px" : "30px")};
  text-align: ${(props) => (props.isMiddle ? "left" : "center")};
`;

const ContentExp = styled.Text`
  width: 100%;
  color: #f2f2f2;
  font-family: NotoSansCJKkr-Regular;
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

const Container = styled.View`
  flex: 1;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 1%;
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
