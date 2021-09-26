import React, { useMemo, useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  Text,
  Animated,
  Easing,
} from "react-native";
import { images } from "../../constants";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const imageSize = {
  width: 996,
  height: 256,
};

const screenWidth = Dimensions.get("screen").width;
const animatedWidth = screenWidth + imageSize.width;

const translateIn = {
  inX: -(Dimensions.get("window").width + imageSize.width),
};

export const AnimatedBackground = () => {
  const inicialValue = 0;
  const translateValue = new Animated.Value(inicialValue);

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(inicialValue);
      Animated.timing(translateValue, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateX = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -imageSize.width],
  });

  const AnimetedImage = Animated.createAnimatedComponent(BackgroundImage);

  return (
    <AnimetedImage
      source={images.gameBackground}
      resizeMode="cover"
      style={{
        zIndex: 10,
        transform: [{ translateX }],
      }}
      translateIn={translateIn}
    />
  );
};
export default AnimatedBackground;

export const BackgroundImage = styled.ImageBackground.attrs((props) => ({
  imageStyle: {
    width: "400%",
    height: "400%",
  },
}))`
  position: absolute;
  top: -100%;
  left: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: 0.9;
`;
