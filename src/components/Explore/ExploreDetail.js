import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';

const ExploreDetail = ({navigation, route}) => {
  return (
    <>
      <View style={{flex: 1, zIndex: -1, display: 'flex'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}
            source={require('../../assets/exploreResult.png')}
            resizeMode="cover">
            <Image
              style={{
                position: 'relative',
                top: 15,

                width: 300,
                height: 180,
                borderRadius: 10,
              }}
              source={{uri: route.params.image}}
            />
            <Text
              style={{
                position: 'relative',
                top: 30,
                fontSize: 30,
                color: '#B16CF6',
                borderRadius: 10,
                fontWeight: '700',
              }}>
              컵
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ExploreDetail;
