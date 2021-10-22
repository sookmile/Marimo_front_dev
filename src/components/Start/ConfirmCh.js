import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Image,
  View,
  Dimensions,
  Settings,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import preURL from "../../preURL/preURL";
import { bigCharacter } from "../../assets/icons/Character/bigCharacter";
import Icon2 from "react-native-vector-icons/Ionicons";
import { fontPercentage } from "../../constants/responsive";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
/* 캐릭터 선택 페이지 */
const ConfirmCh = ({ route, navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { name, characterNum } = route.params;

  useEffect(async () => {
    console.log("캐릭터 번호");
    console.log(name);
    console.log(characterNum);
    await AsyncStorage.setItem("characterNum", characterNum.toString());
  }, []);

  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 70) : (cntrMargin = 20);

  // post character
  const postCharacter = async (body) => {
    console.log(body);
    await axios
      .post(preURL.preURL + "/marimo/character", body)
      .then(async (res) => {
        const response = res.data;
        console.log(response);
        console.log("설명", response);
      })
      .catch((err) => {
        console.log("에러  발생 ");
        console.log(err);
      });
  };
  // ios top margin
  let chMargin = 0;
  Platform.OS === "ios" ? (chMargin = 60) : (chMargin = 40);

  return (
    <View style={{ display: "flex", flex: 1, backgroundColor: "#FFFBF8" }}>
      <Container style={{ marginTop: cntrMargin }}>
        <BackCntr onPress={() => navigation.navigate("Login")}>
          <Icon2
            name="chevron-back"
            style={{ marginRight: 10 }}
            size={23}
            color={"#555555"}
          ></Icon2>
        </BackCntr>
        <View
          style={{
            width: "100%",
            height: "15%",
          }}
        >
          <IntroText style={{ fontSize: fontPercentage(22) }}>
            {bigCharacter[characterNum].label}와 모험을 떠날 준비가 되었니?
            {/*<AppName>송이</AppName>야!{"\n"}너와 함께 모험을 떠날
        친구를 골라봐!*/}
          </IntroText>
        </View>
        <Cntr>
          <View
            style={{
              width: "100%",
              height: "75%",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: "65%", height: "55%" ,marginTop:'5%'}}
              resizeMode="contain"
              source={bigCharacter[characterNum].src}
            />
            <Box>
              <BoxText
                style={{ fontSize: fontPercentage(16), textAlign: "center" }}
              >
                "{name}아 안녕, 나는 {bigCharacter[characterNum].label}야!
                {"\n"}우리 함께 재밌는 모험을 떠나자!"
              </BoxText>
            </Box>
          </View>
          <View
            style={{
              width: "100%",
              height: "25%",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <BtnCntr>
              <Btn
                onPress={async () => {
                  const userId = await AsyncStorage.getItem("userId");
                  console.log(userId);
                  const postData = {
                    userId: userId === null ? 3 : userId,
                    character: characterNum,
                  };
                  console.log(postData);
                  await postCharacter(postData);
                  await AsyncStorage.setItem("userNickname", name);
                  navigation.navigate("NavTab");
                }}
              >
                <BtnText>네! 준비됐어요!</BtnText>
              </Btn>
            </BtnCntr>
          </View>
        </Cntr>
      </Container>
    </View>
  );
};

export default ConfirmCh;

const GoodsList = styled.View``;

const GoodsCntr = styled.View``;

const BtnCntr = styled.View`
  width: 92%;
  align-items: center;
  justify-content: center;
`;
const Btn = styled.TouchableOpacity`
  background-color: #b16cf6;
  color: white;
  width: 100%;
  height: 56px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  letter-spacing: -0.408px;
`;

const Cntr = styled.View`
  width: 100%;
  height: 79%;
  align-items: center;
  justify-content: center;
`;
const BackCntr = styled.TouchableOpacity`
  width: 100%;
  height: 6%;
  text-align: left;
  align-items: flex-end;
  display: flex;
  flex-direction: row;
`;
const BackIcon = styled.Text`
  width: 25%;
  font-size: 18px;
`;
const Container = styled.View`
  flex: 1;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 1%;
`;
const IntroText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-top: 2%;
  line-height: 40px;
`;
const AppName = styled.Text`
  font-size: 22px;
  color: #f66c6c;
`;

const Box = styled.View`
  width: 80%;
  height: 20%;
  margin-top: 3%;
  background-color: #ededed;
  elevation: 10;
  border-radius: 20;
  justify-content: center;
`;

const BoxText = styled.Text`
  font-size: 17px;
  text-align: center;
  padding: 10px;
  line-height: 28px;
`;
