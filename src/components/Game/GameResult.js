import * as React from 'react';
import { Button, View, Text } from 'react-native';

const GameRank = ({navigation}) => {
    return (
        <View>
            <Text>현재 랭킹</Text>
            <View>
                <Button
                title="홈으로 돌아가기"
                onPress={() => navigation.navigate('GameMain')}/>
            </View>
        </View>
    )
}

export default GameRank;