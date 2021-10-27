import React,{useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../constants";
import ExploreMain from "../components/Explore/ExploreMain";
import ExploreCamera from "../components/Explore/ExploreCamera";
import ExploreDetail from "../components/Explore/ExploreDetail";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ExploreStack = createStackNavigator();

const Explore = () => {
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
    <ExploreStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: "0%",
          backgroundColor: COLORS.bgPurple,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <ExploreStack.Screen
        name="Main"
        component={ExploreMain}
        screenOptions={{ headerShown: false }}
      />
      <ExploreStack.Screen
        name="Camera"
        component={ExploreCamera}
        screenOptions={{ headerShown: false, headerTransparent: true }}
      />
      <ExploreStack.Screen
        name="Detail"
        component={ExploreDetail}
        screenOptions={{ headerShown: false }}
      />
    </ExploreStack.Navigator>
  );
};

export default Explore;
