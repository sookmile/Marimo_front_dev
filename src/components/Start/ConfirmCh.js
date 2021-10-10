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
          <BackIcon>뒤로 가기</BackIcon>
        </BackCntr>

        <IntroText>
          {bigCharacter[characterNum].label}와 모험을 떠날 준비가 되었니?
          {/*<AppName>송이</AppName>야!{"\n"}너와 함께 모험을 떠날
        친구를 골라봐!*/}
        </IntroText>
        <Cntr>
          <View
            style={{
              width: "105%",
              alignItems: "center",
              marginTop: chMargin,
            }}
          >
            <Image
              style={{ width: 225, height: 225 }}
              source={bigCharacter[characterNum].src}
            />
            <Box>
              <BoxText>
                "{name}아 안녕, 나는 {bigCharacter[characterNum].label}야!
                {"\n"}우리 함께 재밌는 모험을 떠나자!"
              </BoxText>
            </Box>
          </View>
          <BtnCntr style={{ marginTop: 1.2 * chMargin }}>
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
        </Cntr>
      </Container>
    </View>
  );
};

export default ConfirmCh;

const GoodsList = styled.View``;

const GoodsCntr = styled.View``;

const BtnCntr = styled.View`
  margin-top: 20px;
`;
const Btn = styled.TouchableOpacity`
  background-color: #b16cf6;
  color: white;
  width: 343px;
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
  height: 80%;
  align-items: center;
  justify-content: center;
`;
const BackCntr = styled.TouchableOpacity`
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: row;
`;
const BackIcon = styled.Text`
  width: 25%;
  font-size: 18px;
`;
const Container = styled.View`
  flex: 1;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 1%;
`;
const IntroText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-top: 4%;
  line-height: 40px;
`;
const AppName = styled.Text`
  font-size: 22px;
  color: #f66c6c;
`;

const Box = styled.View`
  width: 80%;
  height: 23%;
  background-color: #ededed;
  elevation: 10;
  border-radius: 20;
  margin-top: 5%;
`;

const BoxText = styled.Text`
  font-size: 17px;
  text-align: center;
  padding: 10px;
  line-height: 28px;
`;
