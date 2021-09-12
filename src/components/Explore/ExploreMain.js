import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
    </TouchableOpacity>
  );
};

const StoryMain = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.mainLogo}
          source={require('../../assets/icons/MainLogo.png')}
        />
        <Text>마리모와 말의 세계</Text>
      </View>
      <View>
        <View style={styles.name}>
          <Image
            style={styles.logo}
            source={require('../../assets/icons/Logo.png')}
          />
          <Text style={styles.userName}>송이</Text>
        </View>
        <View style={styles.records}>
          <TouchableOpacity style={styles.rButton1}>
            <Text>나의 기록들</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rButton2}>
            <Text>친구 등록하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.title}>
          <Text>신나게 움직여요. 마리모 탐험대!</Text>
          <TouchableOpacity>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraBlock}>
          <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Image
            style={styles.camera}
            source={require('../../assets/camera.png')}
          />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.title}>
          <Text>신나게 움직여요. 마리모 탐험대!</Text>
          <TouchableOpacity>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.storyBlock}>
          <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => <ListItem item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <ListItem item={item} />;
          }}
        />
      </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

export default StoryMain;


const SECTIONS = [
  {
    title: 'Made for you',
    horizontal: true,
    data: [
      {
        key: '1',
        text: '해바라기',
        uri: 'https://picsum.photos/id/1/200',
        route: 'StoryLoading'
      },
      {
        key: '2',
        text: '사슴',
        uri: 'https://picsum.photos/id/10/200',
        route: 'StoryLoading'
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
        route: 'StoryLoading'
      },
    ],
  },
  
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    display: 'flex',
    padding: 10
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    height: 50,
  },
  mainLogo: {
    width: 35,
    height: 35,
    marginLeft: 5,
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#A098FD',
    borderRadius: 45,
    marginLeft: 5,
  },
  camera: {
    width: 208,
    height: 143,
    backgroundColor: '#F66C6C',
    borderRadius: 45,
    marginLeft: 5,
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F1DFFF',
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#C5A1F3',
    marginLeft: 5,
    marginRight: 5,
  },
  userName: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 300,
  },
  records: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  rButton1: {
    width: 114,
    height: 36,
    borderRadius: 40,
    backgroundColor: '#FF8C73',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rButton2: {
    width: 114,
    height: 36,
    borderRadius: 40,
    backgroundColor: '#FEBB61',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    margin: 10
  },
  cameraBlock: {
    width: 370,
    height: 145,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  storyBlock: {
    width: 370,
    height: 145,
    display: 'flex',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  item: {
    marginRight: 10,
    width: 204,
    height: 145,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 30,
  },
  itemPhoto: {
    width: 195,
    height: 104,
    borderRadius: 20
  },
  itemText: {
    color: 'gray',
    marginTop: 5,
  },
});
