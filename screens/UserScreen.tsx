import React from 'react';
import ScreenComposant from './composant/ScreenComposant';

const logo = require('././assets/logo_user.png');

const UserScreen = ({ navigation, route }) => {
  const { user } = route.params;
  return ( <ScreenComposant navigation={navigation} logoProfile={logo} profile={null} isArtist={false} userTemp = {user}/>);
};

export default UserScreen;
