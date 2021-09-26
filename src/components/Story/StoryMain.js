import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { SIZES, COLORS } from "../../constants";
import { fontPercentage } from "../../constants/responsive";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Orientation from "react-native-orientation";
import { UserHeader } from "../UserHeader";

const ListItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("StoryLoading")}>
      <View style={styles.item}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const StoryMain = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(onOrientaionChange);
    return (
      () => {
        Orientation.unlockAllOrientations(),
          Orientation.removeOrientationListener(onOrientaionChange);
      },
      []
    );
  });
  const onOrientaionChange = (orientation) => {
    if (orientation === "LANDSCAPE") {
      Orientation.lockToPortrait();
    }
  };
  const userNickname = "송이";
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Image
          style={styles.mainLogo}
          source={require("../../assets/icons/MainLogo.png")}
        />
        <Text>마리모와 말의 세계</Text>
      </View>
      <View>
        <View style={styles.name}>
          <Image
            style={styles.logo}
            source={require("../../assets/icons/Logo.png")}
          />
          <Text style={styles.userName}>송이</Text>
        </View>
        <View style={styles.records}>
          <TouchableOpacity style={styles.rButton1}>
            <Text>나의 기록들</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rButton2}>
            <Text>친구 등록하기</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <UserHeader userNickname={userNickname} />
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>신나게 움직여요. 마리모 탐험대!</Text>
          <TouchableOpacity>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.storyBlock}>
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              contentContainerStyle={{ paddingHorizontal: 10 }}
              stickySectionHeadersEnabled={false}
              sections={SECTIONS1}
              renderSectionHeader={({ section }) => (
                <>
                  {section.horizontal ? (
                    <FlatList
                      horizontal
                      data={section.data}
                      renderItem={({ item }) => <ListItem item={item} />}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : null}
                </>
              )}
              renderItem={({ item, section }) => {
                if (section.horizontal) {
                  return null;
                }
                return <ListItem item={item} />;
              }}
            />
          </SafeAreaView>
        </View>
      </View>
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>이야기 속으로, 신비한 동화나라!</Text>
          <TouchableOpacity>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.storyBlock}>
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              contentContainerStyle={{ paddingHorizontal: 10 }}
              stickySectionHeadersEnabled={false}
              sections={SECTIONS2}
              renderSectionHeader={({ section }) => (
                <>
                  {section.horizontal ? (
                    <FlatList
                      horizontal
                      data={section.data}
                      renderItem={({ item }) => <ListItem item={item} />}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : null}
                </>
              )}
              renderItem={({ item, section }) => {
                if (section.horizontal) {
                  return null;
                }
                return <ListItem item={item} />;
              }}
            />
          </SafeAreaView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StoryMain;

const SECTIONS1 = [
  {
    title: "Made for you",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "앗, 도와줘! 우당탕탕 왕국 모험",
        uri: "https://picsum.photos/id/1/200",
        route: "Story1",
      },
      {
        key: "2",
        text: "마리모 친구들의 얼음성 대탐험!",
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

const SECTIONS2 = [
  {
    title: "Made for you",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "이상한 나라의 앨리스",
        uri: "https://picsum.photos/id/1/200",
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
    zIndex: -1,
    display: "flex",
    padding: 10,
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
    height: 145,
    display: "flex",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  item: {
    marginRight: 10,
    width: 204,
    height: 145,
    backgroundColor: "#FAEBFF",
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
    textAlign: "center",
    paddingHorizontal: 5,
    color: "gray",
    marginTop: 10,
    fontFamily: "NanumSquareRoundB",
    fontSize: wp(3.5),
  },
});
