import React from 'react';

import { ScreenComposant } from './composant/composant';

const logo = require('././assets/logo_user.png');

const UserScreen = ({ navigation, route }) => {
  const { user } = route.params;
  return ( <ScreenComposant navigation={navigation} logoProfile={logo} profile={user} isArtist={false} />);
};

export default UserScreen;
