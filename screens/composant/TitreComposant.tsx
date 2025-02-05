import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const TitreComposant = ({ text }: { text: string }) => {
    return (
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    labelContainer: {
        backgroundColor: '#FF3399', // Couleur rose vif
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'center', // Centrer horizontalement si nécessaire
        marginVertical: 20,
    },
    labelText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000', // Texte noir
        textAlign: 'center',
        fontFamily: 'chivo.regular',
    },
});

export default TitreComposant;
