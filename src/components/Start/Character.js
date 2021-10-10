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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
          <BackIcon>뒤로 가기</BackIcon>
          <TouchableOpacity
            onPress={() => navigation.navigate("Character", { name: "우진" })}
          >
            <Text>이동</Text>
          </TouchableOpacity>
        </BackCntr>
        <IntroText style={{ fontSize: hp(2.5), lineHeight: hp(4) }}>
          만나서 반가워,{" "}
          <AppName style={{ fontSize: hp(2.5), lineHeight: hp(4) }}>
            {name}
          </AppName>
          아!{"\n"}너와 함께 모험을 떠날 친구를 {"\n"}골라봐!
        </IntroText>
        <CharacterCntr height={height}>
          <View style={{ width: wp(80) }}>
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
                  <GoodsCntr
                    style={{
                      width: wp(35),
                      height: hp(25),
                    }}
                    isActive={item.value === charNum}
                  >
                    <ImageCntr
                      onPress={() => {
                        item.value === 0 || item.value === 1
                          ? selectCharacter(item.value)
                          : Alert.alert("선택 불가능한 캐릭터입니다.");
                      }}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Image
                        resizeMode="contain"
                        source={item.src}
                        style={{ width: hp(15), height: hp(15) }}
                      />
                    </ImageCntr>
                    <CharacterName
                      style={{
                        fontSize: hp(2),
                        textAlign: "center",
                      }}
                    >
                      {item.label}
                    </CharacterName>
                  </GoodsCntr>
                </View>
              )}
              //Setting the number of column
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </CharacterCntr>
        <BtnCntr>
          <Btn height={height} onPress={onSelect}>
            <BtnText>선택했어요!</BtnText>
          </Btn>
        </BtnCntr>
      </Container>
    </View>
  );
};

export default Character;
const ImageCntr = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-color: #b16cf7;
  border-radius: 63;
  border-width: ${(props) => (props.isActive ? 4 : 0)};
`;
const GoodsList = styled.View``;

const GoodsCntr = styled.View`
  justify-content: center;
  border-radius: 20;
  background-color: ${(props) => (props.isActive ? "#F1C7C7" : "#fffbf8")};
  border-width: ${(props) => (props.isActive ? 3.5 : 0)};
  border-color: #d67e7e;
`;

const ScrollView = styled.FlatList``;
const BtnCntr = styled.View`
  margin-top: 20;
  align-items: center;
  justify-content: center;
`;
const Btn = styled.TouchableOpacity`
  background-color: #b16cf6;
  margin-bottom: 20;
  color: white;
  width: 343px;
  height: 56px;
  border-radius: 14px;
  align-items: center;
  align-content: center;
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
  height:${(props) => props.height * 0.55}
  align-items: center;
  justify-content: center;
  margin-top: 30;
  border-color: #fa9c9c;
  border-width: 2;
  border-radius: 20;
  margin-horizontal: 24;
`;
const BackCntr = styled.TouchableOpacity`
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: row;
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

  background-color: #fffbf8;
`;

const IntroText = styled.Text`
  font-family: NanumSquareRoundB;
  margin-top: 20;
  line-height: 40px;
  margin-horizontal: 24px;
`;
const AppName = styled.Text`
  color: #f66c6c;
`;

const CharacterName = styled.Text`
  color: #191919;
  margin-top: 10;
`;
