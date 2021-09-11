import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

/* 로그인 페이지 */
const Login = ({navigation}) => {
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('Character')}>
    <Text>
      Login
    </Text>
    </TouchableOpacity>
  );
};

export default Login;