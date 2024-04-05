import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import BottomMenu from '../components/BottomMenu';
import Personality from '../components/Personality';
import DISC from '../components/DISC';
import Friendship from '../components/Friendship';

const QuestionsScreen = ({ route }) => {


  const { width, height } = Dimensions.get('window');
  const diagonalLength = Math.sqrt(width * width + height * height);
  const navigation = useNavigation();

  const [selectedValues, setSelectedValues] = useState(Array(20).fill(null));
  const allQuestionsAnswered = selectedValues.every(value => value !== null);

  const handleWidgetPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleRadioButtonChange = (index, value) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = value;
    setSelectedValues(newSelectedValues);
  };

  const handleSubmit = () => {
    // Here, you can do whatever you want with the selectedValues array,
    // such as sending it to a server, storing it locally, etc.
    console.log("Selected values:", selectedValues);
    // Reset selectedValues if needed
    // setSelectedValues(Array(20).fill(null));
  };

  const handleProfilePress = () => {
    navigation.navigate('Settings');
  };

  const componentMap = {
    'Personality': Personality,
    'DISC': DISC,
    'Friendship': Friendship,
  };

  const selectedComponent = route.params.selectedComponent;
  const SelectedComponent = componentMap[selectedComponent]; 

  return (
    <View style={styles.container}>

      <Canvas style={[styles.canvas, { width, height }]}>
        <Rect x={0} y={0} width={width} height={height * 0.125}>
          <LinearGradient
            start={vec(width / 2 - diagonalLength / 2, height / 2 - diagonalLength / 2)}
            end={vec(width / 3 + diagonalLength / 3, height / 3 + diagonalLength / 3)}
            colors={['#FF1B6B', '#BA5CA2', '#7B97D4', '#45CAFF']}
          />
        </Rect>
      </Canvas>

      <SelectedComponent
        selectedValues={selectedValues}
        handleRadioButtonChange={handleRadioButtonChange}
      />

      <View style={styles.separator} />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Hello User</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.imageContainer}>
          <Image source={require('../assets/images/aqua.png')} style={styles.image} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, !allQuestionsAnswered && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!allQuestionsAnswered}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

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
  disabledButton: {
    bottom: 45,
    backgroundColor: 'grey',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  submitButton: {
    bottom: 45,
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  submitButtonText: {
    fontFamily: 'Roboto Medium',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuestionsScreen;
