import * as React from 'react';
import {
  View,
  Text,
  Stylesheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

function SpellingGameResult({navigation}) {
  return (
    <View style={{flex: 1, zIndex: -1, display: 'flex'}}>
      <TouchableOpacity onPress={() => navigation.navigate('GameRank')}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../../assets/gameWFriendResult.png')}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}

export default SpellingGameResult;
