import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/Story/StoryMain';
import {icons, COLORS} from '../constants/index';
import Settings from './Settings';
import Explore from './ExploreScreen';
import Game from './GameScreen';
import Story from './StoryScreen';

const Tab = createBottomTabNavigator();

/*const tabOptions = {
  style: {
    backgroundColor: '#EDE7F5',
    height: 64',
  },
};*/

const NavTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: '10%',
          backgroundColor: COLORS.bgPurple,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Story}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image
                source={icons.home_ic}
                resizeMode="contain"
                style={styles.icons}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray,
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                동화
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image
                source={icons.game_ic}
                resizeMode="contain"
                style={styles.icons}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray,
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                게임
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image
                source={icons.explore_ic}
                resizeMode="contain"
                style={styles.icons}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray,
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                탐험하기
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image
                source={icons.Settings_ic}
                resizeMode="contain"
                style={styles.icons}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray,
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                설정
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 50,
    height: 50,
  },
});

export default NavTabs;
