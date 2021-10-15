import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "react-native-splash-screen";

// Contents
import Start from "./src/screens/StartScreen";
import Story from "./src/screens/StoryScreen";
import Game from "./src/screens/GameScreen";
// Screens
import Explore from "./src/screens/ExploreScreen";
import SettingScreen from "./src/screens/SettingScreen";
// Story
import StoryLoading from "./src/components/Story/StoryLoading";
import StoryMain from "./src/components/Story/StoryMain";
import StoryOne from "./src/components/Story/StoryOne";
import Practice from "./src/components/Story/Practice";
// Game
import SpellingGame from "./src/components/Game/SpellingGame";
import GameMain from "./src/components/Game/GameMain";
import SpellingGameContainer from "./src/components/Game/SpellingGameContainer";
//Tabs
import NavTab from "./src/screens/NavTabs";

const MainStack = createStackNavigator();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={"Home"}
        headerMode="none"
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="NavTab"
          component={NavTab}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Story"
          component={Story}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Game"
          component={Game}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Explore"
          component={Explore}
          options={{ headerShown: false }}
        />

        <MainStack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="StoryMain"
          component={StoryMain}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="StoryLoading"
          component={StoryLoading}
          options={{ headerShown: false, tabBarVisible: false }}
        />
        <MainStack.Screen
          name="Story1"
          component={StoryOne}
          options={{ headerShown: false, tabBarVisible: false }}
        />
        <MainStack.Screen
          name="Practice"
          component={Practice}
          options={{ headerShown: false, tabBarVisible: false }}
        />

        <MainStack.Screen
          name="GameMain"
          component={GameMain}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="SpellingGameContainer"
          component={SpellingGameContainer}
          options={{ headerShown: true, title: "냠냠 맛있는 모음게임임" }}
        />
        <MainStack.Screen
          name="SpellingGame"
          component={SpellingGame}
          options={{ headerShown: true, title: "냠냠 맛있는 모음게임" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default App;
