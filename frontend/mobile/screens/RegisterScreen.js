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

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        passwordsMatchError: ''
    });

    const [attemptedNext, setAttemptedNext] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');
    const [bearerToken, setbearerToken] = useState('');

    const validateFirstName = (firstName) => {

        if(!firstName.trim()){
            return 'First name cannot be blank';
        } 
        else{
            const isValid = /^[a-zA-Z]+$/.test(firstName);
            return isValid ? '' : 'First name must only\ncontain alphabetic characters';
        }
    };

    const validateLastName = (lastName) => {

        if(!lastName.trim()){
            return 'Last name cannot be blank';
        } 
        else{
            const isValid = /^[a-zA-Z]+$/.test(lastName);
            return isValid ? '' : 'Last name must only\ncontain alphabetic characters';
        }
    };

    const validateEmail = (email) => {

        if(!email.trim()){
            return 'Email cannot be blank';
        } 
        else{
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            return isValid ? '' : 'Email address is invalid';
        }
    };

    const validateUsername = (username) => {

        if(!username.trim()){
            return 'Username cannot be blank';
        } 
        else {
            const containsLetter = /[a-zA-Z]/.test(username);
            const isValid = /^[a-zA-Z0-9]+$/.test(username);
            return (isValid && containsLetter) ? '' : 'Username must only contain\nletters and numbers';
        }
    };

    const validatePassword = (password) => {

        if(!password.trim()){
            return 'Password cannot be blank';
        } 
        else{
            const containsUppercase = /[A-Z]/.test(password);
            const containsNumber = /[0-9]/.test(password);
            const isValidLength = password.length >= 5;
            const isValid = /^[a-zA-Z0-9]+$/.test(password);
            return (isValid && containsUppercase && containsNumber && isValidLength) ? '' : 'Password must contain at least\none uppercase letter, one number,\nand a minimum of 5 characters';
        }
    };

    const validateConfirmPassword = (password) => {

        if(!password.trim()) {
            return 'Confirm password cannot be blank';
        } 
        else{
            return '';
        }
    }; 
    

    const passwordMatch = (password, confirmPassword) => {
        return password === confirmPassword ? '' : 'Passwords do not match';
    }

    const handleNextStep = () => {

        const { firstName, lastName, email } = userData;

        const firstNameError = validateFirstName(firstName);
        const lastNameError = validateLastName(lastName);
        const emailError = validateEmail(email);

        setErrors({ ...errors, firstName: firstNameError, lastName: lastNameError, email: emailError });

        if(firstNameError || lastNameError || emailError){
            setAttemptedNext(true); 
            return;
        }

        setStep(step + 1);
    };
  
    const handleRegister = async () => {

        const {firstName, lastName, email, username, password, confirmPassword } = userData;

        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(confirmPassword);
        const passwordsMatchError = passwordMatch(password, confirmPassword);

        setErrors({ ...errors, username: usernameError, password: passwordError, confirmPassword: confirmPasswordError }); 

        if(usernameError || passwordError || confirmPasswordError || passwordsMatchError){ 
            return;
        }
        
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

                //console.log(res);
        
                if(res.error === 'Username is already taken.'){
                    setErrorMessage("Username already exists");
                    setErrors({ ...errors, username: 'Username already exists' });
                    return;
                }
                else if (res.error) {
                    console.log("Register failed:", res.error);
                } 
                else {
                    console.log("Register successful!");
                    setbearerToken(res.bearer);
                }
            } catch (error) {
                console.error("Error during register:", error);
            }

    };

    useEffect(() => {

        console.log(bearerToken);

        if(bearerToken) {
            handleEmailVerification();
            navigation.navigate('Login', { bearerToken });
        }
    }, [bearerToken]);

    const handleEmailVerification = async () => {

        try{

            //console.log(bearerToken);

            const response = await fetch('http://10.132.181.204:3001/user/verify', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${bearerToken}`
                },
            });

            if(response.ok) {
                console.log("Email verification sent.");
            } else {
                console.error("Email verification failed to send: ", response.error);
            }

        }catch (error) {
            console.error("Error during verification email sending: ", error);
        };

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
        ErrorText: {
            textAlign: 'center',
            fontFamily: 'Roboto Regular',
            fontSize: 16,
            marginTop: 30,
            color: 'red',
        },
        inputError: {
            borderColor: 'red',
            borderWidth: 2,
        },
    });

    const renderStepOne = () => {

        return (
          <View style={styles.textContainer}>
              <Text style={styles.text}>Register</Text>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                      style={[styles.input, (errors.firstName !== '' || (attemptedNext && !userData.firstName.trim())) && styles.inputError]}
                      onChangeText={text => {
                          setUserData(prevState => ({ ...prevState, firstName: text }));
                          setErrors(prevState => ({ ...prevState, firstName: validateFirstName(text) }));
                      }}
                      value={userData.firstName}
                      placeholder="Enter your first name"
                  />
              </View>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                      style={[styles.input, (errors.lastName !== '' || (attemptedNext && !userData.lastName.trim())) && styles.inputError]}
                      onChangeText={text => {
                          setUserData(prevState => ({ ...prevState, lastName: text }));
                          setErrors(prevState => ({ ...prevState, lastName: validateLastName(text) }));
                      }}
                      value={userData.lastName}
                      placeholder="Enter your last name"
                  />
              </View>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                      style={[styles.input, (errors.email !== '' || (attemptedNext && !userData.email.trim())) && styles.inputError]}
                      onChangeText={text => {
                          setUserData(prevState => ({ ...prevState, email: text }));
                          setErrors(prevState => ({ ...prevState, email: validateEmail(text) }));
                      }}
                      value={userData.email}
                      placeholder="Enter your email address"
                  />
              </View>

              {errors.firstName !== '' && <Text style={styles.ErrorText}>{errors.firstName.replace(/\n/g, '\n')}</Text>}
              {errors.lastName !== '' && <Text style={styles.ErrorText}>{errors.lastName.replace(/\n/g, '\n')}</Text>}
              {errors.email !== '' && <Text style={styles.ErrorText}>{errors.email}</Text>}
              {errorMessage !== '' && <Text style={styles.ErrorText}>{errorMessage}</Text>}

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
                        style={[styles.input, errors.username !== '' && styles.inputError]}
                        onChangeText={text => {
                            setUserData(prevState => ({ ...prevState, username: text }));
                            setErrors(prevState => ({ ...prevState, username: validateUsername(text) }));
                        }}
                        value={userData.username}
                        placeholder="Enter your username"
                        />
              </View>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                      style={[styles.input, errors.password !== '' && styles.inputError]}
                      onChangeText={text => {
                          setUserData(prevState => ({ ...prevState, password: text }));
                          setErrors(prevState => ({ ...prevState, password: validatePassword(text), passwordsMatchError: passwordMatch(text, userData.confirmPassword) }));
                        }}
                        value={userData.password}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        />
              </View>

              <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                      style={[styles.input, errors.confirmPassword !== '' && styles.inputError]}
                      onChangeText={text => {
                          setUserData(prevState => ({ ...prevState, confirmPassword: text }));
                          setErrors(prevState => ({ ...prevState, confirmPassword: validateConfirmPassword(text), passwordsMatchError: passwordMatch(userData.password, text) }));
                        }}
                        value={userData.confirmPassword}
                        placeholder="Confirm your password"
                        secureTextEntry={true}
                    />
              </View>

              {errors.username !== '' && <Text style={styles.ErrorText}>{errors.username.replace(/\n/g, '\n')}</Text>}
              {errors.password !== '' && <Text style={styles.ErrorText}>{errors.password.replace(/\n/g, '\n')}</Text>}
              {errors.confirmPassword !== '' && <Text style={styles.ErrorText}>{errors.confirmPassword}</Text>}
              {errors.passwordsMatchError !== '' && <Text style={styles.ErrorText}>{errors.passwordsMatchError}</Text>}

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
