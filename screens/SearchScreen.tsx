import React from 'react';
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
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer, Link} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConnectionScreen from './ConnectionScreen';
import EntryScreen from './EntryScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const logo = require('./assets/logo_babord.png');


const SearchScreen = ({navigation}) => (
  <LinearGradient
    colors={['#000000', '#FF3399']}
    style={styles.linearGradient}
  >
    <Image source={logo} style={styles.logo}></Image>
    <Text style={styles.title}>
      Search screen
    </Text>
    </LinearGradient>
);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    //justifyContent: 'space-between',
    //alignItems: 'center',
  },
  logo: {
    width: 94,
    height: 93,
    marginTop: 15,
    //top: 15,
    alignSelf: "center",

  },
  title: {
    width: 175,
    fontSize: 25,
    lineHeight: 25,
    fontFamily: 'Chivo',
    color: '#FFFFFF',
    alignSelf: "center",
    marginTop: 23
  }
});

export default SearchScreen;