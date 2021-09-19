import React, { useEffect, useState } from "react";
import { Button, Text, Image, View, Dimensions, Settings } from "react-native";
import styled from "styled-components/native";
import Character1 from "../../assets/icons/Character/Character1.png";
import Character2 from "../../assets/icons/Character/Character2.png";
import Character3 from "../../assets/icons/Character/Character3.png";
import Character4 from "../../assets/icons/Character/Character4.png";
import { FlatList } from "react-native";

const character = [
  { value: 0, src: Character1, label: "모모" },
  { value: 1, src: Character2, label: "말랑이" },
  { value: 2, src: Character3, label: "행복이" },
  { value: 3, src: Character4, label: "기쁨이" },
];
/* 캐릭터 선택 페이지 */
const ConfirmCh = ({ route, navigation }) => {
  const { width, height } = Dimensions.get("window");
  let topMargin = height * 0.03;
  let bottomMargin = 0;
  let displayHeight = 0;
  const [chrNum, setChrNum] = useState(0);
  const { name, characterNum } = route.params;

  useEffect(() => {
    setChrNum(characterNum);
    console.log(characterNum);
    console.log(name);
    console.log(character[characterNum]);
  });
  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 70) : (cntrMargin = 20);

  let chMargin = 0;
  Platform.OS === "ios" ? (chMargin = 60) : (chMargin = 40);
  return (
    <Container style={{ marginTop: cntrMargin }}>
      <BackCntr onPress={() => navigation.navigate("StartMain")}>
        <BackIcon>뒤로 가기</BackIcon>
      </BackCntr>
      <IntroText>
        {character[chrNum].label}와 모험을 떠날 준비가 되었니?
        {/*<AppName>송이</AppName>야!{"\n"}너와 함께 모험을 떠날
        친구를 골라봐!*/}
      </IntroText>
      <Cntr>
        <View
          style={{
            width: "95%",
            alignItems: "center",
            marginTop: chMargin,
          }}
        >
          <Image
            style={{ width: 225, height: 225 }}
            source={character[chrNum].src}
          />
          <Box>
            <BoxText>
              "{name}아 안녕, 나는 {character[chrNum].label}야!
              {"\n"}우리 함께 재밌는 모험을 떠나자!"
            </BoxText>
          </Box>
        </View>
        <BtnCntr style={{ marginTop: 1.2* chMargin }}>
          <Btn onPress={() => navigation.navigate("NavTab")}>
            <BtnText>네! 준비됐어요!</BtnText>
          </Btn>
        </BtnCntr>
      </Cntr>
    </Container>
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
  align-items: flex-start;
  justify-content: center;
`;

const BackIcon = styled.Text`
  width: 120px;
  font-size: 18px;
`;
const Container = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
`;

const IntroText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-top: 30px;
  line-height: 40px;
`;
const AppName = styled.Text`
  font-size: 22px;
  color: #f66c6c;
`;

const Box = styled.View`
  width: 80%;
  height: 80px;
  background-color: #dedede;
  border-radius: 20;
  margin-top: 20;
`;

const BoxText = styled.Text`
  font-size: 17px;
  text-align: center;
  padding: 10px;
  line-height: 28px;
`;
