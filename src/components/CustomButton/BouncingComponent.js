import React, { Component } from "react";
import { Animated, PanResponder, View, StyleSheet } from "react-native";
import { icons, images } from "../../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class BouncingComponent extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.spring(this.state.animation, {
      toValue: hp(1.5),
      duration: 3000,
      friction: 1,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }
  render() {
    const trans = {
      transform: [{ translateY: this.state.animation }],
    };
    return (
      <Animated.Image
        style={[style.icons, trans]}
        source={images.marimoCharacter}
        resizeMode="contain"
      ></Animated.Image>
    );
  }
}

const style = StyleSheet.create({
  icons: {
    width: 130,
    height: 130,
    position: "relative",
    left: wp(2),
  },
});
