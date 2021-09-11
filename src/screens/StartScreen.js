import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import StartMain from '../components/Start/StartMain';
import SignUp from '../components/Start/SignUp';
import Login from '../components/Start/Login';
import Character from '../components/Start/Character';
import ConfirmCh from '../components/Start/ConfirmCh';

const StartStack = createStackNavigator();


const Start = () => {
    return (
      <StartStack.Navigator>
        <StartStack.Screen
            name="StartMain"
            component={StartMain}
            options={{headerShown: false}}
          />
          <StartStack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <StartStack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <StartStack.Screen
            name="Character"
            component={Character}
            options={{headerShown: false}}
          />
          <StartStack.Screen
            name="ConfirmCh"
            component={ConfirmCh}
            options={{headerShown: false}}
          />
      </StartStack.Navigator>
    )
  }

  export default Start;