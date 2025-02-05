import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';

import { TextInput } from 'react-native-paper';
import { Link } from '@react-navigation/native';

const backImage = require('./assets/backgroundConnexion.png');

const { width } = Dimensions.get('window');

const ConnectionScreen = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await fetch('http://86.218.243.242:8000/api/mobile-login/', {
                method: 'POST',
                headers: {
                    'permission': 'web_user',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erreur:', errorData);
                Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
                return;
            }

            const userData = await response.json();
            console.log('Utilisateur connecté :', userData);

            Alert.alert('Succès', `Bienvenue, ${userData.prenom}!`);
            navigation.navigate('Main', { user: userData });
            //navigation.navigate('Main');
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            Alert.alert('Erreur', 'Impossible de terminer la connexion.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 75}
        >
            <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.contentContainer}>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={onChangeEmail}
                            style={styles.input}
                            activeUnderlineColor="#FF3399"
                        />
                        <TextInput
                            label="Mot de passe"
                            value={password}
                            onChangeText={onChangePassword}
                            style={styles.input}
                            activeUnderlineColor="#FF3399"
                            secureTextEntry={true}
                        />
                        <Link to={{ screen: '' }} style={styles.link}>Mot de passe oublié ?</Link>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Text style={styles.agreement}>
                            By continuing, you agree to our
                            <Link to={{ screen: '' }} style={styles.link}> Terms of Service </Link> and
                            <Link to={{ screen: '' }} style={styles.link}> Privacy Policy</Link>.
                        </Text>
                        <AppButton
                            //onPress={() => navigation.navigate("Main")}
                            onPress={handleLogin}
                            title="Connexion"
                        />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    contentContainer: {
        alignItems: 'center',
    },
    bottomContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    appButtonContainer: {
        backgroundColor: '#FF3399',
        borderRadius: 48,
        paddingVertical: 16,
        paddingHorizontal: 32,
        width: width - 47,
        height: 48,
        alignSelf: 'center',
    },
    appButtonText: {
        fontSize: 16,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'Chivo',
        lineHeight: 16,
    },
    image: {
        flex: 1,
    },
    link: {
        color: '#FF3399',
        alignSelf: 'center',
        marginTop: 20,
    },
    input: {
        width: width - 47,
        height: 48,
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 16,
        lineHeight: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    agreement: {
        width: width - 47,
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Chivo',
        color: '#000000',
        marginBottom: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
});

export default ConnectionScreen;
