import React from "react";
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
import { fontPercentage } from "../../constants/responsive";
import { SIZES, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { UserHeader } from "../UserHeader";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const ListItem1 = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
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

const ListItem2 = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
      <View style={styles.friend}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.friendPic}
          resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const GameMain = () => {
  const navigation = useNavigation();
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
          <TouchableOpacity
            onPress={() => navigation.navigate("LearnRecord")}
            style={styles.rButton1}
          >
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
          <Text style={styles.titleText}>슝슝슝, 게임하면서 놀아요!</Text>
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
                      renderItem={({ item }) => <ListItem1 item={item} />}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : null}
                </>
              )}
              renderItem={({ item, section }) => {
                if (section.horizontal) {
                  return null;
                }
                return <ListItem1 item={item} />;
              }}
            />
          </SafeAreaView>
        </View>
      </View>
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>나의 친구들</Text>
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
                      renderItem={({ item }) => <ListItem2 item={item} />}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : null}
                </>
              )}
              renderItem={({ item, section }) => {
                if (section.horizontal) {
                  return null;
                }
                return <ListItem2 item={item} />;
              }}
            />
          </SafeAreaView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameMain;

const SECTIONS1 = [
  {
    title: "Made for you",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "누가누가 잘하나, 재미있는 자음게임",
        uri: "https://picsum.photos/id/1/200",
        route: "",
      },
      {
        key: "2",
        text: "동물 친구들의 초성 게임",
        uri: "https://picsum.photos/id/10/200",
        route: "SpellingGameContainer",
      },

      {
        key: "3",
        text: "충치를 막아라, 치카치카 방어대",
        uri: "https://picsum.photos/id/1002/200",
        route: "",
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
        text: "연우",
        uri: "https://picsum.photos/id/1/200",
        route: "",
      },
      {
        key: "2",
        text: "하준",
        uri: "https://picsum.photos/id/10/200",
        route: "",
      },

      {
        key: "3",
        text: "지아",
        uri: "https://picsum.photos/id/1002/200",
        route: "",
      },
      {
        key: "4",
        text: "세빈",
        uri: "https://picsum.photos/id/1002/200",
        route: "",
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
    height: 200,
    display: "flex",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  item: {
    marginRight: 10,
    width: 140,
    height: heightPercentageToDP(35),
    display: "flex",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FAEBFF",
  },
  // item: {
  //   marginRight: 10,
  //   width: 140,
  //   height: 195,
  //   backgroundColor: "#FAEBFF",
  //   display: "flex",
  //   alignItems: "center",
  //   borderRadius: 30,
  // },
  itemPhoto: {
    width: 140,
    height: 135,
    borderRadius: 20,
  },
  itemText: {
    textAlign: "center",
    paddingHorizontal: 5,
    color: "gray",
    marginTop: 10,
    fontFamily: "NanumSquareRoundB",
    fontSize: widthPercentageToDP(3.5),
  },
  friend: {
    width: 85,
    height: 105,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  friendPic: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
