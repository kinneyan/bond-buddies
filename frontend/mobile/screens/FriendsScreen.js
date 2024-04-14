import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { Col, Row, Grid } from "react-native-easy-grid";
import BottomMenu from '../components/BottomMenu';
import AddFriend from '../components/AddFriend';
import MyFriend from '../components/MyFriend';

const FriendsScreen = () => {

  const { width, height } = Dimensions.get('window');
  const diagonalLength = Math.sqrt(width * width + height * height);
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('MyFriends');

  const handleWidgetPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleProfilePress = () => {
    navigation.navigate('Settings');
  };

  const searchUsers = () => {
    // Your search logic here
  };

  return (
    <View style={styles.container}>

      <Canvas style={[styles.canvas, { width, height }]}>
        <Rect x={0} y={0} width={width} height={height * 0.125}>
          <LinearGradient
            start={vec(width / 3 - diagonalLength / 3, height / 3 - diagonalLength / 3)}
            end={vec(width / 3 + diagonalLength / 3, height / 3 + diagonalLength / 3)}
            colors={['#FF1B6B', '#BA5CA2', '#7B97D4', '#45CAFF']}
          />
        </Rect>
      </Canvas>
              
      <View style={styles.separator} />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Hello User</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.imageContainer}>
          <Image source={require('../assets/images/aqua.png')} style={styles.image} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
            <View style={styles.searchBox}>
                <View style={styles.rowSearch}>
                    <TextInput
                        onChangeText={searchUsers}
                        style={styles.inputBox}
                        placeholder="Search"
                        autoCompleteType="off"
                    />
                    <TouchableOpacity style={styles.imgB} onPress={searchUsers}>
                        <Image style={styles.searchImg} source={require('../assets/images/mag.png')} />
                    </TouchableOpacity>
                </View>
            </View>
      </View>

      <View style={styles.friendsContainer}>
          <Grid style={styles.friendsGrid}>

            <Row style={styles.friendsRow}>
              <Col style={styles.friendsCol}>
                <TouchableOpacity onPress={() => setActiveTab('MyFriends')}>
                  <Text style={[styles.friendsTitle, activeTab === 'MyFriends' && styles.activeTab]}>My Friends</Text>
                </TouchableOpacity>
              </Col>
              <Col style={styles.friendsCol}>
                <TouchableOpacity onPress={() => setActiveTab('AddFriends')}>
                  <Text style={[styles.friendsTitle, activeTab === 'AddFriends' && styles.activeTab]}>Add Friends</Text>
                </TouchableOpacity>
              </Col>
            </Row>

            <Row style={styles.friendsRowContainer}>
              {activeTab === 'MyFriends' && <MyFriend />}
              {activeTab === 'AddFriends' && <AddFriend />}
            </Row>

          </Grid>
      </View>


      <BottomMenu handleWidgetPress={handleWidgetPress} />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    position: 'absolute',
    top: 0,
  },
  separator: {
    backgroundColor: 'black',
    height: 2, 
    width: '100%',
    position: 'absolute',
    top: 115, 
  },
  contentContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    top: 70,
    left: 10,
    right: 35, 
  },
  text: {
    fontFamily: 'Omnes Regular',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    marginRight: 10,
  },
  imageContainer: {
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    right: 0,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  searchSection: {
    backgroundColor: 'black',
    height: '10%',
    width: '100%',
    bottom: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexGrow: 1,
    maxWidth: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSearch: {
    borderRadius: 10,
    backgroundColor: '#ededed',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inputBox: {
    fontFamily: 'Roboto Regular',
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 18,
  },
  imgB: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  searchImg: {
    width: 27,
    height: 27,
  },
  friendsContainer: {
    bottom: 240,
    maxHeight: 200,
  },
  friendsGrid: {
    maxHeight: 100,
    minWidth: '100%',
  },
  friendsCol: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  friendsTitle: {
    fontFamily: 'Omnes Regular',
    fontSize: 20,
  },
  friendsRowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    fontFamily: 'Omnes Bold',
  },
});

export default FriendsScreen;
