import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, navTabIcons } from "../constants/index";
import SettingScreen from "./SettingScreen";
import Explore from "./ExploreScreen";
import Game from "./GameScreen";
import Story from "./StoryScreen";
import Mypage from "./MyPage";
import HomeScreen from "./HomeScreen";
const Tab = createBottomTabNavigator();

/*const tabOptions = {
  style: {
    backgroundColor: '#EDE7F5',
    height: 64',
  },
};*/

const NavTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: "8%",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFEFD",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <Image
                source={navTabIcons.ic_home}
                resizeMode="contain"
                style={styles.icons}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={Mypage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <Image
                source={navTabIcons.ic_record}
                resizeMode="contain"
                style={styles.icons}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <Image
                source={navTabIcons.ic_setting}
                resizeMode="contain"
                style={styles.icons}
              />
            </View>
          ),
        }}
      />
      {/*<Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <Image
                source={icons.SettingScreen_ic}
                resizeMode="contain"
                style={styles.icons}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray,
                  fontWeight: focused ? "bold" : "normal",
                }}
              >
                설정
              </Text>
            </View>
          ),
        }}
      />*/}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    width: 30,
    height: 30,
  },
});

export default NavTabs;
