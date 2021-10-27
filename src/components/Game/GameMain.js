import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { navTabIcons } from "../../constants";
import { fontPercentage, heightPercentage } from "../../constants/responsive";
import { useNavigation } from "@react-navigation/native";
import Orientation from "react-native-orientation";
import { UserHeader } from "../UserHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components";

const ContnetSubCntr = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background: #f5e7f8;
  border-radius: 23;
  justify-content: space-between;
  align-items: center;
  display: flex;
  elevation: 10;
  flex-direction: row;
  padding-vertical: 1.5%;
  padding-horizontal: 2.5%;
`;
const ChImage = styled(Image)`
  width: 20%;
`;
const ContentTexts = styled.View`
  width: 65%;
`;
const ContentTitle = styled.Text`
  font-family: NanumSquareRoundB;
  margin-bottom: 15;
  color: #000000;
  overflow: hidden;
`;

const ContentText = styled.Text`
  font-family: NotoSansCJKkr-Regular;
  font-weight: ${(props) => (props.isTitle ? "700" : "400")};
  margin-bottom: ${(props) => (props.isTitle ? 15 : 0)};
  font-size: 14px;
  line-height: 23px;
  color: #434141;
`;

const GameMain = () => {
  const [userNickname, setUserNickName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(onOrientaionChange);
    return () => {
      Orientation.unlockAllOrientations(),
        Orientation.removeOrientationListener(onOrientaionChange);
    };
  }, []);
  const onOrientaionChange = (orientation) => {
    if (orientation === "LANDSCAPE-RIGHT") {
      console.log(orientation);
      Orientation.lockToLandscapeLeft();
    }
  };
  useEffect(async () => {
    const Nickname = await AsyncStorage.getItem("userNickname");
    const id = await AsyncStorage.getItem("userId");
    console.log(Nickname);
    setUserNickName(Nickname);
  }, []);

  //아이템 렌더링
  const renderItem = ({ item }) => {
    const navigation = useNavigation();
    return (
      <View
        key={item.key}
        style={{
          width: "100%",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 16,
          height: "30%",
        }}
      >
        <ContnetSubCntr
          onPress={() =>
            item.router === "null"
              ? setModalVisible(true)
              : navigation.navigate(`${item.router}`)
          }
        >
          <Image
            style={{ position: "absolute", top: "2%", left: "1%" }}
            source={require("../../assets/icons/ic_ellipse.png")}
          />
          <ChImage
            style={{
              borderRadius: 20,
              width: "26%",
              height: "94%",
            }}
            source={item.src}
          />
          <ContentTexts>
            <ContentTitle
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: fontPercentage(18),
                marginBottom: heightPercentage(10),
              }}
            >
              {item.text}
            </ContentTitle>
            <ContentText style={{ fontSize: fontPercentage(14) }}>
              추천 연령 : {item.age}세
            </ContentText>
          </ContentTexts>
        </ContnetSubCntr>
      </View>
    );
  };

  // 모달
  const AlarmModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Image
                source={navTabIcons.ic_Mgame}
                style={{ height: 110, width: 110 }}
                resizeMode="center"
              />
            </View>
            <Text style={styles.modalText}>
              12월 정식출시 이후로 사용할 수 있어요!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>확인했습니다!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFFBF8" }}>
      <View style={styles.container}>
        {AlarmModal()}
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
            type={"game"}
            userNickname={userNickname}
          />
          <View
            style={{
              width: "92%",
              height: "55%",
              marginBottom: "5%",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flex: 1,
                marginBottom: 5,
                height: "100%",
                marginTop: "10%",
              }}
            >
              <View
                style={{
                  display: "flex",
                }}
              >
                <StudyTxt
                  style={{
                    color: "#464D46",
                    fontSize: fontPercentage(22),
                    fontFamily: "Cafe24Ssurround",
                    marginTop: "3%",
                  }}
                >
                  추천 학습
                </StudyTxt>
              </View>
              <View
                stlye={{
                  flex: 1,
                  marginTop: StatusBar.currentHeight || 0,
                  marginBottom: 5,
                }}
              >
                {SECTIONS3.map((item) => renderItem({ item }))}
              </View>
            </View>
            <View style={{ height: 50 }}></View>
          </View>
        </View>
      </View>
      <Wrapper />
    </ScrollView>
  );
};

export default GameMain;

const SECTIONS3 = [
  {
    key: "1",
    text: "냠냠 맛있는 모음게임",
    age: "6~7",
    src: navTabIcons.cv_game,
    router: "SpellingGameContainer",
  },
  {
    key: "2",
    text: "동물 친구들의 초성게임",
    age: "7~8",
    src: navTabIcons.ic_game2,
    router: "null",
  },
  {
    key: "3",
    text: "충치를 막아라, 치카치카 방어대",
    src: navTabIcons.ic_game3,
    age: "7~8",
    router: "null",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 10,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#FFD74B",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Cafe24Ssurround",
    fontSize: 18,
    color: "#464D46",
  },
});

const StudyTxt = styled.Text`
  color: #191919;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 100;
`;
