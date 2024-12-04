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
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import { TextInput } from 'react-native-paper';
import { Link } from '@react-navigation/native';


const backImage = require('./assets/backgroundProfile.png');
const logo = require('./assets/logo_artiste.png');

const { width } = Dimensions.get('window');

const ArtisteScreen = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
            <Image source={logo} style={styles.logo}></Image>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    image: {
        flex: 1,
    },
});

export default ArtisteScreen;
