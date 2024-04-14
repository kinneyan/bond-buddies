import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import BottomMenu from '../components/BottomMenu';
import { SvgXml } from 'react-native-svg';

const CloseIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
  </svg>
`;

const SettingsScreen = () => {

  const { width, height } = Dimensions.get('window');
  const diagonalLength = Math.sqrt(width * width + height * height);
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // Here you can send the form data to your database
    console.log('Form data:', { firstName, lastName, email, username, password, confirmPassword });
    // You can make your API call here to send the form data to the server
  };
  const handleLogout = () => {
    navigation.navigate('Home');
    // do logout
  };

  const handleWidgetPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleBackPress = () => {
    navigation.goBack();
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

      <View style={styles.settingsView}>

        <Text style={styles.editTitle}>Edit Information</Text>

        <ScrollView style={styles.editInfoContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
              /> 
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={text => setLastName(text)}
              /> 
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
              /> 
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
              /> 
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
              /> 
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry
              /> 
          </View>
        </ScrollView>
        </View>
              
      <View style={styles.separator} />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Settings</Text>
        <TouchableOpacity onPress={handleBackPress} style={styles.imageContainer}>
          <SvgXml xml={CloseIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
          <Text style={styles.LogoutButtonText}>Log Out</Text>
        </TouchableOpacity>
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
    position: 'absolute',
    right: 0,
  },
  separator: {
    backgroundColor: 'black',
    height: 2, 
    width: '100%',
    position: 'absolute',
    top: 115, 
  },
  settingsView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTitle: {
    fontFamily: 'Omnes Regular',
    fontSize: 30,
  },
  editInfoContainer: {
    maxHeight: '60%',
    width: 350,
    flex: 1,
    marginTop: 30, 
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: 'Roboto Regular',
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    padding: 10,
    bottom: 40,
  },
  saveButton: {
      backgroundColor: 'black',
      padding: 10,
      marginBottom: 15, 
      borderWidth: 2,
      borderRadius: 10,
      justifyContent: 'center', 
      color: 'black',
  },
  LogoutButton: {
      borderColor: 'black',
      backgroundColor: 'white',
      padding: 10,
      marginBottom: 30, 
      borderWidth: 2,
      borderRadius: 10,
      justifyContent: 'center', 
      color: 'black',
  },
  saveButtonText: {
      fontFamily: 'Roboto Medium',
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
  },
  LogoutButtonText: {
      fontFamily: 'Roboto Medium',
      fontSize: 20,
      color: 'black',
      textAlign: 'center',
  },
});

export default SettingsScreen;
