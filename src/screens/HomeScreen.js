import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StoryLoading from "../components/Story/StoryLoading";
import StoryMain from "../components/Story/StoryMain";
import StoryOne from "../components/Story/StoryOne";
import Practice from "../components/Story/Practice";
import LearnRecord from "../components/Mypage/LearnRecord";
import Home from "../components/Home/Home";
import Story from "./StoryScreen";
const StoryStack = createStackNavigator();

const HomeScreen = () => {
  return (
    <StoryStack.Navigator>
      <StoryStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </StoryStack.Navigator>
  );
};

export default HomeScreen;
