import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import { Link } from '@react-navigation/native';
const backImage = require('./assets/backgroundEntry.png');
const logo = require('./assets/logo_babord.png');
const { height } = Dimensions.get('window');

const EntryScreen = ({navigation}) => (
  <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
    <SafeAreaView>
      <Image source={logo} style={styles.logo}></Image>
      <View style={styles.container}>
        <Text style={styles.title}>
          Je connais la Beyoncé de Guéret !
        </Text>
        <AppButton
          onPress={() => navigation.navigate("Inscription")}
          title="Creer un compte"
        />
        <Text style={styles.text}>déjà bâbordien.ne ? <Link to={{ screen: 'Connexion' }} style={styles.link}>
          Connectez-vous
        </Link></Text>
      </View>
    </SafeAreaView>
  </ImageBackground>

);

const AppButton = ( {onPress, title} ) => (
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
    minWidth: 182,
    minHeight: 48,
    alignSelf: 'center',
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
    top: height * 0.67,
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
    width: 130,
    height: 130,
    top: 15,
    alignSelf: 'center',

  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Chivo',
    color: '#000000',
  },
  link: {
    color: '#FF3399',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default EntryScreen;