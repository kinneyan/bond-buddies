import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, Dimensions, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import BottomMenu from '../components/BottomMenu';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CloseIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
  </svg>
`;

const SettingsScreen = () => {

  const [dataFetched, setDataFetched] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    getUserInfo();

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
  }, []);

  const { width, height } = Dimensions.get('window');
  const diagonalLength = Math.sqrt(width * width + height * height);
  const navigation = useNavigation();
  const route = useRoute();

  const { bearerToken } = route.params || {};
  console.log(bearerToken);  

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
    confirmPassword: '',
    passwordsMatchError: ''
  });


  const getUserInfo = async () => {
    try {

      if (bearerToken) {
        const response = await fetch('http://10.132.181.204:3001/user/self', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${bearerToken}`
          }
        });
  
        if (!response.ok) {
          console.error("Couldn't get user info. Status:", response.status);
          return;
        }
  
        const data = await response.json();
  
        if (!data) {
          console.error("Invalid user data received from server:", data);
          return;
        }
  
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          login: data.login,
          password: 'Valid1',
          confirmPassword: 'Valid1' 
        });

        setDataFetched(true);
      }
    } catch (error) {
      console.error("Error fetching user info: ", error);
      setErrorMessage("Error fetching user info: " + error.message);
    }
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setsuccessMessage] = useState('');

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

  const validatelogin = (login) => {

      if(!login.trim()){
          return 'login cannot be blank';
      } 
      else {
          const containsLetter = /[a-zA-Z]/.test(login);
          const isValid = /^[a-zA-Z0-9]+$/.test(login);
          return (isValid && containsLetter) ? '' : 'login must only contain\nletters and numbers';
      }
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return ''; // Skip validation if password is blank
    } else {
      const containsUppercase = /[A-Z]/.test(password);
      const containsNumber = /[0-9]/.test(password);
      const isValidLength = password.length >= 5;
      const isValid = /^[a-zA-Z0-9]+$/.test(password);
      return (isValid && containsUppercase && containsNumber && isValidLength) ? '' : 'Password must contain at least one uppercase letter, one number, and a minimum of 5 characters';
    }
  };
  
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword.trim()) {
      return ''; // Skip validation if confirmPassword is blank
    } else {
      return password === confirmPassword ? '' : 'Passwords do not match';
    }
  };
  

  const passwordMatch = (password, confirmPassword) => {
      return password === confirmPassword ? '' : 'Passwords do not match';
  }

  const handleSave = async () => {
    
    const { firstName, lastName, email, login, password, confirmPassword } = userData;
  
    const loginError = validatelogin(login);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    const passwordsMatchError = passwordMatch(password, confirmPassword);
  
    setErrors({ ...errors, login: loginError, password: passwordError, confirmPassword: confirmPasswordError })
  
    if(loginError || passwordError || confirmPasswordError || passwordsMatchError){ 
      return;
    }
  
    const updatedFields = {
      firstName,
      lastName,
      email,
      login,
    };

    console.log(updatedFields);
  
    try {
      const response = await fetch('http://10.132.181.204:3001/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${bearerToken}`
        },
        body: JSON.stringify(updatedFields)
      });
  
      const res = JSON.parse(await response.text());

      console.log(res);
  
      if (res.error === 'login is already taken.') {
        setErrorMessage("login already exists");
        setErrors({ ...errors, login: 'login already exists' });
        return;
      } else if (res.error) {
        console.log("Register failed:", res.error);
      } else {
        console.log("Save successful!");
        setsuccessMessage("Save successful!");
        //navigation.navigate('Home');
      }
    } catch (error) {
      console.error("Error during save:", error);
    }
  };
  
  const handleLogout = async () => {

    try {
      await AsyncStorage.removeItem('bearerToken');
  
      setUserData({
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        password: '',
        confirmPassword: ''
      });
  
      setErrors({
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        password: '',
        confirmPassword: '',
        passwordsMatchError: ''
      });
  
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleWidgetPress = (screenName) => {
    navigation.navigate(screenName, { bearerToken, greeting });
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

        {dataFetched ? (
          <ScrollView style={styles.editInfoContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={[styles.input, errors.firstName !== '' && styles.inputError]}
                  onChangeText={text => {
                    setUserData(prevState => ({ ...prevState, firstName: text }));
                    setErrors(prevState => ({ ...prevState, firstName: validateFirstName(text) }));
                  }}
                  placeholder="First Name"
                  value={userData.firstName} 
                /> 
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={[styles.input, errors.lastName !== '' && styles.inputError]}
                  onChangeText={text => {
                    setUserData(prevState => ({ ...prevState, lastName: text }));
                    setErrors(prevState => ({ ...prevState, lastName: validateLastName(text) }));
                  }}
                  placeholder="Last Name"
                  value={userData.lastName} 
                /> 
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email !== '' && styles.inputError]}
                  onChangeText={text => {
                    setUserData(prevState => ({ ...prevState, email: text }));
                    setErrors(prevState => ({ ...prevState, email: validateEmail(text) }));
                  }}
                  placeholder="Email"
                  value={userData.email}
                  keyboardType="email-address"
                /> 
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
                <TextInput
                  style={[styles.input, errors.login !== '' && styles.inputError]}
                  onChangeText={text => {
                    setUserData(prevState => ({ ...prevState, login: text }));
                    setErrors(prevState => ({ ...prevState, login: validatelogin(text) }));
                  }}
                  placeholder="login"
                  value={userData.login}
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
                  placeholder="Password"
                  value={userData.password}
                  secureTextEntry
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
                  placeholder="Confirm Password"
                  value={userData.confirmPassword}
                  secureTextEntry
                /> 
            </View>
          </ScrollView>
        ) : (
        <ActivityIndicator style={styles.indic} size="large" color="#000000" />
      )}
      
      </View>
              
      <View style={styles.separator} />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Settings</Text>
        <TouchableOpacity onPress={handleBackPress} style={styles.imageContainer}>
          <SvgXml xml={CloseIcon} />
        </TouchableOpacity>
      </View>

      {errors.firstName !== '' && <Text style={styles.ErrorText}>{errors.firstName.replace(/\n/g, '\n')}</Text>}
      {errors.lastName !== '' && <Text style={styles.ErrorText}>{errors.lastName.replace(/\n/g, '\n')}</Text>}
      {errors.email !== '' && <Text style={styles.ErrorText}>{errors.email}</Text>}
      {errorMessage !== '' && <Text style={styles.ErrorText}>{errorMessage}</Text>}
      {errors.login !== '' && <Text style={styles.ErrorText}>{errors.login.replace(/\n/g, '\n')}</Text>}
      {errors.password !== '' && <Text style={styles.ErrorText}>{errors.password.replace(/\n/g, '\n')}</Text>}
      {errors.confirmPassword !== '' && <Text style={styles.ErrorText}>{errors.confirmPassword}</Text>}
      {errors.passwordsMatchError !== '' && <Text style={styles.ErrorText}>{errors.passwordsMatchError}</Text>}
      {successMessage !== '' && <Text style={styles.SuccessText}>{successMessage}</Text>}

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
  ErrorText: {
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Roboto Regular',
    fontSize: 16,
    bottom: 60,
    color: 'red',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 2,
  },
  SuccessText:{
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Roboto Regular',
    fontSize: 16,
    bottom: 60,
    color: 'green',
  },
  indic:{
    marginBottom: 55,
    marginTop: 20,
  }
});

export default SettingsScreen;
