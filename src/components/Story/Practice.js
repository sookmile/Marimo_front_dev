"use strict";
import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { ENDPOINT } from "./Config";
import CameraRoll from "@react-native-community/cameraroll";

export default class RecordVideo extends Component {
  constructor() {
    super();

    this.state = {
      recording: false,
      processing: false,
    };
  }
  render() {
    const { recording, processing } = this.state;

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.capture}
      >
        <Text style={{ fontSize: 14 }}> RECORD </Text>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}> STOP </Text>
        </TouchableOpacity>
      );
    }

    // if (processing) {
    //   button = (
    //     <View style={styles.capture}>
    //       <ActivityIndicator animating size={18} />
    //     </View>
    //   );
    // }

    return (
      <View>
        <ImageBackground
          source={require("../../assets/images/story/practice.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        >
          <View style={styles.word}>
            <Text>장미꽃</Text>
          </View>

          <View></View>
          <View style={styles.cameraContainer}>
            <View style={styles.container}>
              <RNCamera
                ref={(ref) => {
                  this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.off}
                permissionDialogTitle={"Permission to use camera"}
                permissionDialogMessage={
                  "We need your permission to use your camera phone"
                }
              />
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {button}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  async startRecording() {
    this.setState({ recording: true });
    // default to mp4 for android as codec is not set
    const { uri, codec = "mp4" } = await this.camera.recordAsync();
    this.setState({ recording: false, processing: true });
    const type = `video/${codec}`;

    const data = new FormData();
    data.append("video", {
      name: "mobile-video-upload",
      type,
      uri,
    });
    const URI = data._parts[0][1].uri;
    console.log(URI);

    const result = await CameraRoll.save(URI, {
      type: "video",
      album: "Marimo",
    });
    console.log("result", result);

    try {
      const res = await fetch(ENDPOINT, {
        method: "post",
        body: data,
      });
    } catch (e) {
      console.error(e);
    }

    this.setState({ processing: false });
  }

  stopRecording() {
    this.camera.stopRecording();
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    top: 50,
    left: 450,
    flexDirection: "column",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});
