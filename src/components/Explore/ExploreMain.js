import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { preURL } from "../../preURL/preURL";
import Loader from "../Loader/Loader";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { COLORS, SIZES } from "../../constants";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../constants/responsive";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Tts from "react-native-tts";

// tts 설정
Tts.setDefaultLanguage("ko-KR");
Tts.addEventListener("tts-start", (event) => console.log("start", event));
Tts.addEventListener("tts-finish", (event) => console.log("finish", event));
Tts.addEventListener("tts-cancel", (event) => console.log("cancel", event));

const _onPressSpeech = (word) => {
  Tts.stop();
  Tts.speak(word);
};

const ListItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => _onPressSpeech(item.word)}>
      <View style={styles.item}>
        <Image
          source={{
            uri: item.link,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.word}</Text>
      </View>
    </TouchableOpacity>
  );
};

const StoryMain = ({ navigation }) => {
  const [userId, setuserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await fetch(preURL + "/image/show", {
        method: "POST",
        body: JSON.stringify({ userId: 1 }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const responseJson = await response.json();
        setUserData(responseJson);
        setLoading(false);
      } else {
        setLoading(false);
        alert("unable to get UserData");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.header}>
        <Image
          style={styles.mainLogo}
          source={require("../../assets/icons/MainLogo.png")}
        />
        <Text style={styles.headerText}>마리모와 말의 세계</Text>
      </View>
      <View>
        <View style={styles.name}>
          <Image
            style={styles.logo}
            source={require("../../assets/icons/Logo.png")}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginRight: widthPercentage(45),
            }}
          >
            <Text style={styles.userName}>강알쥐알쥐</Text>
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
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>찰칵, 카메라를 눌러서 찾아봐요!</Text>
          <TouchableOpacity>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraBlock}>
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            <Image
              style={styles.camera}
              source={require("../../assets/camera.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>내가 찾은 추억창고</Text>
          <TouchableOpacity>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.storyBlock}>
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              contentContainerStyle={{ paddingHorizontal: 10 }}
              stickySectionHeadersEnabled={false}
              sections={SECTIONS}
              renderSectionHeader={({ section }) => (
                <>
                  {section.horizontal ? (
                    <FlatList
                      horizontal
                      data={userData.length ? userData : section.data}
                      renderItem={({ item }) => <ListItem item={item} />}
                      keyExtractor={(item) => `${item.id}`}
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

const SECTIONS = [
  {
    title: "Made for you",
    horizontal: true,
    data: [
      {
        id: 1,
        word: "데이터를 불러올 수 없습니다.",
        uri: "https://picsum.photos/id/1/200",
        route: "StoryLoading",
      },
      {
        id: 2,
        word: "데이터를 불러올 수 없습니다.",
        uri: "https://picsum.photos/id/10/200",
        route: "StoryLoading",
      },

      {
        id: 3,
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
