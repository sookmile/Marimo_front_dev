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
    characterImage: images.marimoCharacter,
  };

  componentDidMount() {
    Animated.spring(this.state.animation, {
      toValue: hp(2),
      duration: 3000,
      friction: 1,
      tension: 4,
      useNativeDriver: true,
    }).start();
  }
  render() {
    const { characterNum } = this.props;
    this.state.characterImage =
      characterNum == 1 ? images.mallangCharacter : images.marimoCharacter;
    const trans = {
      transform: [{ translateY: this.state.animation }],
    };
    return (
      <Animated.Image
        style={[style.icons, trans]}
        source={this.state.characterImage}
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
    marginBottom: 10,
  },
});
