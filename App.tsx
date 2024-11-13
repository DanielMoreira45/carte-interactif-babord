import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import CarteScreen from './screens/CarteScreen';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
  <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
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
    <Stack.Screen
      name="Carte"
      component={CarteScreen}
    />
  </Stack.Navigator>
</NavigationContainer>
);

export default App;
