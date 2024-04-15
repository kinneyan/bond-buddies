import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FontLoader from './components/FontLoader';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotScreen from './screens/ForgotScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserScreen from './screens/UserScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import QuestionScreen from './screens/QuestionScreen';
import FriendsScreen from './screens/FriendsScreen';
import SettingsScreen from './screens/SettingsScreen';
import VerifyScreen from './screens/VerifyScreen';

const Stack = createStackNavigator();

function App() {

  const customFonts = {
    'Omnes Bold': require('./assets/fonts/Omnes Bold.ttf'),
    'Omnes Regular': require('./assets/fonts/Omnes Regular.ttf'),
    'Roboto Regular': require('./assets/fonts/Roboto Regular.ttf'),
    'Roboto Medium': require('./assets/fonts/Roboto Medium.ttf'),
  };

  return (
    <FontLoader fonts={customFonts}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Forgot" component={ForgotScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="UserHome" component={UserScreen} />
          <Stack.Screen name="Assessment" component={AssessmentScreen} />
          <Stack.Screen name="Questions" component={QuestionScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Verify" component={VerifyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FontLoader>
  );
}

export default App;