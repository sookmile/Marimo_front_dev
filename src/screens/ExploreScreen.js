import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from '../constants';
import ExploreMain from '../components/Explore/ExploreMain';
import ExploreCamera from '../components/Explore/ExploreCamera';
import ExploreDetail from '../components/Explore/ExploreDetail';

const ExploreStack = createStackNavigator();

const Explore = () => {
    return (
      <ExploreStack.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: '0%',
            backgroundColor: COLORS.bgPurple,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <ExploreStack.Screen
          name="Main"
          component={ExploreMain}
          options={{headerShown: false}}
        />
        <ExploreStack.Screen
          name="Camera"
          component={ExploreCamera}
          options={{headerShown: false}}
        />
        <ExploreStack.Screen
          name="Detail"
          component={ExploreDetail}
          options={{headerShown: false}}
        />
      </ExploreStack.Navigator>
    );
  };

  export default Explore;