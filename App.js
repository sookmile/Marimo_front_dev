import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import SplashScreen from 'react-native-splash-screen';

//Screens
import Start from "./src/screens/StartScreen";
import Story from "./src/screens/StoryScreen";
import Game from "./src/screens/GameScreen";
import Explore from "./src/screens/ExploreScreen";
import Settings from "./src/screens/Settings";

//Tabs
import NavTab from "./src/screens/NavTabs";

const MainStack = createStackNavigator();

const App = () => {
  /*
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  */
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
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default App;
