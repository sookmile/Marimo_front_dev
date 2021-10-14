import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "./SettingScreen";
import { CreditPage } from "./CreditPage";

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
        name="CreditPage"
        component={CreditPage}
        options={{ headerShown: true, title: "오픈 소스 라이브러리" }}
      />
    </SettingStack.Navigator>
  );
};

export default SettingStackNavigator;
