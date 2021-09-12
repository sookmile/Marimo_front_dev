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
const StartMain = ({ navigation }) => {
  const [naverToken, setNaverToken] = React.useState(null);

  const naverLogin = (props) => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };
  useEffect(() => {
    naverToken !== null && getUserProfile();
  }, [naverToken]);
  const Login = async (props) => {
    console.log(2);
    const id = await naverLogin(props);
    console.log(id);
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
    }
    console.log("profileResult", profileResult);
    navigation.navigate("Login");
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
              onPress={() => navigation.navigate("Login")}
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
