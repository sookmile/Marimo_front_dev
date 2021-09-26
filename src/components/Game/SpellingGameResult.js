import * as React from "react";
import {
  View,
  Text,
  Stylesheet,
  Button,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function SpellingGameResult({ route, navigation }) {
  const { userNickname, userId, score, length } = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.white,
          width: "90%",
          borderRadius: 20,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            fontFamily: "NanumSquareRoundB",
            color: "#E86565",
            marginBottom: hp(1),
          }}
        >
          우와, 대단해요!
        </Text>
        <View
          style={{
            backgroundColor: COLORS.bgPurple,
            width: "90%",
            borderRadius: 20,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, fontFamily: "NanumSquareRoundB" }}>
            {userNickname ? userNickname : "송이"}의 최종 점수는
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: score > length / 2 ? "green" : "red",
              }}
            >
              {score}
            </Text>
          </View>
        </View>
        {/* Retry Quiz button */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              backgroundColor: COLORS.primary,
              marginTop: SIZES.radius,
              width: wp(25),
              height: hp(4),
              justifyContent: "center",
              marginHorizontal: 5,
            }}
            onPress={() => postGameResult() && navigation.navigate("GameMain")}
          >
            <Text style={{ color: COLORS.white, textAlign: "center" }}>
              홈으로 돌아가기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              backgroundColor: "#9CCDFA",
              marginTop: SIZES.radius,
              width: wp(20),
              justifyContent: "center",
              marginHorizontal: 5,
            }}
            onPress={navigation.navigate("SpellingGame")}
          >
            <Text style={{ textAlign: "center" }}>다시 하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              backgroundColor: "#FA9C9C",
              marginTop: SIZES.radius,
              width: wp(23),
              justifyContent: "center",
              marginHorizontal: 5,
            }}
            onPress={() => navigation.navigate("GameRank")}
          >
            <Text style={{ textAlign: "center" }}>랭킹 확인하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SpellingGameResult;
