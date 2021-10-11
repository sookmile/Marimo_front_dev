import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { preURL } from "../../preURL/preURL";
import Loader from "../Loader/Loader";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { COLORS, SIZES, navTabIcons } from "../../constants";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../constants/responsive";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Orientation from "react-native-orientation";
import { UserHeader } from "../UserHeader";

import Tts from "react-native-tts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styled, { css } from "styled-components";

// tts 설정
Tts.setDefaultLanguage("ko-KR");
Tts.addEventListener("tts-start", (event) => console.log("start", event));
Tts.addEventListener("tts-finish", (event) => console.log("finish", event));
Tts.addEventListener("tts-cancel", (event) => console.log("cancel", event));

const _onPressSpeech = (word) => {
  Tts.stop();
  Tts.speak(word);
};

const ListItem2 = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        marginHorizontal: SIZES.padding,
      }}
    >
      <ContnetSubCntr onPress={() => navigation.navigate("Detail")}>
        <ChImage
          style={{
            left: -5,
            width: 100,
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

const ListItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
      }}
    >
      <ContnetSubCntr
        style={{ backgroundColor: "none", elevation: 0 }}
        onPress={() => _onPressSpeech(item.word)}
      >
        <ChImage
          style={{
            borderRadius: 20,
            paddingLeft: -30,
            width: 120,
            height: 95,
          }}
          source={{ uri: item.link }}
        />
        <ContentTexts>
          <ContentTitle
            style={{ fontSize: 20, paddingLeft: 30, fontWeigth: "bold" }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.word}
          </ContentTitle>
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
const ThImage = styled(Image)`
  width: 50%;
`;
const ThTexts = styled.View`
  width: 10%;
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

const ExploreMain = ({ navigation }) => {
  const [userId, setuserId] = useState(0);
  const [userNickname, setuserNickmame] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
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

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    return userId;
  };

  const getUserData = async (userId) => {
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

  const getUserMemory = async (userId) => {
    try {
      const response = await fetch(preURL + "/image/show", {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const responseJson = await response.json();
        setLoading(false);
        return responseJson;
      } else {
        setLoading(false);
        alert("unable to get UserData");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getMultiData = async () => {
    const userId = await getUserId();
    const userIdCheck = userId ? userId : 1;
    setuserId(userIdCheck);
    console.log(userId);
    const userNickname = await getUserData(userIdCheck);
    setuserNickmame(userNickname);
    const userMemory = await getUserMemory(userIdCheck);
    if (userMemory) {
      setUserData(userMemory);
    }
    setLoading(false);
  };

  useEffect(async () => {
    setLoading(true);
    await getMultiData();
    const Nickname = await AsyncStorage.getItem("userNickname");
    console.log(Nickname);
    await setuserNickmame(Nickname);
  }, []);

  useEffect(() => {
    userData.map((obj) => console.log(obj));
  }, [userData]);
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
            style={{ height: "40%" }}
            type={"explore"}
            userNickname={userNickname}
          />
          <View
            style={{
              width: "94%",
              alignContent: "center",
              alignItems: "center",
              overflow: "visible",
            }}
          >
            <View
              style={{
                display: "flex",
              }}
            ></View>
            <View
              style={{
                display: "flex",
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  display: "flex",
                  overflow: "visible",
                  marginTop: "15%",
                  marginBottom: 5,
                }}
              >
                <StudyTxt>찰칵, 카메라를 눌러서 찾아봐요!</StudyTxt>
                <ListItem2 item={SECTIONS3} />
                <StudyTxt style={{ marginTop: 20 }}>
                  내가 찾은 추억창고
                </StudyTxt>
                <View
                  stlye={{
                    flex: 1,
                    marginTop: StatusBar.currentHeight || 0,
                  }}
                >
                  {userData.length !== 0
                    ? userData.map((obj) => <ListItem item={obj} />)
                    : SECTIONS.data.map((obj) => <ListItem itme={obj} />)}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExploreMain;
const SECTIONS = [
  {
    title: "Made for you",
    horizontal: true,
    data: [
      {
        id: 1,
        word: "데이터를 불러올 수 없습니다.",
        link: "https://picsum.photos/id/1/200",
        route: "StoryLoading",
      },
      {
        id: 2,
        word: "데이터를 불러올 수 없습니다.",
        link: "https://picsum.photos/id/10/200",
        route: "StoryLoading",
      },

      {
        id: 3,
        text: "Item text 3",
        link: "https://picsum.photos/id/1002/200",
        route: "StoryLoading",
      },
    ],
  },
];

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
const SECTIONS3 = {
  key: "1",
  text: "요리조리, 탐험하기",
  age: "3~7",
  src: navTabIcons.cv_camera,
  router: "Camera",
};

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
  height: 140;
`;
