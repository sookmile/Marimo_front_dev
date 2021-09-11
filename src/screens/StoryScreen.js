import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import StoryLoading from '../components/Story/StoryLoading';
import StoryMain from '../components/Story/StoryMain';

const StoryStack = createStackNavigator();

const Story = () => {
    return(
      <StoryStack.Navigator>
          <StoryStack.Screen
            name="StoryMain"
            component={StoryMain}
            options={{headerShown: false}}
          />
        <StoryStack.Screen
            name="StoryLoading"
            component={StoryLoading}
            options={{headerShown: false}}
          />
      </StoryStack.Navigator>
    )
  }

  export default Story;