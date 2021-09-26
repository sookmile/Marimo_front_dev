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
import { COLORS } from "../../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function SpellingGameResult({ props, navigation }) {
  const { showScoreModal, ...attributes } = props;
  return (
    <Modal animationType="slide" transparent={true} visible={showScoreModal}>
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
              송이의 최종 점수는
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
                  color: score > questions.length / 2 ? "green" : "red",
                }}
              >
                {score}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.black,
                }}
              >
                / {questions.length}
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
                paddingVertical: hp(1),
                paddingHorizontal: wp(2),
                marginHorizontal: wp(1),
              }}
              onPress={() => navigation.navigate("GameMain")}
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
                paddingVertical: hp(1),
                paddingHorizontal: wp(2),
              }}
              onPress={restartQuiz}
            >
              <Text>다시 하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                backgroundColor: "#FA9C9C",
                marginTop: SIZES.radius,
                paddingVertical: hp(1),
                paddingHorizontal: wp(2),
              }}
              onPress={() => navigation.navigate("GameRank")}
            >
              <Text>랭킹 확인하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default SpellingGameResult;
