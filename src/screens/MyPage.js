import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LearnRecord from "../components/Mypage/LearnRecord";
const StartStack = createStackNavigator();

const Mypage = () => {
  const userName = "";
  return (
    <StartStack.Navigator>
      <StartStack.Screen
        name="Record"
        component={LearnRecord}
        options={{ headerShown: false }}
      />
    </StartStack.Navigator>
  );
};

export default Mypage;
