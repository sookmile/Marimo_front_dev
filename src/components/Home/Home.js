import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { navTabIcons } from "../../constants";
import { fontPercentage, heightPercentage } from "../../constants/responsive";
import { useNavigation } from "@react-navigation/native";
import Orientation from "react-native-orientation";
import { UserHeader } from "../UserHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components";
import Voice from "@react-native-community/voice";

const ListItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <ItemButton label={item.label}>
      <ItemBox
        background={item.background}
        onPress={() => navigation.navigate(`${item.router}`)}
      >
        <Image
          style={{ position: "absolute", top: "2%", left: "5%" }}
          source={require("../../assets/icons/ic_ellipse.png")}
        />

        <Image source={item.src} style={styles.itemPhoto} resizeMode="cover" />
        <ItemText style={{ fontSize: fontPercentage(20) }} color={item.color}>
          {item.label}
        </ItemText>
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
  height: 90%;
  elevation: 3;
  border-width: 0.0125;
  margin-right: 10%;
  background: ${(props) => props.background};
  border-radius: 20;
  border-color: ${(props) => props.background};
  align-items: center;
  align-content: center;
  justify-content: center;
`;
const ItemText = styled.Text`
  color: #ffffff;
  text-align: center;
  margin-top: 10%;
  font-family: Cafe24Ssurround;
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
        height: "44%",
        marginVertical: 16,
      }}
    >
      <ContnetSubCntr
        onPress={() =>
          navigation.navigate(`${item.router}`, {
            userID: item.userID,
            taleName: item.text,
          })
        }
      >
        <Image
          style={{ position: "absolute", top: "2%", left: "1%" }}
          source={require("../../assets/icons/ic_ellipse.png")}
        />
        <ChImage
          style={{
            borderRadius: 20,
            width: "26%",
            height: "94%",
          }}
          source={item.src}
        />
        <ContentTexts>
          <ContentTitle
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: fontPercentage(18),
              marginBottom: heightPercentage(10),
            }}
          >
            {item.text}
          </ContentTitle>
          <ContentText style={{ fontSize: fontPercentage(14) }}>
            추천 연령 : {item.age}세
          </ContentText>
        </ContentTexts>
      </ContnetSubCntr>
    </View>
  );
};
const ContnetSubCntr = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background: #f5e7f8;
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
  font-family: NanumSquareRoundB;
  color: #000000;
`;

const ContentText = styled.Text`
  font-family: NotoSansCJKkr-Regular;
  font-weight: ${(props) => (props.isTitle ? "700" : "400")};
  margin-bottom: ${(props) => (props.isTitle ? 15 : 0)};
  color: #434141;
  line-height: 23px;
`;

const Home = () => {
  const navigation = useNavigation();

  const [userNickname, setUserNickName] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(onOrientaionChange);
    Voice.destroy().then(Voice.removeAllListeners);
    return () => {
      Orientation.unlockAllOrientations(),
        Orientation.removeOrientationListener(onOrientaionChange);
    };
  }, []);
  const onOrientaionChange = (orientation) => {
    if (orientation === "LANDSCAPE") {
      Orientation.lockToPortrait();
    }
  };

  useEffect(async () => {
    const Nickname = await AsyncStorage.getItem("userNickname");
    const Character = await AsyncStorage.getItem("characterNum");
    const UserID = await AsyncStorage.getItem("userId");
    console.log(Character);
    console.log(Nickname);
    console.log(UserID);
    setUserNickName(Nickname);
    setUserID(UserID);
  }, []);

  const SECTIONS3 = [
    {
      key: "1",
      text: "호랑이의 생일잔치",
      src: require("../../assets/images/story/Story1Page1.png"),
      age: "6~7",
      router: "StoryLoading",
      userID: userID,
    },
    {
      key: "2",
      text: "냠냠 맛있는 모음게임",
      src: navTabIcons.cv_game,
      age: "6~7",
      router: "SpellingGameContainer",
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "#FFFBF8" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={"transparent"}
        translucent={true}
      />
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
                    fontSize: fontPercentage(22),
                    fontFamily: "Cafe24Ssurround",
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
            <View style={{ height: 50 }}></View>
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
    color: "#D5A0FE",
    background: "rgba(213, 160, 254, 0.8)",
    router: "Story",
  },
  {
    key: "2",
    label: "게임",
    src: navTabIcons.ic_game,
    color: "#CCAB37",
    background: "#FFD74B",
    router: "Game",
  },
  {
    key: "3",
    label: "탐험",
    src: navTabIcons.ic_camera,
    color: "#F66C6C",
    background: "rgba(246, 108, 108, 0.8)",
    router: "Explore",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 10,
    alignItems: "center",
  },
  itemPhoto: {
    width: 64,
    height: 63,
    borderRadius: 23.5,
  },
});

const StudyTxt = styled.Text`
  color: #191919;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 100;
`;
