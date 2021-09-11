import * as React from 'react';
import { Button, Text } from 'react-native';

/* 캐릭터 선택 페이지 */
const Character = ({navigation}) => {
  return (
      <>
    <Text>
    캐릭터 선택
  </Text>
  <Button
        title="선택했어요!"
        onPress={() => navigation.navigate('ConfirmCh')}/>
    </>
  );
};

export default Character;