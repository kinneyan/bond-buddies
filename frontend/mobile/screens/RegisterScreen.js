import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rect, CornerPathEffect } from "@shopify/react-native-skia";
import BorderGradient from '../components/BorderGradient'; 

export default function RegisterScreen() {

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();

    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleNextStep = (data) => {
        setUserData(prevState => ({ ...prevState, ...data }));
        setStep(step + 1);
    };
  
    const handleRegister = async () => {

        const { firstName, lastName, email, username, password, confirmPassword } = userData;
    
        const obj = {
            firstName,
            lastName,
            email,
            username,
            password,
            confirmPassword
        };
    
        try {
            const response = await fetch('http://10.132.181.204:3001/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
    
            const res = JSON.parse(await response.text());
    
            if (res.error) {
                console.log("Register failed:", res.error);
            } else {
                console.log("Register successful!");
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error("Error during register:", error);
        }
    };
    
    const navigateToLogin = () => {
        navigation.navigate('Login');
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
    textContainer: {
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Omnes Regular',
        fontSize: 40,
        color: 'black',
        marginBottom: 40,
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
        width: width * 0.7,
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop: 30,
        padding: 10,
    },
    Loginbutton: {
        backgroundColor: 'black',
        padding: 10,
        marginBottom: 15, 
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center', 
        color: 'black',
        width: width * 0.7,
    },
    Registerbutton: {
        borderColor: 'black',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 30, 
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center', 
        color: 'black',
    },
    LoginbuttonText: {
        fontFamily: 'Roboto Medium',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    RegisterbuttonText: {
        fontFamily: 'Roboto Medium',
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    });

    const renderStepOne = () => {
      return (
          <View style={styles.textContainer}>
              <Text style={styles.text}>Register</Text>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                      style={styles.input}
                      onChangeText={text => setUserData(prevState => ({ ...prevState, firstName: text }))}
                      value={userData.firstName}
                      placeholder="Enter your first name"
                  />
              </View>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                      style={styles.input}
                      onChangeText={text => setUserData(prevState => ({ ...prevState, lastName: text }))}
                      value={userData.lastName}
                      placeholder="Enter your last name"
                  />
              </View>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                      style={styles.input}
                      onChangeText={text => setUserData(prevState => ({ ...prevState, email: text }))}
                      value={userData.email}
                      placeholder="Enter your email address"
                  />
              </View>

              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.Loginbutton} onPress={() => handleNextStep()}>
                      <Text style={styles.LoginbuttonText}>Next</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Registerbutton} onPress={navigateToLogin}>
                      <Text style={styles.RegisterbuttonText}>Login</Text>
                  </TouchableOpacity>
              </View>
          </View>
      );
  };

  const renderStepTwo = () => {
      return (
          <View style={styles.textContainer}>
              <Text style={styles.text}>Register</Text>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                      style={styles.input}
                      onChangeText={text => setUserData(prevState => ({ ...prevState, username: text }))}
                      value={userData.username}
                      placeholder="Enter your username"
                  />
              </View>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                      style={styles.input}
                      onChangeText={text => setUserData(prevState => ({ ...prevState, password: text }))}
                      value={userData.password}
                      placeholder="Enter your password"
                      secureTextEntry={true}
                  />
              </View>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                      style={styles.input}
                      onChangeText={text => setUserData(prevState => ({ ...prevState, confirmPassword: text }))}
                      value={userData.confirmPassword}
                      placeholder="Confirm your password"
                      secureTextEntry={true}
                  />
              </View>

              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.Loginbutton} onPress={handleRegister}>
                      <Text style={styles.LoginbuttonText}>Create Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Registerbutton} onPress={() => setStep(step - 1)}>
                      <Text style={styles.RegisterbuttonText}>Back</Text>
                  </TouchableOpacity>
              </View>
          </View>
      );
  };

  return (
    <View style={styles.container}>
            <BorderGradient>
                <Rect
                    x={width * 0.06} 
                    y={height * 0.06} 
                    width={width * 0.87}
                    height={height * 0.9}
                    color="white">
                    <CornerPathEffect r={30}/>
                </Rect>
            </BorderGradient>

        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}

    </View>
  );
    
}
