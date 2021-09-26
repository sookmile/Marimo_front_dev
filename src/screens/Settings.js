import React, { useState } from "react";
import {
  Button,
  View,
  Switch,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function SettingScreen({ navigation }) {
  const [alarm, setAlarm] = useState(true);
  const alarmToggleSwitch = () => setAlarm((previousState) => !previousState);

  const [darkMode, setDarkMode] = useState(false);
  const darkToggleSwitch = () => setDarkMode((previousState) => !previousState);

  const [rountineModal, setRoutine] = useState(false);
  function SettingRoutine() {
    setRoutine(!rountineModal);
  }
  const [wakeupTimePicker, setWPickerMode] = useState(null);
  const [sleepTimePicker, setSPickerMode] = useState(null);
  const [wakeupTime, setWakeupTime] = useState(null);
  const [sleepTime, setSleepTime] = useState(null);

  const [alarmAttach, setAlarmAttach] = useState(false);

  const showWTimePicker = () => {
    setWPickerMode("time");
  };

  const showSTimePicker = () => {
    setSPickerMode("time");
  };

  const hideWPicker = () => {
    setWPickerMode(null);
  };
  const hideSPicker = () => {
    setSPickerMode(null);
  };

  const handleWConfirm = (time) => {
    hideWPicker();
    setWakeupTime(time);
  };

  const handleSConfirm = (time) => {
    hideSPicker();
    setSleepTime(time);
  };

  // 선택 버튼 1: 아침형, 2: 점심형, 3: 저녁형, 4: 새벽형
  const [selectItem, setSelect] = useState(null);
  function SettingChecked(item) {
    setSelect(item);
  }

  const getItemStyleTweaks = (key) => {
    let style;
    return {
      backgroundColor: getSelectedColor(key),
    };
  };

  const getSelectedColor = (key) => {
    let color = "#5E5E5E";
    if (key == selectItem) {
      color = "#4E5CF6";
    }
    return color;
  };

  function formatAMPM(date) {
    var hours = date.toString().slice(16, 18);
    var minutes = date.toString().slice(19, 21);
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 70) : (cntrMargin = 20);
  let chMargin = 0;
  Platform.OS === "ios" ? (chMargin = 40) : (chMargin = 20);
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFBF8" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 10,
          marginTop: cntrMargin,
        }}
      >
        <Text style={styles.mainTitle}>설정</Text>
        <View
          style={{ height: "52%", paddingHorizontal: 10, paddingVertical: 20 }}
        >
          <Text style={styles.contentTitle}>기본 설정</Text>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={styles.menu}>프리미엄 계정으로 변환</Text>
            <Icon
              name="chevron-forward"
              size={23}
              color={"#555555"}
              style={{ position: "absolute", right: 5, marginVertical: 10 }}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={styles.menu}>음성 설정</Text>
            <Icon
              name="chevron-forward"
              size={23}
              color={"#555555"}
              style={{ position: "absolute", right: 5, marginVertical: 10 }}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={SettingRoutine}
          >
            <Text style={styles.menu}>언어 설정</Text>
            <Icon
              name="chevron-forward"
              size={23}
              color={"#555555"}
              style={{ position: "absolute", right: 5, marginVertical: 10 }}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={styles.menu}>Push 알림 받기</Text>
            <Switch
              trackColor={{ false: "#E5E5E5", true: "#4E5CF6" }}
              thumbColor={alarm ? "white" : "#white"}
              onValueChange={alarmToggleSwitch}
              value={alarm}
              style={{
                position: "absolute",
                right: 0,
                marginVertical: 10,
                transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={styles.menu}>다크 모드</Text>
            <Switch
              trackColor={{ false: "#E5E5E5", true: "#4E5CF6" }}
              thumbColor={darkMode ? "white" : "#white"}
              onValueChange={darkToggleSwitch}
              value={darkMode}
              style={{
                position: "absolute",
                right: 0,
                marginVertical: 10,
                transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.line]}></Text>
        <View
          style={{ height: "48%", paddingHorizontal: 10, paddingVertical: 20 }}
        >
          <Text style={styles.contentTitle}>더 보기</Text>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={styles.menu}>도움말</Text>
            <Icon
              name="chevron-forward"
              size={23}
              color={"#555555"}
              style={{ position: "absolute", right: 5, marginVertical: 10 }}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={styles.menu}>이용 약관</Text>
            <Icon
              name="chevron-forward"
              size={23}
              color={"#555555"}
              style={{ position: "absolute", right: 5, marginVertical: 10 }}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={styles.menu}>버전 정보</Text>
            <Icon
              name="chevron-forward"
              size={23}
              color={"#555555"}
              style={{ position: "absolute", right: 5, marginVertical: 10 }}
            ></Icon>
          </TouchableOpacity>
          <Text style={styles.appInfo}>마리모 ver0.9.0</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainTitle: {
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    fontSize: 25,
    fontWeight: "bold",
    borderBottomColor: "#dedede",
  },
  subTitle: {
    paddingVertical: 10,
    fontSize: 17,
    color: "gray",
  },
  timeText: {
    fontSize: 15,
    color: "#555555",
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 3,
    color: "#555555",
    marginBottom: 15,
  },
  button: {
    width: "40%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 7,
    backgroundColor: "#4E5CF6",
  },
  option: {
    padding: 5,
    color: "white", // #626262
    fontWeight: "bold",
  },
  line: {
    fontSize: 1,
    borderTopWidth: 1,
    fontWeight: "bold",
    borderTopColor: "#dedede",
  },
  contentTitle: {
    position: "relative",
    fontSize: 17,
    color: "gray",
    marginBottom: 12,
  },

  menu: {
    fontSize: 16,
    marginVertical: 15,
  },
  appInfo: {
    marginTop: 10,
    color: "#666666",
  },
  modal: {
    height: "57%",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
});
export default SettingScreen;
