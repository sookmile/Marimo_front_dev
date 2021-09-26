import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SpellingGame from "../components/Game/SpellingGame";
import SpellingGameResult from "../components/Game/SpellingGameResult";
import SpellingGameRanking from "../components/Game/SpellingGameRanking";
import GameMain from "../components/Game/GameMain";
<<<<<<< HEAD
import LearnRecord from "../components/Mypage/LearnRecord";
=======
import SpellingGameContainer from "../components/Game/SpellingGameContainer";
>>>>>>> c5005f689e198cc126104bea12fc7dbb5b33b127
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
        options={{ headerShown: true, title: "동물 친구들의 초성 게임" }}
      />
      <GameStack.Screen
        name="SpellingGame"
        component={SpellingGame}
        options={{ headerShown: true, title: "동물 친구들의 초성 게임" }}
      />
      <GameStack.Screen
        name="GameRank"
        component={SpellingGameRanking}
        options={{ headerShown: false }}
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
