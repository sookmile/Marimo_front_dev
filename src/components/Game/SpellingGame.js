import * as React from 'react';
import {
  View,
  Text,
  Stylesheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

function SpellingGame({navigation}) {
  return (
    <View style={{flex: 1, zIndex: -1, display: 'flex'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SpellingGameResult')}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../../assets/gameWFriend.png')}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}

export default SpellingGame;
