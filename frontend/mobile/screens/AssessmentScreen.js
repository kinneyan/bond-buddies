import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { Col, Row, Grid } from "react-native-easy-grid";
import BottomMenu from '../components/BottomMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssessmentScreen = () => {

  const { width, height } = Dimensions.get('window');
  const diagonalLength = Math.sqrt(width * width + height * height);
  const navigation = useNavigation();
  const route = useRoute();
  const { greeting } = route.params || {};
  const { bearerToken } = route.params || {};
  const { buddyImage } = route.params || {};

  //console.log('assessment Received bearerToken:', bearerToken);  

  const handleWidgetPress = (screenName) => {
    navigation.navigate(screenName, { bearerToken, greeting, buddyImage });
  };

  const handleStartPress = (buttonIndex) => {
    let selectedComponent = null;
    switch (buttonIndex) {
      case 0:
        selectedComponent = 'Personality';
        break;
      case 1:
        selectedComponent = 'DISC';
        break;
      case 2:
        selectedComponent = 'Friendship';
        break;
      default:
        break;
    }
    navigation.navigate('Questions', { selectedComponent, bearerToken, greeting, buddyImage });
  };

  const handleProfilePress = () => {
    navigation.navigate('Settings', { bearerToken });
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
        <Text style={styles.text}>{greeting}</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.imageContainer}>
          <Image source={buddyImage} style={styles.image} />
        </TouchableOpacity>
      </View>

      <Grid style={styles.testList}>
        <Col style={styles.testNames}>

          <Row style={styles.test1}>
            <View style={styles.testText}>
              <Text style={styles.testName}>Personality Type</Text>
              <Text style={styles.testD}>Learn about the inner workings of your mind to harness
              your strengths and weaknesses and connect with yourself.</Text>
            </View>
          </Row>
          <Row style={styles.test}>
            <View style={styles.testText}>
              <Text style={styles.testName}>DISC</Text>
              <Text style={styles.testD}>Reveal your fears and values to develop a deeper understanding
              of your interpersonal interactions and dynamics.</Text>
            </View>
          </Row>
          <Row style={styles.test}>
            <View style={styles.testText}>
              <Text style={styles.testName}>Friendship Language</Text>
              <Text style={styles.testD}>Explore your preferences in expressing and receiving care
              to nurture and strengthen your friendships.</Text>
            </View>
          </Row>
        </Col>

        <Col style={styles.testButtons}>
          <Row style={styles.testB1}>
            <TouchableOpacity style={styles.Startbutton}  onPress={() => handleStartPress(0)}>
              <Text style={styles.StartbuttonText}>Start</Text>
            </TouchableOpacity>
          </Row>
          <Row style={styles.testB}>
            <TouchableOpacity style={styles.Startbutton} onPress={() => handleStartPress(1)}>
              <Text style={styles.StartbuttonText}>Start</Text>
            </TouchableOpacity>
          </Row>
          <Row style={styles.testB}>
            <TouchableOpacity style={styles.Startbutton} onPress={() => handleStartPress(2)}>
              <Text style={styles.StartbuttonText}>Start</Text>
            </TouchableOpacity>
          </Row>
        </Col>
        
      </Grid>

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
  separator: {
    backgroundColor: 'black',
    height: 2, 
    width: '100%',
    position: 'absolute',
    top: 115, 
  },
  testList: {
    top: 10,
    width: 350,
    maxHeight: '70%',
  },
  test: {
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  test1: {
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  testText: {
    justifyContent: 'center',
    paddingRight: 15,
  },
  testName: {
    fontFamily: 'Roboto Medium',
    fontSize: 16,
    marginBottom: 10,
  },
  testD: {
    fontFamily: 'Roboto Regular',
    fontSize: 14,
  },
  testB: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  testB1: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  testButtons:{
    width: 120,
  },
  Startbutton: {
    backgroundColor: 'black',
    padding: 10,
    marginBottom: 30, 
    borderRadius: 10,
    justifyContent: 'center', 
  },
  StartbuttonText: {
    fontFamily: 'Roboto Regular',
    color: 'white',
    fontSize: 16, 
    textAlign: 'center',
  },
});

export default AssessmentScreen;
