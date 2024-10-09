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
} from 'react-native';

import { TextInput } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const backImage = require('./assets/backgroundConnexion.png');

const { width } = Dimensions.get('window');

const RegistrationScreen = ({ navigation }) => {
    const [firstName, onChangeFirstName] = React.useState('');
    const [lastName, onChangeLastName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'android' ? 40 : 75} 
        >
            <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
                <SafeAreaView style={styles.safeArea}>
                    {/* Основной контент */}
                    <View style={styles.contentContainer}>
                    <TextInput
                            label="Prénom"
                            value={firstName}
                            onChangeText={onChangeFirstName}
                            style={styles.input}
                            activeUnderlineColor="#FF3399"
                        />
                        <TextInput
                            label="Nom"
                            value={lastName}
                            onChangeText={onChangeLastName}
                            style={styles.input}
                            activeUnderlineColor="#FF3399"
                        />
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
                            secureTextEntry={true} // скрытие пароля
                        />
                    </View>

                    <View style={styles.bottomContainer}>
                        <Text style={styles.agreement}>
                            By continuing, you agree to our
                            <Link to={{ screen: '' }} style={styles.link}> Terms of Service </Link> and
                            <Link to={{ screen: '' }} style={styles.link}> Privacy Policy</Link>.
                        </Text>
                        <AppButton
                            onPress={() => navigation.navigate("")}
                            title="Inscription"
                        />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
};

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
)

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
        marginBottom: 20, 
    },
    appButtonContainer: {
        backgroundColor: "#FF3399",
        borderRadius: 48,
        paddingVertical: 16,
        paddingHorizontal: 32,
        width: width - 47,
        height: 48,
        alignSelf: "center",
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
    },
    link: {
        color: '#FF3399',
        alignSelf: "center",
        marginTop: 20,
    },
    input: {
        width: width - 47,
        height: 48,
        alignSelf: "center",
        marginTop: 20,
        fontSize: 16,
        lineHeight: 24,
        backgroundColor: "#FFFFFF"
    },
    agreement: {
        width: width - 47,
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Chivo',
        color: '#000000',
        marginBottom: 20,
        alignSelf: "center",
        textAlign: 'center'
    }
});

export default RegistrationScreen;