import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Canvas, Rect, CornerPathEffect, LinearGradient, vec } from "@shopify/react-native-skia";
import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'Omnes Regular': require('../assets/fonts/Omnes Regular.ttf'),
    'Roboto Regular': require('../assets/fonts/Roboto Regular.ttf'),
    'Roboto Medium': require('../assets/fonts/Roboto Medium.ttf'),
  });
}

export default function ForgotScreen() {

    const { width, height } = Dimensions.get('window');
    const diagonalLength = Math.sqrt(width * width + height * height);
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [resetEmailSent, setResetEmailSent] = useState(false);

    useEffect(() => {
        loadFonts();
    }, []);

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
        Titletext: {
            fontFamily: 'Omnes Regular',
            fontSize: 40,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 40,
            textAlign: 'center',

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
            marginTop: 10,
            fontSize: 16,
            color: 'blue',
            textDecorationLine: 'none',
        },
        ForgotSubmitText: {
            fontFamily: 'Roboto Regular',
            fontSize: 16,
            marginTop: 30,
            color: 'green',
        },
    });

    const handleEmail = () => {
      console.log('email:', email);
      // Add logic to send reset email here
      // Call API to send the reset email
      // On success, update the state to show the message
      setResetEmailSent(true);
  };


    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Canvas style={[styles.canvas, { width, height }]}>
                <Rect x={0} y={0} width={width} height={height}>
                    <LinearGradient
                        start={vec(width / 2 - diagonalLength / 2, height / 2 - diagonalLength / 2)}
                        end={vec(width / 2 + diagonalLength / 2, height / 2 + diagonalLength / 2)}
                        colors={['#FF1B6B', '#BA5CA2', '#7B97D4', '#45CAFF']}
                    />
                </Rect>
                <Rect
                    x={width * 0.06} 
                    y={height * 0.06} 
                    width={width * 0.87}
                    height={height * 0.9}
                    color="white">
                    <CornerPathEffect r={30} />
                </Rect>
            </Canvas>

            <View style={styles.textContainer}>
            <Text style={styles.Titletext}>Forgot{'\n'}Password</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder="Enter your email address"
                    />
                </View>
                {resetEmailSent && <Text style={styles.ForgotSubmitText}>Reset email sent!</Text>}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.Loginbutton} onPress={handleEmail}>
                        <Text style={styles.LoginbuttonText}>Reset Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Registerbutton} onPress={navigateToLogin}>
                        <Text style={styles.RegisterbuttonText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
