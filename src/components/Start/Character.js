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
import { FlatList } from "react-native";
import { character } from "../../assets/icons/Character/Character";
import Icon2 from "react-native-vector-icons/Ionicons";

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
    <View style={{ display: "flex", flex: 1, backgroundColor: "#fffbf8" }}>
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
          <IntroText>
            만나서 반가워, <AppName>{name}</AppName>아!{"\n"}너와 함께 모험을
            떠날 친구를 골라봐!
          </IntroText>
        </View>
        <View
          style={{
            width: "100%",
            height: "62%",
            alignItems: "center",
          }}
        >
          <CharacterCntr>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlatList
                data={character}
                renderItem={({ item }) => (
                  <View
                    style={{
                      display: "flex",
                      width: "50%",
                      marginTop: 8,
                      verticalAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GoodsCntr isActive={item.value === charNum}>
                      <ImageCntr
                        onPress={() => {
                          item.value === 0 || item.value === 1
                            ? selectCharacter(item.value)
                            : Alert.alert("선택 불가능한 캐릭터입니다.");
                        }}
                      >
                        <Image
                          style={{ width: 110, height: 100 }}
                          source={item.src}
                          resizeMode="contain"
                        />
                      </ImageCntr>
                      <CharacterName>{item.label}</CharacterName>
                    </GoodsCntr>
                  </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </CharacterCntr>
        </View>
        <View
          style={{
            width: "100%",
            height: "15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BtnCntr>
            <Btn height={height} onPress={onSelect}>
              <BtnText>선택했어요!</BtnText>
            </Btn>
          </BtnCntr>
        </View>
        <View
          style={{
            width: "100%",
            height: "5%",
            justifyContent: "center",
          }}
        ></View>
      </Container>
    </View>
  );
};

export default Character;
const ImageCntr = styled.TouchableOpacity`
  border-color: #b16cf7;
  width: 100;
  height: 100;
  border-radius: 63;
`;

const GoodsCntr = styled.View`
  width: 97%;
  padding-left: 2.5%;
  padding-right: 2.5%;
  height: 170;
  align-items: center;
  justify-content: center;
  border-radius: 20;
  background-color: ${(props) => (props.isActive ? "#F1C7C7" : "transparent")};
  border-width: ${(props) => (props.isActive ? 3.5 : 0)};
  border-color: #d67e7e;
`;

const BtnCntr = styled.View`
  width: 92%;
  height: 25%;
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
  flex: 1;
  height: 100px;
  align-items: center;
  justify-content: center;
`;
const CharacterCntr = styled.View`
  width: 95%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-color: #fa9c9c;
  border-width: 2;
  border-radius: 20;
  margin-horizontal: 24;
`;

const BackCntr = styled.TouchableOpacity`
  width: 100%;
  height: 6%;
  text-align: left;
  align-items: flex-end;
  display: flex;
  flex-direction: row;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
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

const CharacterName = styled.Text`
font-size: 16px;
line-height: 23.5
color: #191919;
margin-top: 10;

`;
