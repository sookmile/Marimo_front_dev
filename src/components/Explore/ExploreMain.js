import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { preURL } from "../../preURL/preURL";
import { COLORS, SIZES, navTabIcons } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";

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
import { Swipeable } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// tts 설정
Tts.setDefaultLanguage("ko-KR");
Tts.setDefaultRate(0.35);
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
        marginHorizontal: SIZES.padding,
        marginVertical: 16,
      }}
    >
      <ContnetSubCntr
        onPress={() => navigation.navigate("Camera")}
        style={{ height: heightPercentage(110) }}
      >
        <Image
          style={{ position: "absolute", top: "2%", left: "1%" }}
          source={require("../../assets/icons/ic_ellipse.png")}
        />
        <View style={{ borderRadius: 20 }}>
          <ChImage
            style={{
              borderRadius: 20,
              paddingLeft: -30,
              width: widthPercentage(80),
              height: heightPercentage(80),
            }}
            resizeMode="cover"
            source={item.src}
          />
        </View>
        <ContentTexts>
          <ContentTitle
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ fontSize: wp(4.5), marginBottom: hp(1.5) }}
          >
            {item.text}
          </ContentTitle>
          <ContentText style={{ fontSize: wp(3.5) }}>
            추천 연령 : {item.age}세
          </ContentText>
        </ContentTexts>
      </ContnetSubCntr>
    </View>
  );
};

const postDeleteItem = async (photoId, userId) => {
  let dataToSend = {
    userId: userId,
    photoId,
    photoId,
  };
  axios
    .post(preURL + "/image/delete", dataToSend)
    .then(async (res) => {
      const response = res.data;
      console.log("삭제 여부: ", response);
      alert("사진을 삭제했습니다");
      return response;
    })
    .catch((err) => {
      alert("삭제과정에서 오류가 발생했습니다!");
      console.log(err);
    });
};

const ContnetSubCntr = styled.TouchableOpacity`
  width: 100%;
  background: #f5e7f8;
  border-radius: 23;
  justify-content: space-between;
  align-items: center;
  display: flex;
  elevation: 10;
  flex-direction: row;
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
  font-size: 15px;
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
    const id = await AsyncStorage.getItem("userId");
    return id;
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
    setLoading(true);
    try {
      const response = await fetch(preURL + "/image/show", {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("결과");
      if (response.status === 200) {
        const responseJson = await response.json();
        setLoading(false);
        return responseJson;
      } else {
        setLoading(false);
        alert("추억창고를 불러올 수 없어요!");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getMultiData = async () => {
    const userId = await getUserId();
    setuserId(userId);
    console.log("메인 화면 유저 아이디:", userId);
    const userMemory = await getUserMemory(userId);
    if (userMemory) {
      setUserData(userMemory);
    }
    setLoading(false);
  };

  const isFocused = useIsFocused();

  useEffect(async () => {
    if (isFocused) {
      const userMemory = await getUserMemory(userId);
      if (userMemory) {
        setUserData(userMemory);
      }
    }
  }, [isFocused]);

  useEffect(async () => {
    setLoading(true);
    getMultiData();
    const Nickname = await AsyncStorage.getItem("userNickname");
    console.log(Nickname);
    setuserNickmame(Nickname);

    return () => {
      Tts.removeEventListeners;
    };
  }, []);

  useEffect(() => {
    userData.map((obj) => console.log(obj));
  }, [userData]);

  const ListItem = ({ item, userId }) => {
    const navigation = useNavigation();

    // 삭제 핸들러
    const deleteHandler = async (photoId, userId) => {
      console.log("사진 아이디: ", photoId);
      console.log("사용자 아이디: ", userId);
      postDeleteItem(photoId, userId);
      const userMemory = await getUserMemory(userId);
      if (userMemory) {
        setUserData(userMemory);
      }
      setLoading(false);
    };

    // 삭제 여부 묻는 모달
    const showAlert = () => {
      Alert.alert(
        "사진 삭제",
        "사진을 정말 삭제하시겠어요?",
        [
          {
            text: "삭제",
            onPress: () => deleteHandler(item.id, userId),
          },
          {
            text: "취소",
            onPress: () => console.log("삭제 취소"),
            style: "cancel",
          },
        ],
        {
          cancelable: false,
        }
      );
    };

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <ContnetSubCntr
            style={{
              backgroundColor: "none",
              elevation: 0,
              heigt: "100%",
            }}
            onPress={() => _onPressSpeech(item?.word)}
          >
            <ChImage
              style={{
                borderRadius: 20,
                width: 120,
                height: 95,
              }}
              source={{ uri: item.link }}
              resizeMethod="resize"
            />
            <ContentTexts>
              <ContentTitle
                style={{
                  fontSize: fontPercentage(18),
                  paddingLeft: 30,
                  fontFamily: "Noto Sans CJK KR",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item?.word}
              </ContentTitle>
            </ContentTexts>
          </ContnetSubCntr>
        </View>
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "center",
            marginTop: -11,
          }}
        >
          <Pressable onPress={() => showAlert()}>
            <Icon name="close-circle" size={33} color={"#F66C6C"} />
          </Pressable>
        </View>
      </View>
    );
  };

  const renderVacantExploreMemory = () => {
    return (
      <View
        style={{
          height: windowWidth < windowHeight ? hp(25) : wp(25),
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={navTabIcons.ic_Mexplore}
            resizeMode="center"
            style={{
              width: windowWidth < windowHeight ? wp(12) : hp(12),
              height: windowWidth < windowHeight ? wp(12) : hp(12),
            }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "NanumSquareRoundB",
            marginTop: "2%",
          }}
        >
          나의 추억창고가 비었어요
        </Text>
      </View>
    );
  };

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
        </View>
      </View>
      <View style={{ flex: 1, marginHorizontal: "6%" }}>
        <View style={{ marginTop: "7%" }}>
          <View>
            <Text style={styles.titleText}>
              찰칵, 카메라를 눌러서 찾아봐요!
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: "5%",
            }}
          >
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => navigation.navigate("Camera")}
            >
              <View
                style={{
                  backgroundColor: "#F5E7F8",
                  width: "100%",
                  height: windowWidth < windowHeight ? hp(15) : wp(15),
                  borderRadius: 20,
                  flexDirection: "row",
                  elevation: 3,
                }}
              >
                <Image
                  style={{ position: "absolute", top: "2%", left: "1%" }}
                  source={require("../../assets/icons/ic_ellipse.png")}
                />
                <View
                  style={{
                    justifyContent: "center",
                    height: "100%",
                    width: "30%",
                    marginLeft: "3%",
                  }}
                >
                  <Image
                    style={{
                      borderRadius: 20,
                      width: "80%",
                      height: "80%",
                    }}
                    resizeMode="contain"
                    source={navTabIcons.cv_camera}
                  />
                </View>
                <View
                  style={{
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: fontPercentage(18),
                      marginBottom: heightPercentage(10),
                      fontFamily: "NanumSquareRoundB",
                    }}
                  >
                    요리조리, 탐험하기
                  </Text>
                  <Text
                    style={{
                      fontSize: fontPercentage(14),
                      fontFamily: "Noto Sans CJK KR",
                    }}
                  >
                    추천 연령: 3~7세
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, marginVertical: "2.5%" }}>
          <View>
            <Text style={styles.titleText}>나의 추억창고</Text>
          </View>
          <View style={{ flex: 0.8, marginBottom: 5 }}>
            {userData.length !== 0
              ? userData.map((obj) => <ListItem item={obj} userId={userId} />)
              : renderVacantExploreMemory()}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExploreMain;
const SECTIONS = [
  {
    date: "2021-09-16T13:27:40",
    id: 1,
    link: "https://picsum.photos/id/10/200",
    success: null,
    word: "학습기록이 없습니다.",
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
    fontSize: fontPercentage(22),
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
  button: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth < windowHeight ? wp(9) : hp(9),
    height: windowWidth < windowHeight ? wp(9) : hp(9),
  },
  buttonClose: {
    backgroundColor: "#F66C6C",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
  color: #191919;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 140;
`;
