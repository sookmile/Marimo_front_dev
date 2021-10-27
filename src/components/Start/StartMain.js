import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Alert,
} from "react-native";
import Styled from "styled-components/native";
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import axios from "axios";
// post 성공시 User id 저장
import AsyncStorage from "@react-native-async-storage/async-storage";
import preURL from "../../preURL/preURL";
import Orientation from "react-native-orientation";
import { images } from "../../constants";
import { fontPercentage } from "../../constants/responsive";

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
  const [refresh, setRefresh] = useState(false);

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

  useEffect(async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    setNaverToken(token);
  }, []);

  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(onOrientationDidChange);
    return () => {
      Orientation.unlockAllOrientations(),
        Orientation.removeOrientationListener(onOrientationDidChange);
    };
  }, []);

  const onOrientationDidChange = (orientation) => {
    if (orientation === "LANDSCAPE") {
      Orientation.lockToPortrait();
    }
  };

  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken("");
  };

  useEffect(() => {
    AsyncStorage.getItem("naverToekn");
  });

  useEffect(() => {
    console.log("naverToken", naverToken);
    if (naverToken !== null && AsyncStorage.getItem("isLogin") !== "true") {
      getUserProfile();
    }
  }, [naverToken]);

  const Login = async (props) => {
    await naverLogin(props);
  };

  const postUserInfo = async (body) => {
    let response = -1;
    console.log(body);
    await axios
      .post(preURL.preURL + "/marimo/login", body)
      .then(async (res) => {
        response = res.data.id;
        await setUserId(response);
        if (response !== -1) {
          await setLogin(response);
          console.log("return");
        }
      })
      .catch((err) => {
        console.log("에러 발생 ");
        console.log(err);
      });
    return response;
  };

  const setLogin = async (userId) => {
    console.log("setLogin");
    console.log(naverToken);
    console.log(userId);
    AsyncStorage.removeItem("userId");
    await AsyncStorage.setItem("isLogin", "true");
    await AsyncStorage.setItem("token", JSON.stringify(naverToken));
    await AsyncStorage.setItem("userId", JSON.stringify(userId));
  };

  const hanldeContinue = async () => {
    const isLogin = await AsyncStorage.getItem("isLogin");
    //Alert.alert("환영합니다.");
    //navigation.navigate("NavTab");
    if (isLogin === "true") {
      Alert.alert("마리모", " 말의 세계, 마리모로 오신 것을 환영합니다.");
      navigation.navigate("NavTab");
    } else {
      Alert.alert("마리모", "사용자 정보가 없습니다.");
    }
  };

  const getUserProfile = async () => {
    const profileResult = await getProfile(naverToken.accessToken);
    console.log("porfile", profileResult);
    if (profileResult.resultcode === "024") {
      return;
    } else {
      const id = await postUserInfo({
        username: profileResult.response.name,
        identifier: profileResult.response.id,
      });
      console.log("로그인 성공");
      console.log("id", id);
      console.log("naverToken", naverToken);
      AsyncStorage.setItem("realName", profileResult.response.name);
      Alert.alert("마리모", `${profileResult.response.name}님 환영합니다`);
      navigation.navigate("Login", { name: profileResult.response.name });
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
      backgroundColor: "#FFFBF8",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={style.view}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={"transparent"}
        translucent={true}
      />
      <ImageBackground
        source={images.mainBackground}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <Cntr>
          <LogoCntr
            margin={topMargin}
            bottom={bottomMargin}
            width={displayHeight * 0.9}
          >
            <View
              style={{
                width: "100%",
                height: "60%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <MainLogo
                resizeMode="contain"
                source={require("../../assets/icons/MainLogo.png")}
              />
              <AppName
                margin={topMargin}
                style={{ fontSize: fontPercentage(48), marginBottom: "5%" }}
              >
                마리모
              </AppName>
              <DtText
                margin={topMargin}
                style={{ fontSize: fontPercentage(18) }}
              >
                신나는 말의 세계로 출발해보자!
              </DtText>
            </View>
            <BtnCntr>
              <Btn2 onPress={() => Login(initials)}>
                <NIMg
                  source={require("../../assets/icons/Home/naverLogin.png")}
                />
              </Btn2>

              <Btn
                style={{ marginTop: height * 0.025 }}
                onPress={() => hanldeContinue()}
              >
                <BtnText>이어하기</BtnText>
              </Btn>
            </BtnCntr>
          </LogoCntr>
        </Cntr>
      </ImageBackground>
    </View>
  );
};
const MainLogo = Styled.Image`
    height: 150;
    width: 150;
`;
const LogoCntr = Styled.View`
    align-items:center;
    justify-content:center;
    width:100%;
    height: ${(props) => props.width};
`;
const BtnCntr = Styled.View`
    width:100%;
    height:40%;
    justify-content:center;
    align-items:center;
`;
const AppName = Styled.Text`
  width:100%;
  text-align:center;
    height:20%;
    position:relative;
    top:0;
    color: #F66C6C;
    font-family: "Cafe24Ssurround"
`;
const DtText = Styled.Text`
  height:10%;
  width:100%;
  text-align:center;
  color: #191919;
  font-family: "Cafe24Ssurround"
`;
const Btn = Styled.TouchableOpacity`
  background-color: #B16CF6;
  color: white;
  width: 88%;
  height: 55;
  border-radius: 14px;
  align-items:center;
  justify-content:center;
`;
const Btn2 = Styled.TouchableOpacity`
  background-color: #03C75A;
  color: white;
  width: 88%;
  height: 55;
  border-radius: 14px;
  align-items:center;
  justify-content:center;
`;
const NIMg = Styled.Image`
  width: 70%;
  height: 90%;
  border-radius: 14px;
  align-items:center;
  justify-content:center;
`;

const Cntr = Styled.View`
width:100%;
height:100%;
align-items:center;
justify-content:flex-end;
`;

const BtnText = Styled.Text`
  color:white;
  font-size: 18px;
  letter-spacing: -0.408px;

`;
export default StartMain;
