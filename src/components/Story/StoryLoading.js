import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, View, Text, StyleSheet } from 'react-native';

const StoryLoading = ({navigation}) => {
    return (
        <View>
            <Text>앗, 도와줘! 우당탕탕 왕국 모험</Text>
            <View>
                <TouchableOpacity style={styles.selectAg} onPress={() => navigation.navigate('StoryMain')}>
                    <Text>아니요, 다른 모험을 선택할래요!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StoryLoading;

const styles = StyleSheet.create({
    selectAg: {
        width: 343,
        height: 56,
        backgroundColor: '#B16CF7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }
})