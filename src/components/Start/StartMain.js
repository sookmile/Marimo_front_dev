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
import {
  widthPercentageToDP as wp,
  HeightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
// post 성공시 User id 저장
import AsyncStorage from "@react-native-async-storage/async-storage";
import preURL from "../../preURL/preURL";
import Orientation from "react-native-orientation";
import { images } from "../../constants";

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
    const token = await JSON.parse(AsyncStorage.getItem("token"));
    console.log(token);
    token !== null && setNaverToken(token);
  }, []);
  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(onOrientaionChange);
    return () => {
      Orientation.unlockAllOrientations(),
        Orientation.removeOrientationListener(onOrientaionChange);
    };
  });
  const onOrientaionChange = (orientation) => {
    if (orientation === "PORTRAIT") {
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
    console.log(body);
    await axios
      .post(preURL.preURL + "/marimo/login", body)
      .then(async (res) => {
        const response = res.data.id;
        await setUserId(response);
      })
      .catch((err) => {
        console.log("에러 발생 ");
        console.log(err);
      });

    if (userId !== -1) {
      await setLogin();
    }
  };

  const setLogin = async () => {
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
      Alert.alert("환영합니다.");
      navigation.navigate("NavTab");
    } else {
      Alert.alert(
        "사용자 정보가 없습니다.\n시작하기 버튼을 눌러 가입을 해주세요."
      );
    }
  };

  const getUserProfile = async () => {
    const profileResult = await getProfile(naverToken.accessToken);
    console.log("porfile", profileResult);
    if (profileResult.resultcode === "024") {
      Alert.alert("로그인 실패", profileResult.message);
      return;
    } else {
      const id = await postUserInfo({
        username: profileResult.response.name,
        identifier: profileResult.response.id,
      });
      console.log("로그인 성공");
      console.log("id", id);
      console.log("naverToken", naverToken);
      Alert.alert(`${profileResult.response.name}님 환영합니다`);
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
                height: "50%",

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MainLogo
                resizeMode="contain"
                source={require("../../assets/icons/MainLogo.png")}
              />
              <AppName margin={topMargin}>마리모</AppName>
              <DtText margin={topMargin}>신나는 말의 세계로 출발해보자!</DtText>
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
    height: 170;
    width: 170;
`;
const LogoCntr = Styled.View`
    align-items:center;
    justify-content:center;
    width:100%;
    height: ${(props) => props.width};
`;
const BtnCntr = Styled.View`
    width:100%;
    height:50%;
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
    font-size: 52px;
    font-family: "Cafe24Ssurround"
    line-height: 61px;
`;
const DtText = Styled.Text`
  height:10%;
  width:100%;
  text-align:center;
  color: #191919;
    font-size: 18px;
    font-family: "Cafe24Ssurround"
`;
const Btn = Styled.TouchableOpacity`
  background-color: #B16CF6;
  color: white;
  width: 88%;
  height: 60;
  border-radius: 14px;
  align-items:center;
  justify-content:center;
`;
const Btn2 = Styled.TouchableOpacity`
  background-color: #03C75A;
  color: white;
  width: 88%;
  height: 60;
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
