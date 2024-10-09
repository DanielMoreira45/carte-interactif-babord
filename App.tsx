import React from 'react';
import HomeScreen from "./screens/HomeScreen";
import ConnectionScreen from "./screens/ConnectionScreen";
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
  <Stack.Navigator initialRouteName='HomeScreen'>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Connection"
      component={ConnectionScreen}
    />
  </Stack.Navigator>
</NavigationContainer>
);

export default App;