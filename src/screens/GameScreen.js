import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SpellingGame from "../components/Game/SpellingGame";
import GameMain from "../components/Game/GameMain";
import LearnRecord from "../components/Mypage/LearnRecord";
import SpellingGameContainer from "../components/Game/SpellingGameContainer";
const GameStack = createStackNavigator();

const Game = () => {
  return (
    <GameStack.Navigator>
      <GameStack.Screen
        name="GameMain"
        component={GameMain}
        options={{ headerShown: false }}
      />
      <GameStack.Screen
        name="SpellingGameContainer"
        component={SpellingGameContainer}
        options={{ headerShown: true, title: "냠냠 맛있는 모음 게임" }}
      />
      <GameStack.Screen
        name="SpellingGame"
        component={SpellingGame}
        options={{ headerShown: true, title: "냠냠 맛있는 모음 게임" }}
      />
      <GameStack.Screen
        name="LearnRecord"
        component={LearnRecord}
        options={{ headerShown: false }}
      />
    </GameStack.Navigator>
  );
};

export default Game;
