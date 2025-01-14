import React, { useState } from 'react';
import {
  Dimensions,
} from 'react-native';

import { ScreenComposant } from './composant/composant';

const logo = require('././assets/logo_user.png');

const UserScreen = ({ navigation }) => {
  return ( <ScreenComposant navigation = {navigation} logoProfile = {logo} title = {"Title"} isArtist={false}/>);
};


export default UserScreen;
