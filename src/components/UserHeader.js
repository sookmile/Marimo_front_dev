import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import {
  widthPercentage,
  heightPercentage,
  fontPercentage,
} from "../constants/responsive";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import { images, icons, SIZES, COLORS, navTabIcons } from "../constants";
import { useEffect } from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";

export const UserHeader = ({ userNickname, type }) => {
  const { width, height } = Dimensions.get("window");
  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 40) : (cntrMargin = 0);

  const navigation = useNavigation();

  return (
    <View style={[styles.container, { marginTop: cntrMargin }]}>
      <View style={styles.header}>
        {type == "story" ? (
          <BackCntr onPress={() => navigation.navigate("Home")}>
            <View style={{ width: width * 0.1 }}>
              <Icon
                name="chevron-back"
                style={{ marginRight: 10 }}
                size={23}
                color={"#555555"}
              ></Icon>

              <BackIcon></BackIcon>
            </View>
            <View
              style={{
                position: "absolute",
                left: "45%",
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <Text style={[styles.headerText, { alignContent: "center" }]}>
                동화
              </Text>
            </View>
          </BackCntr>
        ) : type === "game" ? (
          <BackCntr onPress={() => navigation.navigate("Home")}>
            <View style={{ width: width * 0.1 }}>
              <Icon
                name="chevron-back"
                style={{ marginRight: 10 }}
                size={23}
                color={"#555555"}
              ></Icon>

              <BackIcon></BackIcon>
            </View>
            <View
              style={{
                position: "absolute",
                left: "45%",
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <Text style={[styles.headerText, { alignContent: "center" }]}>
                게임
              </Text>
            </View>
          </BackCntr>
        ) : type === "explore" ? (
          <>
            <BackCntr onPress={() => navigation.navigate("Home")}>
              <View style={{ width: width * 0.1 }}>
                <Icon
                  name="chevron-back"
                  style={{ marginRight: 10 }}
                  size={23}
                  color={"#555555"}
                ></Icon>

                <BackIcon></BackIcon>
              </View>
              <View
                style={{
                  position: "absolute",
                  left: "45%",
                  width: "100%",
                  alignItems: "flex-start",
                }}
              >
                <Text style={[styles.headerText, { alignContent: "center" }]}>
                  탐험
                </Text>
              </View>
            </BackCntr>
          </>
        ) : (
          <Text style={styles.headerText}>마리모와 말의 세계</Text>
        )}

        {/* <Image
          style={styles.mainLogo}
          source={require("../assets/icons/MainLogo.png")}
       />*/}
      </View>
      <View style={styles.body}>
        {type === "story" ? (
          <>
            <Image
              style={{ width: "100%", height: 179, marginTop: -20 }}
              source={navTabIcons.cv_story}
            />
          </>
        ) : type === "game" ? (
          <>
            <Image
              style={{ width: "100%", height: 179, marginTop: -20 }}
              source={navTabIcons.cv_game}
            />
          </>
        ) : type === "explore" ? (
          <>
            <Image
              style={{ width: "100%", height: 179, marginTop: -20 }}
              source={navTabIcons.cv_explore}
            />
          </>
        ) : (
          <View style={styles.box}>
            <View style={styles.mainbox}>
              <Text style={styles.boxText}>
                "마리모,{"\n"} 말이 뭐가 어렵니?
              </Text>
              <Image
                style={styles.mainLogo}
                source={require("../assets/icons/MainLogo.png")}
              />
            </View>
            <View style={styles.btnCntr}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    width: "100%",
    backgroundColor: "#FFFBF8",
    // display: "flex",
    // padding: 10,
  },
  box: {
    borderRadius: 20,
    width: "100%",
    height: 179,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#C5A1F3",
  },
  boxText: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 40,
    color: "#F2F2F2",
  },
  btnText: {
    color: "#C5A1F3",
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "bold",
  },
  mainbox: {
    width: "87%",
    height: "75%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnCntr: {
    width: "87%",
    alignItems: "flex-start",
  },
  btn: {
    width: widthPercentage(72),
    height: heightPercentage(27),
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: Platform.OS === "android" ? StatusBar.currentHeight : hp(2),
  },
  body: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  mainLogo: {
    width: widthPercentage(90),
    height: heightPercentage(87),
    marginLeft: 5,
    marginTop: 30,
    marginRight: 10,
  },
  logo: {
    width: widthPercentage(45),
    height: heightPercentage(45),
    backgroundColor: "#A098FD",
    borderRadius: 45,
  },
  headerText: {
    color: "#464D46",
    fontSize: fontPercentage(24),
    fontWeight: "bold",
  },
  camera: {
    width: wp(45),
    height: hp(15),
    backgroundColor: "#F66C6C",
    borderRadius: 20,
    marginLeft: 5,
  },
  name: {
    flexDirection: "row",
    backgroundColor: "#F1DFFF",
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#C5A1F3",
    marginHorizontal: SIZES.padding,
  },
  userName: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "NanumSquareRoundB",
    fontSize: hp(2),
    lineHeight: 22,
  },
  records: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: hp(2),
    marginHorizontal: SIZES.padding,
  },
  rButton1: {
    width: wp(33),
    height: hp(5),
    borderRadius: 40,
    backgroundColor: "#FF8C73",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(3),
  },
  rButton2: {
    width: wp(33),
    height: hp(5),
    borderRadius: 40,
    backgroundColor: "#FEBB61",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(3),
  },
  buttonText: {
    fontFamily: "NanumSquareRoundB",
    color: "black",
    fontSize: hp(2),
    textAlign: "center",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: SIZES.padding,
  },
  titleText: {
    color: COLORS.darkGray,
    fontFamily: "Cafe24Ssurround",
    fontSize: fontPercentage(20),
  },
  cameraBlock: {
    paddingVertical: SIZES.padding,
    width: wp(100),
    height: hp(20),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.padding,
    marginVertical: hp(2),
  },
  storyBlock: {
    paddingVertical: SIZES.padding,
    width: wp(100),
    height: hp(30),
    display: "flex",
    justifyContent: "space-around",
    marginVertical: hp(2),
  },
  item: {
    marginRight: 10,
    width: 204,
    height: 145,
    display: "flex",
    alignItems: "center",
    borderRadius: 30,
  },
  itemPhoto: {
    width: 195,
    height: 104,
    borderRadius: 20,
  },
  itemText: {
    color: "gray",
    marginVertical: hp(1),
    fontSize: hp(1.5),
  },
});
const BackCntr = styled.TouchableOpacity`
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: row;
  margin-bottom: 7%;
`;

const BackIcon = styled.Text`
  width: 100%;
  font-size: 18px;
`;
