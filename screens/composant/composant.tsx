import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const backImage = require('../assets/backgroundProfile.png');
const logo = require('../assets/logo_babord.png');
const logo_homme = require('../assets/homme.png');
const logo_femme = require('../assets/femme.png');
const image = require('../assets/backgroundProfile.png');
const { height, width } = Dimensions.get('window');

const TitreComposant = ({ text }: { text: string }) => {
    return (
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{text}</Text>
        </View>
    );
};

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


const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.suivreButtonContainer}>
        <Text style={styles.suivreButtonText}>{title}</Text>
    </TouchableOpacity>
);



const ScreenComposant = ({ navigation, logoProfile, title, isArtist }) => {
    const ModalComposant = ({ content }) => {
        return (
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={() => toggleModal('')}
                        style={styles.closeButton}
                    >
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                    <ScrollView style={{ marginTop: 20 }}>
                        {content}
                    </ScrollView>
                </View>
            </View>

        );
    };

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const toggleModal = (content) => {
        setModalContent(content);
        setModalVisible(!isModalVisible);
    };
    const buttonData = [
        {
            id: 1,
            title: isArtist ? "Description" : "Informations\nPersonnelles",
            content: (
                <View >
                    <Image
                            source={image}
                            style = {styles.modalImage}
                        />
                    <Text style={styles.modalTitle}>Description de NOM ARTISTE</Text>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</Text>
                    </View>
                    <Text style={styles.modalSubtitle}>Nombre de personnes</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 5}}>
                        <Image
                            source={logo_homme}
                            style={{ width: 35, height: 35, }}
                        />
                        <Text style={styles.modalText}>5 hommes</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 5}}>
                        <Image
                            source={logo_femme}
                            style={{ width: 35, height: 35, }}
                        />
                        <Text style={styles.modalText}>5 femmes</Text>
                    </View>
                    <Text style={styles.modalSubtitle}>Date de création</Text>
                    <Text style={styles.modalText}>07/02/2021</Text>
                </View>
            )
        },
        {
            id: 2,
            title: isArtist ? "Actualités" : "Artistes/\nEvenements\nSuives",
            content: (
                <View>
                    <Text style={styles.modalTitle}>Description de NOM ARTISTE</Text>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</Text>
                    </View>
                    <Text style={styles.modalSubtitle}>Nombre de personnes</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 5}}>
                        <Image
                            source={logo_homme}
                            style={{ width: 35, height: 35, }}
                        />
                        <Text style={styles.modalText}>5 hommes</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 5}}>
                        <Image
                            source={logo_femme}
                            style={{ width: 35, height: 35, }}
                        />
                        <Text style={styles.modalText}>5 femmes</Text>
                    </View>
                    <Text style={styles.modalSubtitle}>Date de création</Text>
                    <Text style={styles.modalText}>07/02/2021</Text>
                </View>
            )
        },
        {
            id: 3,
            title: isArtist ? "Liens" : "Artistes/\nEvenements\nSuives",
            content: (
            <View>
                <Text style={styles.modalTitle}>Liens de NOM ARTISTE</Text>
                <Text style={styles.modalText}>Youtube:</Text>
                <Text style={styles.modalText}>Instagram:</Text>
                
            </View>
            )
        },
    ];
    return (
        <ImageBackground source={backImage} style={styles.image}>
            <ScrollView>
                <Image source={logoProfile} style={styles.logo} resizeMode="contain"></Image>
                <TitreComposant text={title} />
                <View>
                    {isArtist ? (
                        <AppButton
                            onPress={() => navigation.navigate("Main")}
                            title="Suivre"
                        />
                    ) : null}
                </View>
                {buttonData.map((button) => (
                    <ButtonComposant
                        key={button.id}
                        onPress={() => toggleModal(button.content)}
                        text={button.title}
                        style={button.id % 2 === 0 ? styles.right : styles.left}
                    />
                ))}


                {isModalVisible && (
                    <ModalComposant
                        content={modalContent}
                    />
                )}


            </ScrollView>
        </ImageBackground>);
};

const styles = StyleSheet.create({
    labelContainer: {
        backgroundColor: '#ff3399', // Couleur rose vif
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
    },
    container: {
        width: 145,
        alignItems: "center",
        marginBottom: 15,
        marginHorizontal: 15,
    },

    image: {
        flex: 1,
        justifyContent: "flex-start",
    },
    logo: {
        alignSelf: "center",
        width: width / 1.7,
        height: width / 1.7,
        marginTop: 15,
    },
    suivreButtonContainer: {
        backgroundColor: '#000',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 30,
    },
    suivreButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF3399',
        textAlign: 'center',
        fontFamily: 'chivo.regular',
    },
    left: {
        alignSelf: "flex-start"
    },
    right: {
        alignSelf: "flex-end"
    },
    modalOverlay: {
        position: "absolute",
        width: width,
        height: height,
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {

        width: width * 0.8,
        height: height * 0.8,
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
        marginBottom: 130,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    modalText: {
        fontSize: 18,
        color: '#000',
        alignSelf: 'auto'
    },
    modalTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#FF3399',
        textAlign: 'center',
        marginVertical: 5,
    },
    modalTextContainer: {
        margin: 15,

    },
    modalSubtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 5,
    },
    modalImage:{
        width: 280,
        height: 170,
        margin: 5,
        marginRight: 9,
        borderRadius: 18,
    }
});

export { TitreComposant, ButtonComposant, ScreenComposant };