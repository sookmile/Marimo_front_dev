import * as React from 'react';
import { Button, Text, TouchableOpacity } from 'react-native';

/* 캐릭터 확정 페이지 */
const ConfirmCh = ({navigation}) => {
  return (
      <>
    <Text>
    캐릭터 확정
  </Text>
  <Button
        title="네! 준비됐어요!"
        onPress={() => navigation.navigate('NavTab')}/>
    </>
  );
};

export default ConfirmCh;