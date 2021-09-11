import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const ExploreMain = ({navigation}) => {
  return (
    <>
      <View style={{flex: 1, zIndex: -1, display: 'flex'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../../assets/explore(ver3).png')}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ExploreMain;
