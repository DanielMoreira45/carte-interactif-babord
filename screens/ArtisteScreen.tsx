import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';

import { TitreComposant } from './composant/composant';
import { ScreenComposant } from './composant/composant';
import Ionicons from 'react-native-vector-icons/Ionicons';

const closeIcon = require('../assets/close_icon.png');
const backImage = require('./assets/backgroundProfile.png');
const logo = require('././assets/logo_artiste.png');
const { height, width } = Dimensions.get('window');

const ArtisteScreen = ({ navigation }) => {
  return ( <ScreenComposant navigation = {navigation} logoProfile = {logo} title = {"Title"} isArtist={true}/>);
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-start",
  },
  logo: {
    alignSelf: "center",
    width: width / 1.7,
    height: width / 1.7,
    marginTop: 15,
  },
  suivreButtonContainer: {
    backgroundColor: '#000',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 30,
  },
  suivreButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3399',
    textAlign: 'center',
    fontFamily: 'chivo.regular',
  },
  left: {
    alignSelf: "flex-start"
  },
  right: {
    alignSelf: "flex-end"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8,
    height: height * 0.8,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 80,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default ArtisteScreen;
