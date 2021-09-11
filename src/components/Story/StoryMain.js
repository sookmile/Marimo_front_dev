import * as React from 'react';
import {View, Text, Stylesheet, ImageBackground, TouchableOpacity} from 'react-native';

const StoryMain = ({navigation}) => {
  return (
    <View style={{flex: 1, zIndex: -1, display: 'flex'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('StoryLoading')}>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('../../assets/main(ver3).png')}
        resizeMode="cover"
      />
      </TouchableOpacity>
    </View>
  );
};

export default StoryMain;
