import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import {
  FONTS,
  COLORS,
  SIZES,
  icons,
  images,
  dummyData,
} from "../../constants";

const ExploreMain = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View style={styles.container_header}>
        {/* Images */}
        <TouchableOpacity>
          <Image source={icons.marimo_logo} />
        </TouchableOpacity>
        {/* Text */}
        <View style={styles.container_headerText}>
          <Text style={styles.titleText}>마리모와 말의 세계</Text>
        </View>
      </View>
    );
  };

  const renderUserInfo = () => {
    return (
      <View style={styles.container_userInfo}>
        {/* Icon */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={icons.userIcon} style={{ width: 40, height: 40 }} />
        </View>

        {/* Text */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.userNameText}>서영</Text>
        </View>
        <View
          style={{
            marginHorizontal: SIZES.padding,
          }}
        />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.container_button}>
        <TouchableOpacity
          onPress={() => console.log("나의 가록들")}
          style={styles.button1}
        >
          <Text style={styles.buttonText}>나의 기록들</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("나의 가록들")}
          style={styles.button2}
        >
          <Text style={styles.buttonText}>친구 등록하기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderExploreCamera = () => {
    return (
      <View
        style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}
      >
        <Text style={styles.titleText}>찰칵, 카메라를 눌러서 찾아봐요!</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            <View style={styles.container_cameraButton}>
              <Image
                source={icons.camera_ic}
                style={{ width: 120, height: 120 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMyMemories = () => {
    return (
      <View
        style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}
      >
        <Text style={styles.titleText}>나의 추억창고</Text>

        <FlatList
          data={dummyData.myMemories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginLeft: SIZES.padding,
                  marginVertical: SIZES.padding,
                }}
              >
                <TouchableOpacity>
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    style={{ width: 180, height: 110 }}
                  />
                </TouchableOpacity>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ textAlign: "center", ...FONTS.body3 }}>
                    {item.name}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}
      {renderUserInfo()}
      {renderButtons()}
      {/* Camera Icon */}
      {renderExploreCamera()}
      {/* Memory list */}
      {renderMyMemories()}
    </SafeAreaView>
  );
};

export default ExploreMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_header: {
    flexDirection: "row",
    marginTop: SIZES.padding,
    alignItems: "center",
    paddingLeft: SIZES.padding,
    height: 20,
  },
  container_headerText: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  titleText: {
    color: COLORS.darkGray,
    ...FONTS.h3,
  },
  container_userInfo: {
    flexDirection: "row",
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderRadius: 20,
    backgroundColor: COLORS.bgPurple,
    borderColor: COLORS.purple,
    borderWidth: 3,
  },
  userNameText: {
    fontFamily: "Cafe24Ssurround",
    color: COLORS.black,
    fontSize: 25,
  },
  container_button: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 25,
  },
  button1: {
    width: "40%",
    height: "65%",
    borderRadius: 20,
    marginTop: SIZES.radius,
    justifyContent: "center",
    marginHorizontal: 10,
    backgroundColor: "#FF8C73",
  },
  button2: {
    width: "40%",
    height: "65%",
    borderRadius: 20,
    marginTop: SIZES.radius,
    backgroundColor: "#FEBB61",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    fontFamily: "Cafe24Ssurround",
    color: COLORS.black,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 22,
  },
  container_cameraButton: {
    backgroundColor: "#F66C6C",
    width: 200,
    height: 120,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
