import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Gradient from '../components/Gradient'; 

const HomeScreen = () => {
  const { width, height } = Dimensions.get('window');
  const [buttonWidth, setButtonWidth] = useState(null);
  const navigation = useNavigation();

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
      <Gradient width={width} height={height} />
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
