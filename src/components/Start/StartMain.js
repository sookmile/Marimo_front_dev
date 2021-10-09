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
  ImageBackground,
} from "react-native";
import Styled from "styled-components/native";
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
// post 성공시 User id 저장
import AsyncStorage from "@react-native-async-storage/async-storage";
import preURL from "../../preURL/preURL";
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
    console.log("token");
    console.log(naverToken);
  }, [naverToken]);

  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken("");
  };

  useEffect(() => {
    AsyncStorage.setItem("isLogin", "false");
    if (naverToken !== null && AsyncStorage.getItem("isLogin") !== "true") {
      getUserProfile();
    }
  }, [naverToken]);

  const Login = async (props) => {
    console.log(2);
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
    Alert.alert("환영합니다.");
    navigation.navigate("NavTab");
    /*if (isLogin === "true") {
      Alert.alert("환영합니다.");
      navigation.navigate("NavTab");
    } else {
      Alert.alert(
        "사용자 정보가 없습니다.\n시작하기 버튼을 눌러 가입을 해주세요."
      );
    }*/
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
      console.log(id);
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
      width: width,
      height: height,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={style.view}>
      <ImageBackground
        source={images.splashScreen}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
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
            <AppName margin={topMargin} style={{ fontSize: hp(5.5) }}>
              마리모
            </AppName>
            <DtText margin={topMargin} style={{ fontSize: hp(2.5) }}>
              신나는 말의 세계로 출발해보자!
            </DtText>
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
              {!!naverToken && (
                <Button title="로그아웃하기" onPress={naverLogout} />
              )}
            </BtnCntr>
          </LogoCntr>
        </Cntr>
      </ImageBackground>
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
    font-family: "Cafe24Ssurround"
    line-height: 61px;
`;
const DtText = Styled.Text`
    margin-top:${(props) => props.margin};
    margin-bottom:${(props) => props.margin * 2};
    color: #191919;
    font-family: "Cafe24Ssurround"
`;
const Btn = Styled.TouchableOpacity`
  background-color: #B16CF6;
  color: white;
  height: 56px;
  width: 343px;
  border-radius: 14px;
  align-items:center;
  justify-content:center;

`;
const Btn2 = Styled.TouchableOpacity`

  background-color: #03C75A;
  color: white;
  padding:10px;
  height: 56px;
  width: 343px;
  border-radius: 14px;
  align-items:center;
  justify-content:center;
`;
const NIMg = Styled.Image`
  background-color: #03C75A;
  color: white;
  width: 270px;
  height: 50px;
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
flex:1
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
