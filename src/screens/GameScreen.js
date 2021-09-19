import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import SpellingGame from "../components/Game/SpellingGame";
import SpellingGameResult from "../components/Game/SpellingGameResult";
import GameRank from "../components/Game/GameResult";
import GameMain from "../components/Game/GameMain";

const GameStack = createStackNavigator();

const Game = (navigation, route) => {
  const getrouteName = async () => {
    const routeName = await getFocusedRouteNameFromRoute(route);

    if (routeName === "SpellingGame" || routeName === undefined) {
      navigation.setOptions({ tabBarVisible: true });
    } else {
      navigation.setOptions({ tabBarVisible: false });
    }
    return routeName;
  };

  React.useLayoutEffect(() => {
    const routeName = getrouteName();
  }, [navigation, route]);

  return (
    <GameStack.Navigator
      screenOptions={{
        tabBarVisible: false,
      }}
    >
      <GameStack.Screen
        name="GameMain"
        component={GameMain}
        options={{ headerShown: false }}
      />
      <GameStack.Screen
        name="SpellingGame"
        component={SpellingGame}
        options={{ headerShown: true, title: "동물 친구들의 초성 게임" }}
      />
      <GameStack.Screen
        name="SpellingGameResult"
        component={SpellingGameResult}
        options={{ headerShown: false }}
      />
      <GameStack.Screen
        name="GameRank"
        component={GameRank}
        options={{ headerShown: false }}
      />
    </GameStack.Navigator>
  );
};

export default Game;
