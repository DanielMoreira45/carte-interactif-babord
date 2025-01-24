import React from 'react';

import { ScreenComposant } from './composant/composant';

const logo = require('././assets/logo_artiste.png');

const ArtisteScreen = ({ route }: { route: any }) => {
  const { profile_id, navigation } = route.params;
  return (<ScreenComposant navigation={navigation} logoProfile={logo} profile_id={profile_id} isArtist={true} />);

};

export default ArtisteScreen;
