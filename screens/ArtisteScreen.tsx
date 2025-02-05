import React from 'react';

import ScreenComposant from './composant/ScreenComposant';

const logo = require('././assets/logo_artiste.png');

const ArtisteScreen = ({ route }: { route: any }) => {
  const { user, profile, navigation } = route.params;
  return (<ScreenComposant navigation={navigation} logoProfile={logo} profile={profile} isArtist={true} userTemp={user}/>);

};

export default ArtisteScreen;
