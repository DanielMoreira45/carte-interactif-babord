import React from 'react';
import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

const logo = require('../assets/logo_babord.png');

interface ButtonComposantProps {
    text: string;
    onPress?: () => void;
    style?: object;
}

const ButtonComposant: React.FC<ButtonComposantProps> = ({ onPress, text, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Image source={logo} style={styles.logoButton} />
            <Text style={styles.subText}>{text}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    logoButton: {
        width: 55,
        height: 55,
        marginBottom: 8,
    },
    subText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'chivo.regular',
        lineHeight: 24,
        textAlign: 'center'
    },
    container: {
        width: 145,
        alignItems: "center",
        marginBottom: 15,
        marginHorizontal: 15,
    },
});

export default ButtonComposant;