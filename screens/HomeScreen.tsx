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
  Linking,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const backImage = require('./assets/background.png');
const logo = require('./assets/logo_babord.png');

const { height } = Dimensions.get('window');

const HomeScreen = () => (
  <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
    <View>
    <SafeAreaView>
    <Image source={logo} style={styles.logo}></Image>
      <View style={styles.container}>
        <Text style={styles.title}>
          Un miel bio ?
        </Text>
        <Text style={styles.title}>
          Ou un café équitable ?
        </Text>
        <AppButton
          onPress={() => Alert.alert('Simple Button pressed')}
          title="Creer un compte"
        />
        <Text style={styles.text}>Déjà chez nous ? <Text style={styles.link}>Connectez-vous</Text></Text>
      </View>
    </SafeAreaView>
    </View>
  </ImageBackground>
);

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
  <Text style={styles.appButtonText}>{title}</Text>
</TouchableOpacity>
)

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 1,
    backgroundColor: "#FF3399",
    borderRadius: 48,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 193,
    height: 48,
    alignSelf: "center",
    gap: 10,
    marginTop: 65,
    marginBottom: 25,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    fontFamily: 'Chivo',
    lineHeight: 16,
  },
  image: {
    flex: 1,
    //justifyContent: 'center',
  },
  container: {
  //   flex: 1,
  //   justifyContent: 'center',
    position: 'absolute',
    top: height * 0.62,
    marginHorizontal: 16,
    alignSelf: "center",
  },
  view: {
    //flex: 1,
    //justifyContent: 'center',
    top: height * 0.62,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    fontFamily: 'Chivo',   
  },
  logo: {
    width: 94,
    height: 93,
    top: 15,
    alignSelf: "center",

  },
  text: {
    width: 252,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Chivo',
    color: '#000000'
  },
  link: {
    color: '#FF3399'
  }
});

export default HomeScreen;