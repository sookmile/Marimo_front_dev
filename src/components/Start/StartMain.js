import React, { useEffect } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Styled from "styled-components/native";
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import axios from "axios";
// post 성공시 User id 저장
import AsyncStorage from '@react-native-async-storage/async-storage';
// user id로 캐릭터, userName get 한 후에, asyncStorage에 저장

const iosKeys = {
  kConsumerKey: "VC5CPfjRigclJV_TFACU",
  kConsumerSecret: "f7tLFw0AHn",
  kServiceAppName: "테스트앱(iOS)",
  kServiceAppUrlScheme: "testapp", // only for iOS
};

const androidKeys = {
  kConsumerKey: "dBTCaf__PhKbM6UieQby",
  kConsumerSecret: "zkTe9EErPl",
  kServiceAppName: "테스트앱(안드로이드)",
};

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

// post user info
const postUserInfo = async (body) => {
  console.log(body);
  try {
    const { data } = await axios({
      url: "http://222.232.92.123:8080/marimo/login",
      method: "post",
      data: body,
    });
    console.log("post 성공");
    console.log("[SUCCESS] POST USER INFO", data);
    return data;
  } catch (e) {
    console.log("[FAIL] POST USER INFO", e);
    return e;
  }
};

const StartMain = ({ navigation }) => {
  const [naverToken, setNaverToken] = React.useState(null);

  const naverLogin = (props) => {
    NaverLogin.login(props, (err, token) => {
      console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
      setNaverToken(token);
      if (err) {
        return err;
      }
      console.log("pass token");
      return token;
    });
  };
  useEffect(() => {
    naverToken !== null && getUserProfile();
  }, [naverToken]);
  const Login = async (props) => {
    console.log(2);
    await naverLogin(props);
  };
  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken("");
  };

  const getUserProfile = async () => {
    const profileResult = await getProfile(naverToken.accessToken);
    if (profileResult.resultcode === "024") {
      Alert.alert("로그인 실패", profileResult.message);
      return;
    } else {
      const userName = profileResult.response.name.replace(" ", "");
      const userEmail = profileResult.response.email;
      console.log(userName);
      console.log(userEmail);
      console.log(userName.length);
      const id = await postUserInfo({
        username: userName,
        email: userEmail,
      });
      console.log("성공했나요?");
      console.log(id);
      console.log("profileResult", profileResult);
      navigation.navigate("Character", { name: userName });
    }
  };

  const { width, height } = Dimensions.get("window");
  let topMargin = height * 0.03;
  let bottomMargin = 0;
  let displayHeight = 0;

  const initials2 =
    Platform.OS === "ios"
      ? (displayHeight = height - 30)
      : (displayHeight = height);

  const style = StyleSheet.create({
    view: {
      width: width,
      height: height,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={style.view}>
      <Cntr>
        <LogoCntr
          margin={topMargin}
          bottom={bottomMargin}
          width={displayHeight * 0.8}
        >
          <MainLogo
            width={height * 0}
            source={require("../../assets/icons/MainLogo.png")}
          />
          <AppName margin={topMargin}>마리모</AppName>
          <DtText margin={topMargin}>신나는 말의 세계로 출발해보자!</DtText>
          <BtnCntr>
            <Btn onPress={() => Login(initials)}>
              <BtnText>시작하기</BtnText>
            </Btn>
            <Btn
              style={{ marginTop: height * 0.025 }}
              onPress={async () => {
                navigation.navigate("Login", {
                  name: "우진",
                });
              }}
            >
              <BtnText>이어하기</BtnText>
            </Btn>
          </BtnCntr>
        </LogoCntr>
      </Cntr>
    </View>
  );
};
const MainLogo = Styled.Image`
    height: 132px;
    width: 132px;
`;
const LogoCntr = Styled.View`
    align-items:center;
    justify-content:center;
    height: ${(props) => props.width};
`;
const BtnCntr = Styled.View`
    margin-top:20px;
`;
const AppName = Styled.Text`
    margin-top:${(props) => props.margin};
    margin-bottom:${(props) => props.margin};
    position:relative;
    top:0;
    color: #F66C6C;
    font-weight: bold;
    font-size: 52px;
    line-height: 61px;
`;
const DtText = Styled.Text`
    margin-top:${(props) => props.margin};
    margin-bottom:${(props) => props.margin * 2};
    color: #191919;
    font-size: 18px;
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
const ContinueBtn = Styled.TouchableOpacity`

  background-color: #B16CF6;
  color: white;
  width: 343px;
  height: 56px;
  border-radius: 14px;
  align-items:center;
  justify-content:center;

`;

const Cntr = Styled.View`
width:100%;
align-items:center;
justify-content:center;
`;

const BtnText = Styled.Text`
  color:white;
  font-size: 18px;
  letter-spacing: -0.408px;
`;
export default StartMain;
