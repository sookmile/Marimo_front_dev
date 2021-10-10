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
    <ItemButton label={item.label}>
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

const ItemButton = styled.View`
  width: 30%;
  height: 100%;
  align-items: center;
  overflow: visible;
`;

const ItemBox = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  elevation: 1;
  border-width: 0.0125;
  margin-right: 10%;
  background: ${(props) => props.background};
  border-radius: 20;
  border-color: ${(props) => props.background};
  align-items: center;
  align-content: center;
`;
const ItemText = styled.Text`
  color: ${(props) => props.color};
  text-align: center;
  margin-top: 10%;
  font-family: NanumSquareRoundB;
  font-size: 18;
  font-weight: bold;
`;

const renderItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        height: "40%",
      }}
    >
      <ContnetSubCntr onPress={() => navigation.navigate(`${item.router}`)}>
        <ChImage
          style={{
            borderRadius: 20,
            width: "26%",
            height: "94%",
          }}
          source={item.src}
        />
        <ContentTexts>
          <ContentTitle numberOfLines={1} ellipsizeMode="tail">
            {item.text}
          </ContentTitle>
          <ContentText>{item.number}명이 플레이 중입니다.</ContentText>
        </ContentTexts>
      </ContnetSubCntr>
    </View>
  );
};
const ContnetSubCntr = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background: #fbf8ff;
  border-radius: 23;
  justify-content: space-between;
  align-items: center;
  display: flex;
  elevation: 10;
  flex-direction: row;
  padding-vertical: 1.5%;
  padding-horizontal: 2.5%;
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
`;

const ContentText = styled.Text`
  font-family: Noto Sans CJK KR;
  font-weight: ${(props) => (props.isTitle ? "700" : "400")};
  margin-bottom: ${(props) => (props.isTitle ? 15 : 0)};
  font-size: 14px;
  line-height: 23px;
  color: #434141;
`;

const Home = () => {
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
    const Character = await AsyncStorage.getItem("characterNum");
    console.log(Character);
    console.log(Nickname);
    setUserNickName(Nickname);
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#FFFBF8" }}>
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
            type={"home"}
            style={{ height: "40%" }}
            userNickname={userNickname}
          />
          <View
            style={{
              width: "92%",
              height: "58%",

              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                marginBottom: "10%",
                justifyContent: "space-between",
                width: "100%",
                height: "27%",
                marginTop: "5%",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {SECTIONS1.map((item) => ListItem({ item }))}
            </View>

            <View
              style={{
                display: "flex",
                flex: 1,
                marginBottom: 5,
                height: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                }}
              >
                <StudyTxt
                  style={{
                    color: "#464D46",
                    fontWeight: "bold",
                  }}
                >
                  추천 학습
                </StudyTxt>
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

export default Home;

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
    text: "앗, 도와줘! 우당탕탕 왕국 모험",
    src: navTabIcons.ic_story1,
    number: 50,
    router: "StoryLoading",
  },
  {
    key: "2",
    text: "냠냠 맛있는 모음게임",
    src: navTabIcons.ic_game1,
    number: 20,
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
