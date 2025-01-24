import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    FlatList,
    Linking,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Link } from '@react-navigation/native';

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
    <TouchableOpacity onPress={onPress} style = { title === "Suivre" ? styles.suivreButtonContainer : styles.suiviButtonContainer}>
    <Text style={title === "Suivre" ? styles.suivreButtonText : styles.suiviButtonText}>{title}</Text>
</TouchableOpacity>
);

type GroupType = {
    id: number;
    libelle: string;
    description: string;
    nb_homme: string;
    nb_femme: number;
    producteur: string;
    lien_producteur: string;
    departement: string;
};

const ScreenComposant = ({ navigation, logoProfile, profile_id, isArtist }) => {
    const [groups, setRectangles] = useState<GroupType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadGroupes = async () => {
            try {
                const response = await fetch('http://86.218.243.242:8000/api/groupes/', {
                    method: 'GET',
                    headers: {
                        'permission': 'web_user',
                    },
                });
                const data = await response.json();
                // console.log('Données des marqueurs :', data);
                setRectangles(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Erreur lors du chargement des marqueurs :', error);
                setIsLoading(false);
            }
        };
        loadGroupes();
    }, []);

    const group = groups.find((group) => group.id === profile_id);
    //console.log('Données du group :', profile_id);

    const Actualite = [
        {
            id: 1,
            title: 'Nom de l’actualité',
            details: 'détail de l’actualité',
            image: image,
        },
        {
            id: 2,
            title: 'Nom de l’actualité',
            details: 'détail de l’actualité',
            image: image,
        },
        {
            id: 3,
            title: 'Nom de l’actualité',
            details: 'détail de l’actualité',
            image: image,
        },
        {
            id: 4,
            title: 'Nom de l’actualité',
            details: 'détail de l’actualité',
            image: image,
        },
    ];
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
                    <View style={{ marginTop: 50 }}>
                        <ScrollView>
                            {content}
                        </ScrollView>

                    </View>
                </View>
            </View>

        );
    };
    const renderItemActualite = ({ item }: { item: typeof Actualite[0] }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={[styles.card1]}>
                    <ImageBackground source={item.image} style={styles.cardimages1}>
                        <View style={styles.overlay} />
                        <View style={styles.content}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.card1Details}>{item.details}</Text>
                            <View style={styles.cardLink}>
                                <Link to={{ screen: '' }}><Text style={styles.card1Details}>Voir plus</Text></Link>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
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
            title: isArtist ? "Description" : "Mes infos",
            content: isArtist && group ? (
                <View >
                    <Text style={styles.modalTitle}>Description de {group.libelle}</Text>

                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore</Text>
                        <Text style={styles.modalSubtitle}>Nombre de personnes</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Image
                                source={logo_homme}
                                style={{ width: 35, height: 35, }}
                            />
                            <Text style={styles.modalText}>{group.nb_homme} hommes</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Image
                                source={logo_femme}
                                style={{ width: 35, height: 35, }}
                            />
                            <Text style={styles.modalText}>{group.nb_femme} femmes</Text>
                        </View>
                        <Text style={styles.modalSubtitle}>Producteurice</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(group.lien_producteur)}>
                            <Text style={styles.modalLien}>{group.producteur}</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalSubtitle}>Département d’origine</Text>
                        <Text style={styles.modalText}>{group.departement}</Text>
                    </View>
                </View>
            ) : (

                <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>Description de NOM User</Text>

                    <View style={styles.modalTextContainer}>

                        <Text style={styles.modalSubtitle}>Nom</Text>

                        <Text style={styles.modalText}>Nom</Text>

                        <Text style={styles.modalSubtitle}>Prénom</Text>
                        <Text style={styles.modalText}>Prenom</Text>
                        <Text style={styles.modalSubtitle}>Email</Text>
                        <Text style={styles.modalText}>Email</Text>
                    </View>
                </View>
            )
        },
        {
            id: 2,
            title: isArtist ? "Prochains concerts" : "Artistes et \nlieux favoris",
            content: isArtist ? (
                <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>Prochains concerts de NOM ARTISTE</Text>

                    <View style={styles.container1}>
                        <FlatList
                            data={Actualite}
                            renderItem={renderItemActualite}
                            keyExtractor={item => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            style={styles.cardList}
                        />
                    </View>
                </View>

            ) : (
                <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>Artistes Suivies</Text>

                    <View style={styles.container1}>
                        <FlatList
                            data={Actualite}
                            renderItem={renderItemActualite}
                            keyExtractor={item => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            style={styles.cardList}
                        />
                    </View>
                </View>
            )
        },
        {
            id: 3,
            title: isArtist ? "Liens" : "Mes événements\npassés",
            content: isArtist ? (
                <View>
                    <Text style={styles.modalTitle}>Liens de NOM ARTISTE</Text>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>Site web:</Text>
                        <Text style={styles.modalText}>Youtube:</Text>
                        <Text style={styles.modalText}>Facebook:</Text>
                        <Text style={styles.modalText}>Instagram:</Text>

                    </View>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>Evenements Suivies</Text>

                    <View style={styles.container1}>
                        <FlatList
                            data={Actualite}
                            renderItem={renderItemActualite}
                            keyExtractor={item => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            style={styles.cardList}
                        />
                    </View>
                </View>
            )
        },
    ];
      if (isLoading) {
        return (
          <View style={styles.cont}>
            <Text style={styles.loadingText}>Chargement des données...</Text>
          </View>
        );
      }
    if (group) {
        return (
            <ImageBackground source={backImage} style={styles.image}>
                <ScrollView style={{ marginBottom: 65 }}>
                    <Image source={logoProfile} style={styles.logo} resizeMode="contain"></Image>

                    <TitreComposant text={group.libelle} />


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

                    {isArtist && (
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.label-babord.fr/embarquer/ ?')}>
                            <Text style={styles.link}>Bâbord j’adore alors j’adhère !</Text>
                        </TouchableOpacity>
                    )}


                </ScrollView>
                {isModalVisible && (
                    <ModalComposant
                        content={modalContent}
                    />
                )}
            </ImageBackground>);
    }
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
        textAlign: 'center'
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
        //width: width / 1.7,
        //height: width / 1.7,
        //width: height * 0.10,
        height: height * 0.28,
        marginTop: 15,
    },
    suivreButtonContainer: {
        backgroundColor: '#000',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 30,
    },
    suiviButtonContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 30,
    },
    suiviButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        fontFamily: 'chivo.regular',
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
        verticalAlign: "middle"
    },
    modalContent: {
        width: width * 0.8,
        height: height * 0.8,
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 25,
        //alignItems: 'center',
        position: 'relative',
        marginBottom: 130,

        //marginTop: 50,
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
        alignSelf: 'auto',
        marginVertical: 10,
    },
    modalTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#FF3399',
        textAlign: 'center',
        marginVertical: 10,
    },
    modalTextContainer: {
        //marginHorizontal: 50,

    },
    modalSubtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'flex-start',
        //marginVertical: 5,
    },
    modalImage: {
        maxWidth: width * 0.7,
        height: height * 0.15,
        borderRadius: 18,
    },
    container1: {
        //flex: 1,
        //maxHeight: 180
    },
    cardList: {
        //marginHorizontal: 15
    },
    card1: {
        //width: 290,
        width: width * 0.678,
        //height: 170,
        height: height * 0.18,
        //margin: 5,
        marginBottom: 20,
        backgroundColor: '#000',
        borderRadius: 18,
        elevation: 3, // Ombre pour Android
        shadowColor: '#000', // Ombre pour iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        flexDirection: 'row',
        overflow: 'hidden',
    },

    selectedCard: {
        borderColor: 'blue',
        borderWidth: 2,
    },
    cardTitle: {
        paddingTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 18,
    },
    cardName: {
        paddingTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 18,
    },
    card1Details: {
        fontSize: 14,
        color: '#FFF',
        marginTop: 5,
        maxWidth: 210,
        fontWeight: 'bold',
        marginLeft: 18,
    },

    cardimages1: {
        width: '100 %',
        height: '100 %',
    },

    cardLink: {
        marginTop: 45,
        marginLeft: 18,
        backgroundColor: '#000',
        borderRadius: 18,
        width: "30%",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center",
        alignItems: 'center',
        height: 28,
        maxWidth: 70,
        fontSize: 12,
        justifyContent: 'center',
    },
    cardLinkText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
        height: 28,
        maxWidth: 70,
        fontSize: 12,
        textAlign: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 16,
    },
    content: {
        position: 'absolute',
        opacity: 1
    },
    linkBabordContainer: {
        elevation: 1,
        backgroundColor: '#FF3399',
        borderRadius: 48,
        paddingVertical: 5,
        paddingHorizontal: 20,
        //minWidth: 182,
        //minHeight: 48,
        alignSelf: 'center',
        gap: 10,
        marginTop: 25,
        marginBottom: 25,
    },
    linkBabordText: {
        fontSize: 16,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'Chivo',
        lineHeight: 16,
    },
    link: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
        lineHeight: 24,
        textDecorationLine: 'underline',
    },
    modalLien: {
        fontSize: 18,
        color: '#000',
        alignSelf: 'auto',
        marginVertical: 10,
        textDecorationLine: 'underline',
    },
    loadingText: {
        fontSize: 18,
        color: '#333',
      },
      cont: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
});

export { TitreComposant, ButtonComposant, ScreenComposant };