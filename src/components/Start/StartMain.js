import * as React from 'react';
import { Button, View, Text } from 'react-native';

const StartMain = ({navigation}) => {
    return (
        <View>
            <Text>시작 페이지</Text>
            <View>
                <Button
                title="시작하기"
                onPress={() => navigation.navigate('SignUp')}/>
                <Button
                title="이어하기"
                onPress={() => navigation.navigate('Login')}/>
            </View>
        </View>
    )
}

export default StartMain;