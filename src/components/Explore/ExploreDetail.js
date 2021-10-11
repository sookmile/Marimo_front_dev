import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import { FONTS, COLORS, SIZES, icons, navTabIcons } from "../../constants";
import { preURL } from "../../preURL/preURL";
import { save } from "@react-native-community/cameraroll";
import Tts from "react-native-tts";
import styled from "styled-components";
const ExploreDetail = ({ navigation, route }) => {
  // tts 설정
  Tts.setDefaultLanguage("ko-KR");
  Tts.addEventListener("tts-start", (event) => console.log("start", event));
  Tts.addEventListener("tts-finish", (event) => console.log("finish", event));
  Tts.addEventListener("tts-cancel", (event) => console.log("cancel", event));

  const _onPressSpeech = (word) => {
    Tts.stop();
    Tts.speak(word);
  };

  // 나의 추억창고 저장하기
  const saveMyMemories = (userId) => {
    let dataToSend = {
      userId: 1,
      link: route.params.imageData.link,
      word: route.params.imageData.word,
    };
    // fetch가 아니라 axios로 수정. 아니면 blobinit의 success 가져오기
    fetch(preURL + "/image/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const renderHeader = () => {
    return (
      <View style={styles.container_header}>
        {/* Images */}
        <TouchableOpacity
          style={styles.container_headerIcon}
          onPress={() => navigation.navigate("Main")}
        >
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
                uri: route?.params?.imageData?.link
                  ? route.params.imageData.link
                  : "https://picsum.photos/id/1002/200",
              }}
              style={styles.img}
              resizeMode="cover"
            />
          </View>
          {/* Text */}
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.description}>
              {route?.params?.imageData?.word
                ? route.params.imageData.word
                : "단어"}
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
            _onPressSpeech(
              route?.params?.imageData?.word
                ? route.params.imageData.word
                : "단어"
            )
          }
        />
        <CustomButton
          buttonText="내 추억창고에 저장하기"
          onPress={() => saveMyMemories(1)}
        />
        <CustomButton
          buttonText="다른 사진 찍기"
          onPress={() => navigation.replace("Camera")}
        />
        <CustomButton
          buttonText="홈으로 가기"
          onPress={() => navigation.navigate("Home")}
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
