import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { SvgXml } from 'react-native-svg';
import * as Font from 'expo-font';

const homeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-house-fill" viewBox="0 0 16 16">
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
        <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
    </svg>
`;

const asIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-ui-radios" viewBox="0 0 16 16">
        <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM0 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0m7-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M3 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6m0 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
    </svg>
`;

const friendIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
    </svg>
`;

async function loadFonts() {
  await Font.loadAsync({
    'Omnes Bold': require('../assets/fonts/Omnes Bold.ttf'),
    'Roboto Regular': require('../assets/fonts/Roboto Regular.ttf'),
  });
}

const UserScreen = () => {

  const { width, height } = Dimensions.get('window');
  const diagonalLength = Math.sqrt(width * width + height * height);
  const navigation = useNavigation();

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    loadFonts();
    setCurrentDate(getFormattedDate());
  }, []);

  const getFormattedDate = () => {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1; // months are zero-based
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  };

    const handleWidgetPress = (screenName) => {
      navigation.navigate(screenName);
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
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/aqua.png')} style={styles.image} />
        </View>
      </View>

      <Text style={styles.dateText}>{currentDate}</Text>

        <View style={styles.widgetContainer}>
        <TouchableOpacity
            style={styles.widget}
            onPress={() => handleWidgetPress('UserHome')}>
            <SvgXml xml={homeIcon}/>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.widget}
            onPress={() => handleWidgetPress('Screen2')}>
            <SvgXml xml={asIcon}/>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.widget}
            onPress={() => handleWidgetPress('Screen3')}>
            <SvgXml xml={friendIcon}/>
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

  dateText: {
    position: 'absolute',
    top: 160,
    color: 'grey',
    fontSize: 12,
  },

  widgetContainer: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 30,
  },
  widget: {
    flex: 1,
    alignItems: 'center',
  },
  widgetText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserScreen;
