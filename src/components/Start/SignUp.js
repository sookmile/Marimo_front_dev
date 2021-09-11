import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

/* 회원가입 페이지 */
const SignUp = ({navigation}) => {
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('Character')}>
    <Text>
      Login
    </Text>
    </TouchableOpacity>
  );
};

export default SignUp;