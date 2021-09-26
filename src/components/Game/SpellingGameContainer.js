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
  const [userID, setuserID] = useState(0);
  const [userNickname, setuserNickmame] = useState("");

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    return userId;
  };

  const getUserNickname = async (userId) => {
    await axios
      .post(preURL + "marimo/getNickName", { userId: userId })
      .then((res) => {
        const response = res.data;
        console.log("성공:", response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMultiData = async () => {
    const userId = await getUserId();
    const userIdCheck = userId != 0 ? userId : 1;
    setuserID(userIdCheck);
    const userNickname = await getUserNickname(userId);
    const userNicknameCheck = userNickname != undefined ? userNickname : "송이";
    setuserNickmame(userNicknameCheck);
    console.log("userId", userId);
    console.log("userNickname", userNickname);
  };

  useEffect(() => {
    console.log("useEffect 실행");
    getMultiData();
  }, []);

  return (
    <Container>
      <ButtonContainer>
        <Title>동물 친구들의 초성 게임</Title>
        <CustomButton
          buttonText="게임 시작하기"
          onPress={() =>
            navigation.navigate("SpellingGame", {
              userId: userID,
              userNickname: userNickname,
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

const Container = styled.View`
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
