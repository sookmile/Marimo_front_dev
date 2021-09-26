import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StoryLoading from "../components/Story/StoryLoading";
import StoryMain from "../components/Story/StoryMain";
import StoryOne from "../components/Story/StoryOne";
import Practice from "../components/Story/Practice";
import LearnRecord from "../components/Mypage/LearnRecord";
const StoryStack = createStackNavigator();

const Story = () => {
  return (
    <StoryStack.Navigator>
      <StoryStack.Screen
        name="StoryMain"
        component={StoryMain}
        options={{ headerShown: false }}
      />
      <StoryStack.Screen
        name="StoryLoading"
        component={StoryLoading}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <StoryStack.Screen
        name="Story1"
        component={StoryOne}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <StoryStack.Screen
        name="Practice"
        component={Practice}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <StoryStack.Screen
        name="LearnRecord"
        component={LearnRecord}
        options={{ headerShown: false, tabBarVisible: false }}
      />
    </StoryStack.Navigator>
  );
};

export default Story;
