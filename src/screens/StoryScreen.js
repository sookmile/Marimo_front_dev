import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StoryLoading from "../components/Story/StoryLoading";
import StoryMain from "../components/Story/StoryMain";
import StoryOne from "../components/Story/StoryOne";
import Practice from "../components/Story/Practice";
import LearnRecord from "../components/Mypage/LearnRecord";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
const StoryStack = createStackNavigator();

const Story = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
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
