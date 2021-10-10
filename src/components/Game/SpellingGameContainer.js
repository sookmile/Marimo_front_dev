import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomButton from "../CustomButton/CustomButton";
import LinearGradient from "react-native-linear-gradient";
import AnimatedBackground from "./AnimatedBackground";
import { COLORS } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { preURL } from "../../preURL/preURL";

export default function SpellingGameContainer({ navigation }) {
  const [userID, setUserID] = useState(0);
  const [userNickname, setUserNickname] = useState("");
  const [characterNum, setcharacterNum] = useState(0);

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    return userId;
  };

  const getUserNickname = async () => {
    const nickname = await AsyncStorage.getItem("userNickname");
    return nickname;
  };

  const getMultiData = async () => {
    const userId = await getUserId();
    const userIdCheck = userId ? userId : 1;
    console.log("userIdCheck", userIdCheck);
    setUserID(userIdCheck);
    const userNickName = await getUserNickname();
    const userNickNameCheck = userNickName ? userNickName : "송이";
    setUserNickname(userNickNameCheck);
    const Character = await AsyncStorage.getItem("characterNum");
    console.log(Character);
    setcharacterNum(Character);
    console.log("userNickname", userNickname);
  };

  useEffect(() => {
    console.log("useEffect 실행");
    getMultiData();
  }, []);

  return (
    <Container>
      <ButtonContainer>
        <Title>냠냠 맛있는 모음게임</Title>
        <CustomButton
          buttonText="게임 시작하기"
          onPress={() =>
            navigation.navigate("SpellingGame", {
              userId: userID,
              userNickname: userNickname,
              characterNum: characterNum,
            })
          }
        ></CustomButton>
        <CustomButton
          buttonText="나가기"
          onPress={() => navigation.goBack()}
        ></CustomButton>
      </ButtonContainer>
      <AnimatedBackground />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

const ButtonContainer = styled.View`
  z-index: 11;
`;

const Title = styled.Text`
  margin-top: 15px
  font-size: 26px
  line-height: 32px;
  text-align: center;
  color: #464D46;
  font-family: "Cafe24Ssurround";
`;

const Image = styled.Image``;

const SubTitle = styled.Text`
  font-size: 16px;
  line-height: 20px;
  color: #fff;
`;
