import React, { useState, useRef } from "react";
import { Animated, View, Image } from "react-native";
import Svg from "react-native-svg";
import { images } from "../../constants";

export const GameScore = ({ item, style }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const reverseOpacity = useRef(new Animated.Value(0)).current;
  const [liked, setLiked] = useState(false);

  const like = (value) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(value ? opacity : reverseOpacity, {
          toValue: 0,
          duration: 90,
          useNativeDriver: true,
        }),
        Animated.timing(value ? reverseOpacity : opacity, {
          toValue: 1,
          duration: 90,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    setLiked(value);
  };

  if (!like) {
    return (
      <View>
        <Animated.View
          style={{
            transform: [{ scale }],
            justifyContent: "center",
            alignItems: "center",
            ...style,
            ...style,
            opacity: opacity,
          }}
        >
          <Svg style={{ width: 30, height: 30 }}>
            <Image width="100%" height="100%" source={images.scoreFailed} />
          </Svg>
        </Animated.View>
      </View>
    );
  } else {
    return (
      <View>
        <Animated.View
          style={{
            transform: [{ scale }],
            justifyContent: "center",
            alignItems: "center",
            ...style,
            position: "absolute",
            opacity: reverseOpacity,
          }}
        >
          <Svg style={{ width: 30, height: 30 }}>
            <Image width="100%" height="100%" source={images.scoreSuccess} />
          </Svg>
        </Animated.View>
      </View>
    );
  }
};

export default GameScore;
