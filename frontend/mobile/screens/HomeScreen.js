import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'Omnes Bold': require('../assets/fonts/Omnes Bold.ttf'),
    'Roboto Medium': require('../assets/fonts/Roboto Medium.ttf'),
  });
}

const HomeScreen = () => {
  const { width, height } = Dimensions.get('window');
  const diagonalLength = Math.sqrt(width * width + height * height);
  const [buttonWidth, setButtonWidth] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    const textWidth = measureText('BOND BUDDIES');
    setButtonWidth(textWidth);
  }, []);

  const measureText = (text) => {
    const { width } = Dimensions.get('window');
    const { fontScale } = Dimensions.get('window');
    const adjustedWidth = width / fontScale;
    const textSize = StyleSheet.flatten(styles.centeredText).fontSize;
    return (textSize * text.length * adjustedWidth) / 690;
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredTextContainer}>
        <Text style={styles.centeredText}>BOND BUDDIES</Text>
      </View>
      <Canvas style={[styles.canvas, { width, height }]}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(width / 2 - diagonalLength / 2, height / 2 - diagonalLength / 2)}
            end={vec(width / 2 + diagonalLength / 2, height / 2 + diagonalLength / 2)}
            colors={['#FF1B6B', '#BA5CA2', '#7B97D4', '#45CAFF']}
          />
        </Rect>
      </Canvas>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={goToLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={goToRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
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
  centeredTextContainer: {
    position: 'absolute',
    textAlign: 'center',
    top: 340,
    zIndex: 1,
  },
  centeredText: {
    fontFamily: 'Omnes Bold',
    fontSize: 40,
    color: 'white', 
  },
  buttonContainer: {
    position: 'absolute',
    top: 440,
    alignItems: 'center',
  },
  button: {
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 30, 
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center', 
  },
  buttonText: {
    fontFamily: 'Roboto Medium',
    color: 'black',
    fontSize: 20, 
    textAlign: 'center',
  },
});

export default HomeScreen;
