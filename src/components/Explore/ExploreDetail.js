import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import { FONTS, COLORS, SIZES, icons, navTabIcons } from "../../constants";
import axios from "axios";
import { preURL } from "../../preURL/preURL";
import Tts from "react-native-tts";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExploreDetail = ({ navigation, route }) => {
  const [userId, setuserId] = useState(-1);
  const { link, word } = route.params;

  // tts 설정
  Tts.setDefaultLanguage("ko-KR");
  Tts.addEventListener("tts-start", (event) => console.log("start", event));
  Tts.addEventListener("tts-finish", (event) => console.log("finish", event));
  Tts.addEventListener("tts-cancel", (event) => console.log("cancel", event));

  const _onPressSpeech = (text) => {
    Tts.stop();
    Tts.speak(text);
  };

  const getUserId = async () => {
    const id = await AsyncStorage.getItem("userId");
    return id;
  };

  useEffect(async () => {
    const userID = await getUserId();
    console.log("유저 아이디:", userID);
    setuserId(userID);
  }, []);

  // 나의 추억창고 저장하기
  const saveMyMemories = async (userId) => {
    let dataToSend = {
      userId: userId,
      link: route.params.link,
      word: route.params.word,
    };
    // fetch가 아니라 axios로 수정. 아니면 blobinit의 success 가져오기
    axios
      .post(preURL + "/image/save", dataToSend)
      .then(async (res) => {
        const response = res.data;
        console.log("저장 여부: ", response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderHeader = () => {
    return (
      <View style={styles.container_header}>
        {/* Images */}
        <TouchableOpacity style={styles.container_headerIcon}>
          <Image
            source={icons.marimo_logo}
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>

        <View style={styles.container_headerText}>
          <StudyTxt style={{ marginTop: 20 }}>내가 찾은 추억창고</StudyTxt>
        </View>

        <View
          style={{ width: 55, paddingLeft: 14, justifyContent: "center" }}
        />
      </View>
    );
  };

  const renderCard = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View style={styles.container_img}>
          {/* Image */}
          <View style={styles.container_imgShadow}>
            <Image
              source={{
                uri: route?.params?.link
                  ? route.params.link
                  : "https://picsum.photos/id/1002/200",
              }}
              style={styles.img}
              resizeMode="cover"
            />
          </View>
          {/* Text */}
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.description}>
              {route?.params?.word ? route.params.word : "단어"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.container_button}>
        <CustomButton
          buttonText="이름 불러보기"
          onPress={() =>
            _onPressSpeech(route?.params?.word ? route.params.word : "단어")
          }
        />
        <CustomButton
          buttonText="내 추억창고에 저장하기"
          onPress={async () => {
            await saveMyMemories(userId);
            Alert.alert("사진이 내 추억창고에 저장되었습니다!");
            // 잘 동작하는지 확인 필요
            navigation.reset({ routes: [{ name: "Main" }] });
          }}
        />
        <CustomButton
          buttonText="다른 사진 찍기"
          onPress={() => navigation.replace("Camera")}
        />
        <CustomButton
          buttonText="홈으로 가기"
          onPress={() => navigation.reset({ routes: [{ name: "Main" }] })}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#FFFBF8" }]}>
      <StatusBar barStyle="dark-content" />
      {/* 헤더 렌더링 */}
      {renderHeader()}
      {/* 카드 렌더링 */}
      {renderCard()}
      {/* 버튼 렌더링 */}
      {renderButtons()}
    </SafeAreaView>
  );
};

export default ExploreDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_header: {
    flexDirection: "row",
    height: 50,
    marginTop: 25,
  },
  container_headerIcon: {
    width: 55,
    paddingLeft: 14,
    justifyContent: "center",
  },
  container_headerText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: COLORS.darkGray,
    ...FONTS.h3,
  },
  container_img: {
    flexDirection: "column",
    marginVertical: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderRadius: 20,
    backgroundColor: "#F9F4FF",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SIZES.padding,
  },
  container_imgShadow: {
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: 310,
    height: 180,
    borderRadius: 20,
    borderColor: COLORS.purple,
    borderWidth: 2,
  },
  description: {
    color: COLORS.primary,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "700",
  },
  container_button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: SIZES.padding,
  },
});
const StudyTxt = styled.Text`
  font-family: NanumSquareRoundB;
  font-size: 22px;
  line-height: 28px;
  font-weight: bold;
  color: #191919;
`;
