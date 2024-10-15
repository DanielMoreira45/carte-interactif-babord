import React from 'react';
import EntryScreen from "./screens/EntryScreen";
import ConnectionScreen from "./screens/ConnectionScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const { height } = Dimensions.get('window');

const App = () => (
  <NavigationContainer>
  <Stack.Navigator initialRouteName='EntryScreen'>
    <Stack.Screen
      name="Entry"
      component={EntryScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Connexion"
      component={ConnectionScreen}
    />
    <Stack.Screen
      name="Inscription"
      component={RegistrationScreen}
    />
  </Stack.Navigator>
</NavigationContainer>
);

export default App;