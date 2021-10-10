import React, { useEffect, useState } from "react";
import {
  Button,
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
import preURL from "../preURL/preURL";

import Icon from "react-native-vector-icons/Ionicons";
import { ProgressBar, Colors, ActivityIndicator } from "react-native-paper";
import { character } from "../assets/icons/Character/Character";
function SettingScreen({ navigation }) {
  const [userId, setUserID] = useState(-1);
  const [recordInfo, setRecordInfo] = useState([]);
  const [chrImage, setChrImage] = useState("");
  const [userNickname, setUserNickName] = useState("");
  const { width, height } = Dimensions.get("window");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alarm, setAlarm] = useState(true);
  const alarmToggleSwitch = () => setAlarm((previousState) => !previousState);

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
        setData(response);
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
          <SettingText height={height}>설정</SettingText>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
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
              <Contents height={height}>
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
              </Contents>
              <Contents height={height}>
                <InfoText>다크 모드</InfoText>
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
              </Contents>
            </Cntr>
            <Cntr
              style={{
                borderBottomWidth: 0,
                height: "40%",
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
                    style={{ width: 75, height: 75 }}
                    source={chrImage}
                  />
                </ImgCntr>
                <Info>
                  <UserName>{userNickname}</UserName>
                  <UserRegister>
                    가입일자: {recordInfo?.registerDate}
                  </UserRegister>
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
    height: "40%",
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
  font-weight: bold;
  border-bottom-width: 1;
  padding-bottom: 10;
  border-bottom-color: #dedede;
`;
const Cntr = styled.View`
  display: flex;
  justify-content: center;
  border-bottom-width: 1;
  border-bottom-color: #dedede;
`;
const ContentText = styled.Text`
  font-size: 18;
  color: gray;
  margin-bottom: 12;
`;
const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  height: 11.5%;
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
  font-size: 18px;
  line-height: 25px;
  color: #454545;
`;

const Contents = styled.TouchableOpacity`
  height: ${(props) => props.height * 0.065};
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
  width: 100%;
  height: 150px;
  padding: 10px 20px;
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
