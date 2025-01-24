import React from 'react';

import { ScreenComposant } from './composant/composant';

const logo = require('././assets/logo_user.png');

const UserScreen = (navigation) => {
  return ( <ScreenComposant navigation = {navigation} logoProfile = {logo} profile_id = {1} isArtist={false}/>);
};

export default UserScreen;
