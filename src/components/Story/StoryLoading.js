import * as React from 'react';
import { Button, View, Text } from 'react-native';

const StoryLoading = ({navigation}) => {
    return (
        <View>
            <Text>앗, 도와줘! 우당탕탕 왕국 모험</Text>
            <View>
                <Button
                title="아니요, 다른 모험을 선택할래요!"
                onPress={() => navigation.navigate('StoryMain')}/>
            </View>
        </View>
    )
}

export default StoryLoading;