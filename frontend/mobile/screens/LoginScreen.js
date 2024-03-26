import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rect, CornerPathEffect} from "@shopify/react-native-skia";
import BorderGradient from '../components/BorderGradient'; 
import { API_URL } from '../components/ApiAddress';

export default function LoginScreen() {

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        const obj = {
            username,
            password,
        };

        try{

            const response = await fetch(API_URL + '/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(obj)
            });

            const res = await response.json();

            if(res.error){
                console.log("Login failed:", res.error);
            } 
            else{
                console.log("Login successful!");
                navigation.navigate('UserHome');
            }
        }catch(error){
            console.error("Error during login:", error);
        }

    };
    
    const navigateToForgotPassword = () => {
        navigation.navigate('Forgot'); 
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textContainer: {
            alignItems: 'center',
        },
        text: {
            fontFamily: 'Omnes Regular',
            fontSize: 40,
            fontWeight: 'bold',
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
        forgotPasswordContainer: {
            alignSelf: 'flex-start',
            marginLeft: width * 0.03,
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
        forgotPasswordText: {
            fontFamily: 'Roboto Regular',
            marginTop: 10,
            fontSize: 16,
            color: 'blue',
            textDecorationLine: 'none',
        },
    });

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
            <View style={styles.textContainer}>
                <Text style={styles.text}>Login</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setUsername(text)}
                        value={username}
                        placeholder="Enter your username"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.forgotPasswordContainer} onPress={navigateToForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.Loginbutton} onPress={handleLogin}>
                        <Text style={styles.LoginbuttonText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Registerbutton} onPress={navigateToRegister}>
                        <Text style={styles.RegisterbuttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
