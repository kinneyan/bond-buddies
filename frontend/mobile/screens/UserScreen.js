import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { Col, Row, Grid } from "react-native-easy-grid";
import BottomMenu from '../components/BottomMenu';

const UserScreen = () => {

  const { width, height } = Dimensions.get('window');
  const diagonalLength = Math.sqrt(width * width + height * height);
  const navigation = useNavigation();

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(getFormattedDate());
  }, []);

  const getFormattedDate = () => {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleWidgetPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleProfilePress = () => {
    navigation.navigate('Settings');
  };

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
      
      <View style={styles.separator} />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Hello User</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.imageContainer}>
          <Image source={require('../assets/images/aqua.png')} style={styles.image} />
        </TouchableOpacity>
      </View>

      <Text style={styles.dateText}>{currentDate}</Text>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >

        <Grid style={styles.gridBuddy}>
          <Col style={styles.gridBCol}>
            <Row style={styles.profileGrid}>
              <View style={styles.profileimageContainer}>
                <Image source={require('../assets/images/aqua.png')} style={styles.profileimage} />
              </View>
            </Row>
          </Col>
          <Col>
            <Row style={styles.profileDescription}>
              <View style={styles.profileDText}>
                <Text style={styles.buddyTypeText}>Aqua</Text>
                <Text style={styles.buddyTypeD}>
                  Flowing through life with grace and compassion, 
                  you soothe souls with your unconditional understanding and support.
                </Text>
              </View>
            </Row>
          </Col>
        </Grid>

        <Grid style={styles.gridTable}>
          <Col style={styles.gridCol1}>
            <Row style={styles.grid1Row}>
              <Text style={styles.gridTitleText}>Personality Type</Text>
            </Row>
            <Row style={styles.gridRow}>
              <Text style={styles.gridTitleText}>DISC</Text>
            </Row>
            <Row style={styles.gridRow}>
              <Text style={styles.gridTitleText}>Friendship Language</Text>
            </Row>
          </Col>
          <Col style={styles.gridCol2}>
            <Row style={styles.grid1Row}>
              <Text style={styles.gridText}>Result 1</Text>
            </Row>
            <Row style={styles.gridRow}>
              <Text style={styles.gridText}>Result 2</Text>
            </Row>
            <Row style={styles.gridRow}>
              <Text style={styles.gridText}>Result 3</Text>
            </Row>
          </Col>
        </Grid>

        <View style={styles.TestContainer}>
          <Text style={styles.PTTitleText}>
            Personality Test - Result
          </Text>
          <Text style={styles.TestDescText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent eros velit, tempor laoreet vulputate at, iaculis 
            et leo. Nulla mi nunc, venenatis eu lacus accumsan, fringilla
             tincidunt neque. Duis sit amet risus quam. Sed facilisis 
             tortor quis semper interdum. Donec tempus ipsum non urna 
             porta placerat. Etiam vulputate turpis eu sapien placerat, 
             vitae sagittis orci dictum. Donec tincidunt est elementum 
             metus malesuada, ac euismod neque ullamcorper. Phasellus 
             laoreet sem ac lorem varius luctus. Integer pulvinar urna non
             odio consectetur accumsan. Cras quis ornare felis.
          </Text>
          <Text style={styles.DTitleText}>
            DISC - Result
          </Text>
          <Text style={styles.TestDescText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent eros velit, tempor laoreet vulputate at, iaculis 
            et leo. Nulla mi nunc, venenatis eu lacus accumsan, fringilla
             tincidunt neque. Duis sit amet risus quam. Sed facilisis 
             tortor quis semper interdum. Donec tempus ipsum non urna 
             porta placerat. Etiam vulputate turpis eu sapien placerat, 
             vitae sagittis orci dictum. Donec tincidunt est elementum 
             metus malesuada, ac euismod neque ullamcorper. Phasellus 
             laoreet sem ac lorem varius luctus. Integer pulvinar urna non
             odio consectetur accumsan. Cras quis ornare felis.
          </Text>
          <Text style={styles.FLTitleText}>
            Friendship Language - Result
          </Text>
          <Text style={styles.TestDescText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Praesent eros velit, tempor laoreet vulputate at, iaculis 
            et leo. Nulla mi nunc, venenatis eu lacus accumsan, fringilla
             tincidunt neque. Duis sit amet risus quam. Sed facilisis 
             tortor quis semper interdum. Donec tempus ipsum non urna 
             porta placerat. Etiam vulputate turpis eu sapien placerat, 
             vitae sagittis orci dictum. Donec tincidunt est elementum 
             metus malesuada, ac euismod neque ullamcorper. Phasellus 
             laoreet sem ac lorem varius luctus. Integer pulvinar urna non
             odio consectetur accumsan. Cras quis ornare felis.
          </Text>
        </View>

      </ScrollView>

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
  dateText: {
    position: 'absolute',
    top: 150,
    color: 'grey',
    fontSize: 16,
    fontFamily: 'Omnes Regular',
  },
  gridBuddy: {
    borderColor: 'black',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    maxHeight: 120,
    maxWidth: 350,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gridBCol: {
    maxWidth: 100,
  },
  profileGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
  },
  profileDescription: {
    paddingTop: 5,
    paddingHorizontal: 15,
    height: 120,
  },
  profileimage: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  buddyTypeText: {
    fontFamily: 'Omnes Bold',
    fontSize: 24,
  },
  buddyTypeD: {
    fontFamily: 'Roboto Regular',
    marginTop: 3,
  },
  gridTable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    maxWidth: 350,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  grid1Row: {
    marginTop: 5,
  },
  gridCol1: {
    padding: 10,
    borderRightWidth: 1,
  },
  gridCol2: {
    padding: 10,
  },
  gridTitleText: {
    padding: 5,
    fontFamily: 'Roboto Medium',
  },
  gridText: {
    padding: 5,
    fontFamily: 'Roboto Regular',
  },
  scrollContainer: {
    marginTop: 120, 
    width: 350,
    maxWidth: 350,
    maxHeight: '70%',
    flex: 1, 
  },
  scrollText: {
    padding: 10,
  },
  TestContainer: {
    marginTop: 35,
    marginBottom: 35,
  },
  PTTitleText: {
    color: '#E33581',
    fontFamily: 'Roboto Medium',
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
  },
  DTitleText: {
    color: '#9E76B8',
    fontFamily: 'Roboto Medium',
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
  },
  FLTitleText: {
    color: '#5BB5ED',
    fontFamily: 'Roboto Medium',
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
  },
  TestDescText: {
    fontFamily: 'Roboto Regular',
    fontSize: 14,
    padding: 5,
    marginBottom: 15,
  },
});

export default UserScreen;
