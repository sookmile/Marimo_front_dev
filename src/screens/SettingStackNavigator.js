import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "./Settings/SettingScreen";
import CreditPage from "./Settings/CreditPage";
import Details from "./Settings/Details";
import PrivacyPolicy from "./Settings/PrivacyPolicy";

const SettingStack = createStackNavigator();

const SettingStackNavigator = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="Privacy"
        component={PrivacyPolicy}
        options={{ headerShown: true, title: "개인정보 처리방침" }}
      />
      <SettingStack.Screen
        name="CreditPage"
        component={CreditPage}
        options={{ headerShown: true, title: "오픈 소스 라이브러리" }}
      />
      <SettingStack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: true, title: "오픈 소스 라이브러리" }}
      />
    </SettingStack.Navigator>
  );
};

export default SettingStackNavigator;
