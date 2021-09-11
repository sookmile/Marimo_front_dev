import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SpellingGame from '../components/Game/SpellingGame';
import SpellingGameResult from '../components/Game/SpellingGameResult';
import GameRank from '../components/Game/GameResult';
import GameMain from '../components/Game/GameMain';

const GameStack = createStackNavigator();

const Game = () => {
    return(
      <GameStack.Navigator>
        <GameStack.Screen
            name="GameMain"
            component={GameMain}
            options={{headerShown: false}}
          />
        <GameStack.Screen
            name="SpellingGame"
            component={SpellingGame}
            options={{headerShown: false}}
          />
          <GameStack.Screen
            name="SpellingGameResult"
            component={SpellingGameResult}
            options={{headerShown: false}}
          />
          <GameStack.Screen
            name="GameRank"
            component={GameRank}
            options={{headerShown: false}}
          />
      </GameStack.Navigator>
    )
  }

  export default Game;