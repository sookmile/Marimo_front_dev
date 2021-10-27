import React,{useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SpellingGame from "../components/Game/SpellingGame";
import GameMain from "../components/Game/GameMain";
import LearnRecord from "../components/Mypage/LearnRecord";
import SpellingGameContainer from "../components/Game/SpellingGameContainer";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
const GameStack = createStackNavigator();

const Game = () => {
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
    <GameStack.Navigator>
      <GameStack.Screen
        name="GameMain"
        component={GameMain}
        options={{ headerShown: false }}
      />
      <GameStack.Screen
        name="SpellingGameContainer"
        component={SpellingGameContainer}
        options={{ headerShown: true, title: "냠냠 맛있는 모음게임" }}
      />
      <GameStack.Screen
        name="SpellingGame"
        component={SpellingGame}
        options={{ headerShown: true, title: "냠냠 맛있는 모음게임" }}
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
