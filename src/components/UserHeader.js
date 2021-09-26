import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import {
  widthPercentage,
  heightPercentage,
  fontPercentage,
} from "../constants/responsive";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { images, icons, SIZES, COLORS } from "../constants";
export const UserHeader = (props) => {
  const { userNickname } = props;
  return (
    <>
      <View style={styles.header}>
        <Image
          style={styles.mainLogo}
          source={require("../assets/icons/MainLogo.png")}
        />
        <Text style={styles.headerText}>마리모와 말의 세계</Text>
      </View>
      <View>
        <View style={styles.name}>
          <Image style={styles.logo} source={icons.marimo_logo} />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginRight: widthPercentage(45),
            }}
          >
            <Text style={styles.userName}>
              {userNickname ? userNickname : "송이"}
            </Text>
          </View>
        </View>
        <View style={styles.records}>
          <TouchableOpacity style={styles.rButton1}>
            <Text style={styles.buttonText}>나의 기록들</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rButton2}>
            <Text style={styles.buttonText}>친구 등록하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    // display: "flex",
    // padding: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
    marginVertical:
      Platform.OS === "android" ? StatusBar.currentHeight + hp(1) : hp(2),
  },
  mainLogo: {
    width: widthPercentage(35),
    height: heightPercentage(35),
    marginLeft: 5,
    marginRight: 10,
  },
  logo: {
    width: widthPercentage(45),
    height: heightPercentage(45),
    backgroundColor: "#A098FD",
    borderRadius: 45,
  },
  headerText: {
    paddingLeft: widthPercentage(14),
    color: "#464D46",
    fontSize: fontPercentage(18),
    fontFamily: "Cafe24Ssurround",
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
