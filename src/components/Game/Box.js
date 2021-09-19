import React, { Component } from "react";
import { View, Image } from "react-native";
import { array, object, string } from "prop-types";

export default class Box extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
        }}
      >
        <Image
          source={this.props.texture}
          style={{ width: "100%", height: "100%" }}
          resizeMode={"stretch"}
        />
      </View>
    );
  }
}

Box.propTypes = {
  size: array,
  body: object,
  color: string,
};
