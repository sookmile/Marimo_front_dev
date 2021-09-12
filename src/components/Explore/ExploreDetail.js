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
import { FONTS, COLORS, SIZES, icons } from "../../constants";

const ExploreDetail = ({ navigation, route }) => {
  const renderHeader = () => {
    return (
      <View style={styles.container_header}>
        {/* Images */}
        <TouchableOpacity style={styles.container_headerIcon}>
          <Image
            source={icons.marimo_logo}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        <View style={styles.container_headerText}>
          <Text style={styles.titleText}>내가 찾은 추억창고</Text>
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
              source={{ uri: route.params.image }}
              style={styles.img}
              resizeMode="cover"
            />
          </View>
          {/* Text */}
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.description}>{route.params.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={container_button}>
        <CustomButton
          buttonText="이름 불러보기"
          onPress={() => console.log("이름 불러보기")}
        />
        <CustomButton
          buttonText="내 추억창고에 저장하기"
          onPress={() => console.log("내 추억창고에 저장하기")}
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
    <SafeAreaView style={styles.container}>
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
    backgroundColor: "#E8E8E8",
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
    width: 250,
    height: 150,
    borderRadius: 35,
    borderColor: COLORS.purple,
    borderWidth: 2,
  },
  description: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: "700",
  },
  container_button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: SIZES.padding,
  },
});
