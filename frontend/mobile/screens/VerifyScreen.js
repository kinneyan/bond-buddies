import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rect, CornerPathEffect} from "@shopify/react-native-skia";
import BorderGradient from '../components/BorderGradient'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerifyScreen() {

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();

    const [username, setUsername] = useState('');

    const [errors, setErrors] = useState({
        username: '',
    });

    const validateUsername = (username) => {

        if(!username.trim()) {
            return 'Username cannot be blank';
        } 
        else{
            return '';
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
        LoginbuttonText: {
            fontFamily: 'Roboto Medium',
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
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
                <Text style={styles.text}>Verification</Text>

                <View>
                    <Text>
                        Thank you for verifying your account! Log in below 
                        to confirm your access.
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.Loginbutton} onPress={navigateToLogin}>
                        <Text style={styles.LoginbuttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
