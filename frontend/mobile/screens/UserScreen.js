import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { Col, Row, Grid } from "react-native-easy-grid";
import BottomMenu from '../components/BottomMenu';

const UserScreen = () => {
  
  const buddyTypes = {
    Unknown: 'Unknown',
    Aqua: 'Aqua',
    Terra: 'Terra',
    Aero: 'Aero',
    Pyro: 'Pyro',
  };

  const buddyDescriptions = {
    Unknown: 'Piquing curiosity with your mysterious allure, you draw others (and our algorithm) to unravel the enigma of your essence.',
    Aqua: 'Flowing through life with grace and compassion, you soothe souls with your unconditional understanding and support.',
    Terra: 'Like the solid ground beneath your feet, you offer unwavering support and stability no matter the challenge.',
    Aero: 'Bringing a breath of fresh air with your wit and curiosity, you offer intellect and encourage others to broaden their horizons.',
    Pyro: 'Like a blazing fire, you radiate warmth and vitality, infusing others with an infectious energy that lights up their soul.',
  };

  const buddyImages = {
    Aqua: require('../assets/images/aqua.png'),
    Terra: require('../assets/images/terra.png'),
    Aero: require('../assets/images/aero.png'),
    Pyro: require('../assets/images/pyro.png'),
    Unknown: require('../assets/images/unknown.png'), 
  };

  const { width, height } = Dimensions.get('window');
  const diagonalLength = Math.sqrt(width * width + height * height);
  const navigation = useNavigation();
  const route = useRoute();

  const [dataFetched, setDataFetched] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');
  const bearerToken = route.params?.bearerToken || '';
  const [buddy, setBuddy] = useState('');
  const [buddyDescription, setBuddyDescription] = useState('');
  const [buddyImage, setBuddyImage] = useState('');

  //console.log('user Received bearerToken:', bearerToken);  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getResults();
    });

    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    setCurrentDate(getFormattedDate());
    getResults();

    const currentTimeInterval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();

      if (hours >= 5 && hours < 12) {
        setGreeting('Good morning');
      } else if (hours >= 12 && hours < 18) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }

      setCurrentTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    

    return () => clearInterval(currentTimeInterval);

  }, [navigation]);

  const [resultData, setResultData] = useState({
    personality: {
      type: '',
      description: {
        buddyType: '',
        overview: '',
        strengths: '',
        weaknesses: '',
        friendships: ''
      }
    },
    disc: {
      type: '',
      description: {
        buddyType: '',
        overview: '',
        fears: '',
        values: '',
        friendships: ''
      }
    },
    friendship: {
      type: '',
      description: {
        buddyTypes: '',
        overview: '',
      }
    }
  });
  
  const getFormattedDate = () => {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getResults = async () => {

    try {
      if (bearerToken) {
        const response = await fetch('http://10.132.181.204:3001/assessments/results', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${bearerToken}`
          }
        });
  
        if (!response.ok) {
          console.error("Couldn't get results. Status:", response.status);
          return;
        }
  
        const responseData = await response.json();

        console.log("after: ", responseData);
  
        if (!responseData) {
          console.error("Invalid user data received from server:", responseData);
          return;
        }
  
        const { personality, disc, friendship } = responseData;
  
        const personalityType = personality ? personality.type : 'Not taken yet';
        const discType = disc ? disc.type : 'Not taken yet';
        const friendshipType = friendship ? friendship.type : 'Not taken yet';

        setResultData(prevData => ({
          ...prevData,
          personality: {
            type: personalityType,
            description: {
              buddyType: personality?.description?.buddyType || '',
              overview: personality?.description?.overview || '',
              strengths: personality?.description?.strengths || '',
              weaknesses: personality?.description?.weaknesses || '',
              friendships: personality?.description?.friendships || ''
            }
          },
          disc: {
            type: discType,
            description: {
              buddyType: disc?.description?.buddyType || '',
              overview: disc?.description?.overview || '',
              fears: disc?.description?.fears || '',
              values: disc?.description?.values || '',
              friendships: disc?.description?.friendships || ''
            }
          },
          friendship: {
            type: friendshipType,
            description: {
              buddyType: friendship?.description?.buddyTypes || '',
              overview: friendship?.description || '',
            }
          }
        }));

        const personalityBuddy = personality ? personality.description.buddyType : 'Unknown';
        const discBuddy = disc ? disc.description.buddyType : 'Unknown';
        const friendshipBuddy = friendship ? friendship.description.buddyTypes : 'Unknown';

        let aqua = 0, terra = 0, aero = 0, pyro = 0;

        if(personalityBuddy == 'Aqua'){
          aqua++;
        }
        if(discBuddy == 'Aqua'){
          aqua++;
        }
        if(friendshipBuddy == 'Aqua'){
          aqua++;
        }

        if(personalityBuddy == 'Terra'){
          terra++;
        }
        if(discBuddy == 'Terra'){
          terra++;
        }
        if(friendshipBuddy == 'Terra'){
          terra++;
        }

        if(personalityBuddy == 'Aero'){
          aero++;
        }
        if(discBuddy == 'Aero'){
          aero++;
        }
        if(friendshipBuddy == 'Aero'){
          aero++;
        }

        if(personalityBuddy == 'Pyro'){
          pyro++;
        }
        if(discBuddy == 'Pyro'){
          pyro++;
        }
        if(friendshipBuddy == 'Pyro'){
          pyro++;
        }

        if(aqua === 0 && aero === 0 && terra === 0 && pyro === 0){
          setBuddy(buddyTypes.Unknown);
          setBuddyDescription(buddyDescriptions[buddyTypes.Unknown]);
          setBuddyImage(buddyImages[buddyTypes.Unknown]); 
        }
        else{
          if((aqua >= terra) && (aqua >= aero) && (aqua >= pyro)){
            setBuddy(buddyTypes.Aqua);
            setBuddyDescription(buddyDescriptions[buddyTypes.Aqua]);
            setBuddyImage(buddyImages[buddyTypes.Aqua]); 
          }
          if((terra >= aqua) && (terra >= aero) && (terra >= pyro)){
            setBuddy(buddyTypes.Terra);
            setBuddyDescription(buddyDescriptions[buddyTypes.Terra]);
            setBuddyImage(buddyImages[buddyTypes.Terra]); 
          }
          if((aero >= aqua) && (aero >= terra) && (aero >= pyro)){
            setBuddy(buddyTypes.Aero);
            setBuddyDescription(buddyDescriptions[buddyTypes.Aero]);
            setBuddyImage(buddyImages[buddyTypes.Aero]); 
          }
          if((pyro >= aero) && (pyro >= terra) && (pyro >= aqua)){
            setBuddy(buddyTypes.Pyro);
            setBuddyDescription(buddyDescriptions[buddyTypes.Pyro]);
            setBuddyImage(buddyImages[buddyTypes.Pyro]); 
          }
        }

        setDataFetched(true);
      }
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  };
  
  const handleWidgetPress = (screenName) => {
    navigation.navigate(screenName, { bearerToken, greeting, buddyImage });
  };

  const handleProfilePress = () => {
    navigation.navigate('Settings', { bearerToken });
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
        <Text style={styles.text}>{greeting}</Text> 
        <TouchableOpacity onPress={handleProfilePress} style={styles.imageContainer}>
        <Image source={buddyImage || require('../assets/images/unknown.png')} style={styles.image} />
        </TouchableOpacity>
      </View>

      <Text style={styles.dateText}>{currentDate}</Text>

      {dataFetched ? (
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

          <Grid style={styles.gridBuddy}>
            <Col style={styles.gridBCol}>
              <Row style={styles.profileGrid}>
                <View style={styles.profileimageContainer}>
                  <Image source={buddyImage} style={styles.profileimage} />
                </View>
              </Row>
            </Col>
            <Col>
              <Row style={styles.profileDescription}>
                <View style={styles.profileDText}>
                  <Text style={styles.buddyTypeText}>{buddy}</Text>
                  <Text style={styles.buddyTypeD}>{buddyDescription}</Text>
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
                <Text style={styles.gridText}>{resultData.personality.type}</Text>
              </Row>
              <Row style={styles.gridRow}>
                <Text style={styles.gridText}>{resultData.disc.type}</Text>
              </Row>
              <Row style={styles.gridRow}>
                <Text style={styles.gridText}>{resultData.friendship.type}</Text>
              </Row>
            </Col>
          </Grid>

          <View style={styles.TestContainer}>

            {dataFetched && resultData.personality.type !== 'Not taken yet' && (
              <View>
                <Text style={styles.PTTitleText}>
                  Personality Type: {resultData.personality.type}
                </Text>
                <Text style={styles.TestDescText}>
                  <Text style={styles.editText}>Overview{"\n"}</Text>
                  {resultData.personality.description.overview}
                  {"\n\n"}
                  <Text style={styles.editText}>Strengths{"\n"}</Text>
                  {resultData.personality.description.strengths}
                  {"\n\n"}
                  <Text style={styles.editText}>Weaknesses{"\n"}</Text>
                  {resultData.personality.description.weaknesses}
                  {"\n\n"}
                  <Text style={styles.editText}>Friendships{"\n"}</Text>
                  {resultData.personality.description.friendships}
                </Text>
              </View>
            )}

            {dataFetched && resultData.disc.type !== 'Not taken yet' && (
              <View>
                <Text style={styles.DTitleText}>
                  DISC: {resultData.disc.type}
                </Text>
                <Text style={styles.TestDescText}>
                  <Text style={styles.editText}>Overview{"\n"}</Text>
                  {resultData.disc.description.overview}
                  {"\n\n"}
                  <Text style={styles.editText}>Fears{"\n"}</Text>
                  {resultData.disc.description.fears}
                  {"\n\n"}
                  <Text style={styles.editText}>Values{"\n"}</Text>
                  {resultData.disc.description.values}
                  {"\n\n"}
                  <Text style={styles.editText}>Friendships{"\n"}</Text>
                  {resultData.disc.description.friendships}
                </Text>
              </View>
            )}

            {dataFetched && resultData.friendship.type !== 'Not taken yet' && (
              <View>
                <Text style={styles.FLTitleText}>
                  Friendship Language: {resultData.friendship.type}
                </Text>
                <Text style={styles.TestDescText}>
                  <Text style={styles.editText}>Overview{"\n"}</Text>
                  {resultData.friendship.description.overview}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

      ) : (
        <ActivityIndicator size="large" color="#000000" />
      )}

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
    marginBottom: 10,
  },
  DTitleText: {
    color: '#9E76B8',
    fontFamily: 'Roboto Medium',
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
  },
  FLTitleText: {
    color: '#5BB5ED',
    fontFamily: 'Roboto Medium',
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
  },
  TestDescText: {
    fontFamily: 'Roboto Regular',
    fontSize: 14,
    padding: 5,
    marginBottom: 15,
  },
  editText: {
    fontFamily: 'Roboto Medium',
  },
});

export default UserScreen;
