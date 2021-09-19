import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import Character1 from "../../assets/icons/Character/Character1.png";
import Character2 from "../../assets/icons/Character/Character2.png";
import Character3 from "../../assets/icons/Character/Character3.png";
import Character4 from "../../assets/icons/Character/Character4.png";
import Inactive from "../../assets/icons/Character/Inactive.png";
import { FlatList } from "react-native";

const character = [
  { value: 0, src: Character1, label: "모모" },
  { value: 1, src: Character2, label: "말랑이" },
  { value: 2, src: Character3, label: "행복이" },
  { value: 3, src: Character4, label: "기쁨이" },
];
/* 캐릭터 선택 페이지 */
const Character = ({ route, navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [charNum, setCharNum] = useState(-1);

  const selectCharacter = (id) => {
    console.log(id);
    setCharNum(id);
  };

  const { name } = route.params;
  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 70) : (cntrMargin = 20);
  let chMargin = 0;
  Platform.OS === "ios" ? (chMargin = 40) : (chMargin = 20);

  const onSelect = () => {
    if (charNum === -1) {
      Alert.alert("캐릭터를 선택해주세요");
    } else {
      navigation.navigate("ConfirmCh", {
        name: name,
        characterNum: charNum,
      });
    }
  };

  return (
    <Container style={{ marginTop: cntrMargin }}>
      <BackCntr onPress={() => navigation.navigate("StartMain")}>
        <BackIcon>뒤로 가기</BackIcon>
      </BackCntr>
      <IntroText>
        만나서 반가워, <AppName>{name}</AppName>아!{"\n"}너와 함께 모험을 떠날
        친구를 골라봐!
      </IntroText>
      <Cntr style={{}}>
        <View
          style={{
            width: "95%",
            marginTop: -1 * chMargin,
            marginBottom: chMargin,
          }}
        >
          <FlatList
            data={character}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  flexDirection: "column",
                  margin: 1,
                  marginBottom:
                    item.value == 3 || item.value == 2 ? 0 : cntrMargin,
                }}
              >
                <ImageCntr
                  isActive={item.value === charNum}
                  onPress={() => {
                    item.value === 0 || item.value === 1
                      ? selectCharacter(item.value)
                      : Alert.alert("선택 불가능한 캐릭터입니다.");
                  }}
                >
                  {item.value === 0 || item.value === 1 ? (
                    <Image
                      style={{ width: 120, height: 120 }}
                      source={item.src}
                    />
                  ) : (
                    <ImageBackground
                      source={item.src}
                      resizeMode="cover"
                      style={{ width: 120, height: 120 }}
                    >
                      <Image
                        style={{ width: 120, height: 120 }}
                        source={Inactive}
                      />
                    </ImageBackground>
                  )}
                </ImageCntr>
                <CharacterName>{item.label}</CharacterName>
              </View>
            )}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <BtnCntr>
          <Btn onPress={onSelect}>
            <BtnText>선택했어요!</BtnText>
          </Btn>
        </BtnCntr>
      </Cntr>
    </Container>
  );
};

export default Character;
const ImageCntr = styled.TouchableOpacity`
  border-color: #b16cf7;
  width: 128;
  height: 128;
  border-radius: 63;
  border-width: ${(props) => (props.isActive ? 4 : 0)};
`;
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

const CharacterName = styled.Text`
font-size: 16px;
line-height: 23.5
color: #191919;
margin-top: 10;
`;
