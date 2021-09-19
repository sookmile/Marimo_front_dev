import React, { useRef } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RNCamera } from "react-native-camera";

const Practice = () => {
  //   const camera = useRef(null);

  //   const Submit = async () => {
  //     if (camera) {
  //       const { uri, codec = "mp4" } = await camera.current.recordAsync();
  //       console.info(uri);
  //     }
  //   };
  //   const Stop = () => {
  //     camera.current.stopRecording();
  //   };

  //   const RNCam = () => {
  //     return (
  //       <>
  //         <RNCamera
  //           ref={(ref) => {
  //             camera = ref;
  //           }}
  //           style={styles.preview}
  //           type={RNCamera.Constants.Type.front}
  //           flashMode={RNCamera.Constants.FlashMode.off}
  //           androidCameraPermissionOptions={{
  //             title: "Permission to use camera",
  //             message: "We need your permission to use your camera",
  //             buttonPositive: "Ok",
  //             buttonNegative: "Cancel",
  //           }}
  //           androidRecordAudioPermissionOptions={{
  //             title: "Permission to use audio recording",
  //             message: "We need your permission to use your audio",
  //             buttonPositive: "Ok",
  //             buttonNegative: "Cancel",
  //           }}
  //         />
  //       </>
  //     );
  //   };
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
          {/* <TouchableOpacity onPress={RNCam}>
            <Text>입모양 확인하기</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Practice;

const styles = StyleSheet.create({
  word: {
    width: 70,
    height: 35,
    top: "10%",
    left: "43%",
    backgroundColor: "#FACE34",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: 55,
  },
  cameraContainer: {
    zIndex: 2,
    flex: 1,
    flexDirection: "column",
  },
});
