import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import preURL from "../../preURL/preURL";

// user id로 캐릭터, userName get 한 후에, asyncStorage에 저장

const iosKeys = {
  kConsumerKey: "dBTCaf__PhKbM6UieQby",
  kConsumerSecret: "zkTe9EErPl",
  kServiceAppName: "테스트앱(iOS)",
  kServiceAppUrlScheme: "marimologin",
};

const androidKeys = {
  kConsumerKey: "dBTCaf__PhKbM6UieQby",
  kConsumerSecret: "zkTe9EErPl",
  kServiceAppName: "테스트앱(안드로이드)",
};

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

// post user info

const StartMain = ({ navigation }) => {
  const [naverToken, setNaverToken] = React.useState(null);
  const [userId, setUserId] = useState(-1);

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
    if (naverToken !== null && AsyncStorage.getItem("isLogin") !== "true") {
      getUserProfile();
    }
  }, [naverToken]);
  
  const Login = async (props) => {
    console.log(2);
    await naverLogin(props);
  };
  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken("");
  };

  const postUserInfo = async (body) => {
    console.log(body);
    await axios
      .post(preURL.preURL + "/marimo/login", body)
      .then(async (res) => {
        console.log(res.data);
        const response = res.data.id;
        await setUserId(response);
        console.log("userId", response);
        console.log("성공");
      })
      .catch((err) => {
        console.log("에러 발생 ");
        console.log(err);
      });
    console.log(userId);
    console.log(userId !== -1);
    if (userId !== -1) {
      await setLogin();
    }
  };
  const setLogin = async () => {
    AsyncStorage.removeItem("userId");
    await AsyncStorage.setItem("isLogin", "true");

    console.log(JSON.stringify(userId));
    await AsyncStorage.setItem("userId", JSON.stringify(userId));
  };
  const hanldeContinue = async () => {
    const isLogin = await AsyncStorage.getItem("isLogin");
    if (isLogin === "true") {
      Alert.alert("환영합니다.");
      navigation.navigate("NavTab");
    } else {
      Alert.alert("환영합니다.");
      navigation.navigate("NavTab");
      /*Alert.alert(
        "사용자 정보가 없습니다.\n시작하기 버튼을 눌러 가입을 해주세요."
      );*/
    }
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
      navigation.navigate("Login", { name: userName });
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
              onPress={() => hanldeContinue()}
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
