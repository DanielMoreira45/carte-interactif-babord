import React from 'react';
import EntryScreen from "./screens/EntryScreen";
import ConnectionScreen from "./screens/ConnectionScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import MainScreen from "./screens/MainScreen";
import CarteScreen from './screens/CarteScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

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
    <Stack.Screen
      name="Main"
      component={MainScreen}
      options={{headerShown: false}}
      />
    <Stack.Screen
      name="Carte"
      component={CarteScreen}
      />
  </Stack.Navigator>
</NavigationContainer>
);

export default App;
