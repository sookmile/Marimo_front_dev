import * as React from 'react';
import {
  View,
  Text,
  Stylesheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import SpellingGame from './SpellingGame';

const GameMain = ({navigation}) => {
  return (
    <View style={{flex: 1, zIndex: -1, display: 'flex'}}>
      <TouchableOpacity onPress={() => navigation.navigate('SpellingGame')}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../../assets/game(ver3).png')}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default GameMain;
