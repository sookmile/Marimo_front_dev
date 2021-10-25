import React, { useEffect, useState } from "react";
import {
  View,
  Switch,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import styled from "styled-components";
import axios from "axios";
import preURL from "../../preURL/preURL";

import Icon from "react-native-vector-icons/Ionicons";
import { character } from "../../assets/icons/Character/Character";
import Orientation from "react-native-orientation";

function SettingScreen({ navigation }) {
  const [userId, setUserID] = useState(-1);
  const [realName, setRealName] = useState("");
  const [recordInfo, setRecordInfo] = useState([]);
  const [chrImage, setChrImage] = useState("");
  const [userNickname, setUserNickName] = useState("");
  const { width, height } = Dimensions.get("window");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alarm, setAlarm] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const alarmToggleSwitch = () => setAlarm((previousState) => !previousState);
  const darkModeToggleSwitch = () =>
    setDarkMode((previousState) => !previousState);

  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(onOrientationDidChange);
    return () => {
      Orientation.unlockAllOrientations();
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  }, []);
  const onOrientationDidChange = (orientation) => {
    if (orientation === "LANDSCAPE") {
      Orientation.lockToPortrait();
    }
  };

  useEffect(async () => {
    const id = await AsyncStorage.getItem("userId");
    const chrNum = await AsyncStorage.getItem("characterNum");
    const nickname = await AsyncStorage.getItem("userNickname");
    const realname = await AsyncStorage.getItem("realName");
    console.log(id);
    console.log(chrNum);
    console.log(nickname);
    await setChrImage(character[chrNum].src);
    await setUserNickName(nickname);
    await setUserID(Number(id));
    await setRealName(realname);
    await getRecord(id);
  }, []);

  const getRecord = async (id) => {
    console.log(id);
    await axios
      .post(preURL.preURL + "/marimo/user/record", {
        userId: id,
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

  const resetAction = CommonActions.reset({
    index: 1,
    routes: [{ name: "StartMain" }],
  });
  const naverLogout = async () => {
    await NaverLogin.logout();
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("isLogin", "false");
    console.log("로그아웃");
    Alert.alert("로그아웃 되셨습니다");
    navigation.dispatch(resetAction);
    navigation.navigate("StartMain");
  };

  // 선택 버튼 1: 아침형, 2: 점심형, 3: 저녁형, 4: 새벽형
  const [selectItem, setSelect] = useState(null);
  function SettingChecked(item) {
    setSelect(item);
  }

  const getItemStyleTweaks = (key) => {
    let style;
    return {
      backgroundColor: getSelectedColor(key),
    };
  };

  const getSelectedColor = (key) => {
    let color = "#5E5E5E";
    if (key == selectItem) {
      color = "#4E5CF6";
    }
    return color;
  };

  function formatAMPM(date) {
    var hours = date.toString().slice(16, 18);
    var minutes = date.toString().slice(19, 21);
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 70) : (cntrMargin = 20);
  let chMargin = 0;
  Platform.OS === "ios" ? (chMargin = 40) : (chMargin = 0);
  return (
    <View style={{ display: "flex", flex: 1, backgroundColor: "#FFFBF8" }}>
      <View
        style={{
          display: "flex",
          flex: 1,
          marginTop: chMargin,
          marginBottom: chMargin,
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              height: "10%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SettingText height={height}>설정</SettingText>
          </View>
          <View
            style={{
              height: "88%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Cntr style={{ height: "52%" }}>
              <ContentText>기본 설정</ContentText>
              <Contents height={height - chMargin}>
                <InfoText>프리미엄 계정으로 변환</InfoText>
                <Icon
                  name="chevron-forward"
                  size={23}
                  color={"#555555"}
                  style={{ position: "absolute", right: 5, marginVertical: 10 }}
                ></Icon>
              </Contents>
              <Contents height={height}>
                <InfoText>음성 설정</InfoText>
                <Icon
                  name="chevron-forward"
                  size={23}
                  color={"#555555"}
                  style={{ position: "absolute", right: 5, marginVertical: 10 }}
                ></Icon>
              </Contents>
              <Contents height={height}>
                <InfoText>언어 설정</InfoText>
                <Icon
                  name="chevron-forward"
                  size={23}
                  color={"#555555"}
                  style={{ position: "absolute", right: 5, marginVertical: 10 }}
                ></Icon>
              </Contents>
              <ContentsView height={height}>
                <InfoText>Push 알림받기</InfoText>
                <Switch
                  trackColor={{ false: "#E5E5E5", true: "#4E5CF6" }}
                  thumbColor={alarm ? "white" : "#white"}
                  onValueChange={alarmToggleSwitch}
                  value={alarm}
                  style={{
                    position: "absolute",
                    right: 0,
                    marginVertical: 10,
                    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                  }}
                />
              </ContentsView>
              <ContentsView height={height} isLast>
                <InfoText>다크 모드</InfoText>
                <Switch
                  trackColor={{ false: "#E5E5E5", true: "#4E5CF6" }}
                  thumbColor={darkMode ? "white" : "#white"}
                  onValueChange={darkModeToggleSwitch}
                  value={darkMode}
                  style={{
                    position: "absolute",
                    right: 0,
                    marginVertical: 10,
                    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                  }}
                />
              </ContentsView>
            </Cntr>
            <Cntr
              style={{
                height: "40%",
                marginTop: "2%",
                justifyContent: "flex-start",
              }}
            >
              <ContentText>더 보기</ContentText>
              <Contents
                height={height}
                onPress={() => setIsModalOpen(!isModalOpen)}
              >
                <InfoText>사용자 정보</InfoText>
                <Icon
                  name="chevron-forward"
                  size={23}
                  color={"#555555"}
                  style={{ position: "absolute", right: 5, marginVertical: 10 }}
                ></Icon>
              </Contents>
              <Contents height={height} onPress={naverLogout}>
                <InfoText>로그아웃</InfoText>
                <Icon
                  name="chevron-forward"
                  size={23}
                  color={"#555555"}
                  style={{ position: "absolute", right: 5, marginVertical: 10 }}
                ></Icon>
              </Contents>
              <Contents height={height}>
                <InfoText>버전 정보</InfoText>
                <Icon
                  name="chevron-forward"
                  size={23}
                  color={"#555555"}
                  style={{ position: "absolute", right: 5, marginVertical: 10 }}
                ></Icon>
              </Contents>
              <Contents
                height={height}
                onPress={() => navigation.navigate("CreditPage")}
              >
                <InfoText>오픈 소스 라이브러리</InfoText>
                <Icon
                  name="chevron-forward"
                  size={23}
                  color={"#555555"}
                  style={{ position: "absolute", right: 5, marginVertical: 10 }}
                ></Icon>
              </Contents>
            </Cntr>
          </View>
          <VersionText isGray={true}>마리모 0.9.7</VersionText>
        </View>
      </View>
      {
        <Modal
          isVisible={isModalOpen}
          onBackdropPress={() => setIsModalOpen(false)}
        >
          <View style={styles.modal}>
            <Text
              style={{
                fontFamily: "NanumSquareRoundB",
                lineHeight: 25,
                fontSize: 22,
                marginBottom: "2%",
                fontWeight: "bold",
                color: "#454545",
              }}
            >
              사용자 정보
            </Text>
            <View>
              <BasicCntr>
                <ImgCntr>
                  <ChImage
                    resizeMode="contain"
                    style={{ width: "70%", height: "70%" }}
                    source={chrImage}
                  />
                </ImgCntr>
                <Info>
                  <UserName>사용자명 : {userNickname}</UserName>
                  <UserRegister>
                    가입일자:{recordInfo?.registerDate}
                  </UserRegister>
                </Info>
              </BasicCntr>
              <BasicCntr>
                <ImgCntr>
                  <ChImage
                    resizeMode="contain"
                    style={{ width: "60%", height: "60%" }}
                    source={require("../../assets/icons/Home/naverIcon.png")}
                  />
                </ImgCntr>
                <Info>
                  <UserName>네이버 계정 : {realName}</UserName>
                  <UserRegister>
                    가입일자:{recordInfo?.registerDate}
                  </UserRegister>
                </Info>
              </BasicCntr>
            </View>
            <CloseBtn onPress={() => setIsModalOpen(false)}>
              <CloseText>닫기</CloseText>
            </CloseBtn>
          </View>
        </Modal>
      }
    </View>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 20,
    height: "100%",
  },
  modal: {
    width: "100%",
    height: "47%",
    borderRadius: 10,
    paddingTop: "10%",
    backgroundColor: "white",
    alignItems: "center",
  },
});

const VersionText = styled.Text`
  z-index: 5;
  position: absolute;
  bottom: 10;
  left: 20;
  font-size: 14;
  color: #555555;
`;
const SettingText = styled.Text`
  font-size: 25;
  align-items: center;
  font-weight: bold;
`;
const Cntr = styled.View`
  display: flex;
  justify-content: center;
`;
const ContentText = styled.Text`
  font-size: 18;
  padding-top: 10;
  border-top-width: 1;
  border-top-color: #dedede;
  color: gray;
  margin-bottom: 12;
`;
const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  height: 14%;
  padding: 2%;
  width: 30%;
  border-radius: 5;
  align-items: center;
  justify-content: center;
  background-color: #a49cfa;
`;

const CloseText = styled.Text`
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 25px;
  color: #454545;
`;

const Contents = styled.TouchableOpacity`
  height: ${(props) => props.height * 0.065};
  margin-bottom: ${(props) => (props.isLast ? "0%" : "0%")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ContentsView = styled.View`
  height: ${(props) => props.height * 0.065};
  margin-bottom: ${(props) => (props.isLast ? "0%" : "0%")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const InfoText = styled.Text`
  font-size: 16;
  margin-vertical: 12;
  color: ${(props) => (props.isGray ? "#555555" : "#191919")};
`;

const BasicCntr = styled.View`
  width: 95%;
  height: 90px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
const Info = styled.View`
  width: 65%;
`;
const ImgCntr = styled.View`
  width: 30%;
  align-items: center;
`;

const ChImage = styled(Image)`
  width: 90px;
`;

const UserName = styled.Text`
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
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
