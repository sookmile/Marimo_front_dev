import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { SIZES, COLORS, navTabIcons } from "../../constants";
import { fontPercentage } from "../../constants/responsive";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Orientation from "react-native-orientation";
import { UserHeader } from "../UserHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components";

const ListItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <ItemButton label={item.key}>
      <ItemBox
        background={item.background}
        onPress={() => navigation.navigate(`${item.router}`)}
      >
        <Image source={item.src} style={styles.itemPhoto} resizeMode="cover" />
        <ItemText color={item.color}>{item.label}</ItemText>
      </ItemBox>
    </ItemButton>
  );
};

const renderItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View
      key={item.key}
      style={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
      }}
    >
      <ContnetSubCntr onPress={() => navigation.navigate(`${item.router}`)}>
        <ChImage
          style={{
            borderRadius: 20,
            width: 90,
            height: 90,
          }}
          source={item.src}
        />
        <ContentTexts>
          <ContentTitle numberOfLines={1} ellipsizeMode="tail">
            {item.text}
          </ContentTitle>
          <ContentText>추천 연령 : {item.age}세</ContentText>
        </ContentTexts>
      </ContnetSubCntr>
    </View>
  );
};
const ContnetSubCntr = styled.TouchableOpacity`
  width: 100%;
  height: 108px;
  background: #fbf8ff;
  border-radius: 23;
  justify-content: space-between;
  align-items: center;
  display: flex;
  elevation: 10;
  flex-direction: row;
  padding-horizontal: 10;
  margin-horizontal: 10;
`;
const ChImage = styled(Image)`
  width: 20%;
`;
const ContentTexts = styled.View`
  width: 65%;
`;
const ContentTitle = styled.Text`
  font-family: Noto Sans CJK KR;
  margin-bottom: 15;
  font-weight: bold;
  font-size: 15px;
  line-height: 24px;
  color: #000000;
  overflow: hidden;
`;

const ContentText = styled.Text`
  font-family: Noto Sans CJK KR;
  font-weight: ${(props) => (props.isTitle ? "700" : "400")};
  margin-bottom: ${(props) => (props.isTitle ? 15 : 0)};
  font-size: 14px;
  line-height: 23px;
  color: #434141;
`;

const GameMain = () => {
  const [userNickname, setUserNickName] = useState("");
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
  useEffect(async () => {
    const Nickname = await AsyncStorage.getItem("userNickname");
    console.log(Nickname);
    setUserNickName(Nickname);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flex: 1,
            width: "92%",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <UserHeader
            style={{ height: "40%" }}
            type={"game"}
            userNickname={userNickname}
          />
          <View
            style={{
              width: "94%",
              height: "57%",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flex: 1,
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  display: "flex",
                }}
              >
                <StudyTxt>추천 학습</StudyTxt>
              </View>
              <View
                stlye={{
                  flex: 1,
                  marginTop: StatusBar.currentHeight || 0,
                  marginBottom: 5,
                }}
              >
                {SECTIONS3.map((item) => renderItem({ item }))}
              </View>
            </View>
          </View>
        </View>
      </View>
      <Wrapper />
    </ScrollView>
  );
};

export default GameMain;

const SECTIONS1 = [
  {
    key: "1",
    label: "동화",
    src: navTabIcons.ic_story,
    color: "#CCAB37",
    background: "rgba(251, 222, 120, 0.08)",
    router: "Story",
  },
  {
    key: "2",
    label: "게임",
    src: navTabIcons.ic_game,
    color: "#D5A0FE",
    background: "rgba(213, 160, 254, 0.08)",
    router: "Game",
  },
  {
    key: "3",
    label: "탐험",
    src: navTabIcons.ic_camera,
    color: "#F66C6C",
    background: "rgba(246, 108, 108, 0.08)",
    router: "Explore",
  },
];
const SECTIONS3 = [
  {
    key: "1",
    text: "누가누가 잘하나 재미있는 끝말잇기",
    age: "6~7",
    src: navTabIcons.ic_game1,
    router: "SpellingGameContainer",
  },
  {
    key: "2",
    text: "동물 친구들의 초성게임",
    age: "7~8",
    src: navTabIcons.ic_game2,
    router: "SpellingGameContainer",
  },
  {
    key: "3",
    text: "충치를 막아라, 치카치카 방어대",
    src: navTabIcons.ic_game3,
    age: "7~8",
    router: "SpellingGameContainer",
  },
];

const SECTIONS2 = [
  {
    title: "Made for you",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "이상한 나라의 앨리스",
        src: "https://picsum.photos/id/1/200",
        route: "StoryLoading",
      },
      {
        key: "2",
        text: "호두까기 인형",
        uri: "https://picsum.photos/id/10/200",
        route: "StoryLoading",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1002/200",
        route: "StoryLoading",
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 10,
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    height: 50,
  },
  mainLogo: {
    width: 35,
    height: 35,
    marginLeft: 5,
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: "#A098FD",
    borderRadius: 45,
    marginLeft: 5,
  },
  name: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#F1DFFF",
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#C5A1F3",
    marginLeft: 5,
    marginRight: 5,
  },
  userName: {
    textAlign: "center",
    textAlignVertical: "center",
    width: 300,
  },
  records: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  rButton1: {
    width: 114,
    height: 36,
    borderRadius: 40,
    backgroundColor: "#FF8C73",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rButton2: {
    width: 114,
    height: 36,
    borderRadius: 40,
    backgroundColor: "#FEBB61",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.padding,
  },
  titleText: {
    color: COLORS.darkGray,
    fontFamily: "Cafe24Ssurround",
    fontSize: fontPercentage(20),
  },
  storyBlock: {
    width: 370,
    height: "40%",
    display: "flex",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  studyBlock: {
    width: "92%",
    height: "40%",
    display: "flex",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  item: {
    width: "100%",
    height: 145,
    backgroundColor: "#FAEBFF",
    display: "flex",
    alignItems: "center",
  },
  itemPhoto: {
    width: 64,
    height: 63,
    borderRadius: 23.5,
  },
  itemText: {
    textAlign: "center",
    paddingHorizontal: 5,
    color: "gray",
    marginTop: 10,
    fontFamily: "NanumSquareRoundB",
    fontSize: wp(3.5),
  },
});
const ItemBox = styled.TouchableOpacity`
  width: 97px;
  height: 105px;

  margin-right: 10;
  background: ${(props) => props.background};
  border-radius: 20px;
  border-color: ${(props) => props.background};
  align-items: center;
  align-content: center;
`;
const ItemText = styled.Text`
  color: ${(props) => props.color};
  text-align: center;
  padding-horizontal: 5;
  margin-top: 10;
  font-family: NanumSquareRoundB;
  font-size: 18;
  font-weight: bold;
`;

const ItemButton = styled.View`
  margin-right: ${(props) => (props.label !== "탐험" ? 15 : 0)};
  overflow: visible;
`;
const StudyTxt = styled.Text`
  font-family: NanumSquareRoundB;
  font-size: 22px;
  line-height: 28px;
  font-weight: bold;
  color: #191919;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 100;
`;
