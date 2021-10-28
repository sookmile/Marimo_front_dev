import React, { useState, useLayoutEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  PermissionsAndroid,
} from "react-native";
import { RNCamera } from "react-native-camera";
import LinearGradient from "react-native-linear-gradient";
import preURL from "../../preURL/preURL";
import Loader from "../Loader/Loader";
import Icon from "react-native-vector-icons/Ionicons";

const ExploreCamera = ({ navigation }) => {
  // for data to  send api
  const [image, setImage] = useState("");
  // for picture address
  const [url, seturl] = useState("");
  // for image data
  const [imageData, setImageData] = useState([]);
  const [processingImage, setprocessingImage] = useState(false);
  const cameraRef = React.useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.push("Main")}>
          <Icon
            name="chevron-back"
            style={{ marginRight: 10 }}
            size={23}
            color={"#FFFFFF"}
          ></Icon>
        </TouchableOpacity>
      ),
    });
  }, []);

  const onOpenCamera = () => {
    // start camera
    if (Platform.OS === "android") {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "'마리모'이(가) 카메라에 접근하려고 합니다.",
              message:
                "마리모에서 사용자의 카메라에 접근하려고 합니다. 자신이 찍은 사진을 추억 창고에 저장할 수 있습니다. 촬영된 사진은 다른 기기로 전송되지 않습니다.",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // if Camera permission is granted
            setshowCameraView(true);
          } else {
            alert(
              "카메라 권한이 허용되지 않았습니다. 기능을 사용하기 위해서는 카메라 기능을 승인하셔야 합니다."
            );
          }
        } catch (err) {
          alert("Camera Permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      setshowCameraView(true);
    }
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync({
        quality: 0.5,
      });
      console.log("data", data.uri);

      if (data) {
        seturl(data.uri);
        setprocessingImage(true);
        console.log("result", url);
        return data.uri;
      }
      return null;
    }
  };

  const postImage = async (url) => {
    console.log("post시작");
    console.log(url);
    const fd = new FormData();
    fd.append("image", {
      name: "picture.jpg",
      type: "image/jpeg",
      uri: url,
    });
    const response = await fetch(preURL.preURL + "/image/name", {
      method: "POST",
      body: fd,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        setprocessingImage(false);
        await setImageData(responseJson);
        console.log("ImageData: ", responseJson);
        if (responseJson) {
          setprocessingImage(false);
          navigation.navigate("Detail", {
            link: responseJson.link,
            word: responseJson.word,
          });
        } else {
          setprocessingImage(false);
          alert("이미지 설명 받아오지 못했습니다!");
          setImageData([]);
          seturl("");
        }
      })
      .catch((error) => {
        setprocessingImage(false);
        setImageData([]);
        seturl("");
        console.error(error);
      });
  };

  /* 카메라 페이지 */

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Loader loading={processingImage} />
        {onOpenCamera && (
          <>
            <RNCamera
              ref={cameraRef}
              style={styles.preview}
              captureAudio={false}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: "카메라 사용 권한",
                message:
                  "마리모에서 사용자의 카메라에 접근하려고 합니다. 자신이 찍은 사진을 추억 창고에 저장할 수 있습니다. 촬영된 사진은 다른 기기로 전송되지 않습니다.",
                buttonPositive: "승인",
                buttonNegative: "허용 안 함",
              }}
              androidRecordAudioPermissionOptions={{
                title: "Permission to use audio recording",
                message: "We need your permission to use your audio",
                buttonPositive: "Ok",
                buttonNegative: "Cancel",
              }}
            />
            <View style={{ position: "absolute", bottom: 15 }}>
              <TouchableOpacity
                onPress={async () => {
                  const newURL = await takePhoto();
                  console.log(newURL);
                  console.log("post전");
                  await seturl(newURL);
                  if (newURL) await postImage(newURL);
                  // post api
                  console.log("hello");
                }}
              >
                <View style={styles.snapButton}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={[
                      "rgba(255, 113, 113, 0.45)",
                      "rgba(177, 108, 246, 0.45)",
                    ]}
                    style={styles.innerSnapButton}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default ExploreCamera;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  snapButton: {
    flex: 0,
    width: 65,
    height: 65,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  innerSnapButton: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
});
