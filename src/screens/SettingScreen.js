import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Switch,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import styled from "styled-components";
import { SIZES, COLORS, navTabIcons } from "../constants";
import { fontPercentage } from "../constants/responsive";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";

function SettingScreen({ navigation }) {
  const { width, height } = Dimensions.get("window");

  const [alarm, setAlarm] = useState(true);
  const alarmToggleSwitch = () => setAlarm((previousState) => !previousState);
  const [darkMode, setDarkMode] = useState(false);
  const darkToggleSwitch = () => setDarkMode((previousState) => !previousState);

  const resetAction = CommonActions.reset({
    index: 1,
    routes: [{ name: "StartMain" }],
  });
  const naverLogout = async () => {
    await NaverLogin.logout();
    await AsyncStorage.setItem("token", "");
    console.log("로그아웃");

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
              <Contents height={height}>
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
          <VersionText isGray={true}>마리모 2.0.3</VersionText>
        </View>
      </View>
    </View>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 20,
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
  padding-horizontal: 5;

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

const ItemBox = styled.TouchableOpacity`
  width: 97px;
  height: 105px;
  elevation: 1;
  border-width: 0.0125;
  margin-right: 10;
  background: ${(props) => props.background};
  border-radius: 20;
  border-color: ${(props) => props.background};
  align-items: center;
  align-content: center;
`;
const ItemText = styled.Text`
  color: ${(props) => props.color};
  text-align: center;
  padding-horizontal: 5;
  margin-top: 10;
  font-family: NanumSquareRoundB;
  font-size: 18;
  font-weight: bold;
`;

const ItemButton = styled.View`
  margin-right: ${(props) => (props.label !== "탐험" ? 15 : 0)};
  overflow: visible;
`;
const StudyTxt = styled.Text`
  font-family: NanumSquareRoundB;
  font-size: 22px;
  line-height: 28px;
  font-weight: bold;
  color: #191919;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 100;
`;
