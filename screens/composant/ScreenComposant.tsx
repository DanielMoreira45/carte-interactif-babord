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
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarComposant from './SearchBarComposant';
import TitreComposant from './TitreComposant';
import ButtonComposant from './ButtonComposant';
import { GroupType, UserType, ConcertType } from './Types';

const backImage = require('../assets/backgroundProfile.png');
const logo_homme = require('../assets/homme.png');
const logo_femme = require('../assets/femme.png');
const image = require('../assets/backgroundProfile.png');
const { height, width } = Dimensions.get('window');
let suivreGroupeIds: number[]  = [];

const handleFollowArtist = async (profile, user) => {
    // console.log('Utilisateur:',  JSON.stringify({
    //     suivre_groupe: [...suivreGroupeIds, profile.id],
    // }));
    console.log('test', ...suivreGroupeIds);
    console.log('test2', profile.id);
    let newGroupesSuivis;
    if (suivreGroupeIds.includes(profile.id)) {
        newGroupesSuivis = suivreGroupeIds.filter((id) => id !== profile.id);
    } else {
        newGroupesSuivis = [...suivreGroupeIds, profile.id];
    }
    //const newGroupesSuivis = suivreGroupeIds.includes(profile.id) ? suivreGroupeIds.filter((id) => id !== profile.id) : [...suivreGroupeIds, profile.id];
    //console.log('aled',newGroupesSuivis);
    try {
        const response = await fetch(`http://86.218.243.242:8000/api/Utilisateur/${user.id}/`, {
            method: "PATCH",
            headers: {
                'permission': 'mobile_user',
                 "Content-Type": "application/json",
            },
            body: JSON.stringify({
                suivre_groupe: [...newGroupesSuivis],
            }),
        });
        //console.log([...suivreGroupeIds, profile.id]);
        //console.log('Réponse:', response);
        if (!response.ok) {
            //throw new Error("Erreur lors de la mise à jour");
            const errorData = await response.json();
            console.error('Erreur:', errorData);
            Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout d\'une groupe.');
            return;
        }
        const updatedUser = await response.json();
        console.log('Réponse:', updatedUser);
        suivreGroupeIds = updatedUser.suivre_groupe;
        Alert.alert("Artiste ajouté aux abonnements !");
    } catch (error) {
        console.error("Erreur lors de la requête:", error);
        Alert.alert("Impossible d'ajouter l'artiste !");
    }
};
const AppButton = ({ title, profile, user }) => (
//     <TouchableOpacity onPress={onPress} style = { title === "Suivre" ? styles.suivreButtonContainer : styles.suiviButtonContainer}>
//     <Text style={title === "Suivre" ? styles.suivreButtonText : styles.suiviButtonText}>{title}</Text>
// </TouchableOpacity>
<TouchableOpacity 
        onPress={() => {handleFollowArtist(profile, user)}}
        style={title === "Suivre" ? styles.suivreButtonContainer : styles.suiviButtonContainer}
    >
        <Text style={title === "Suivre" ? styles.suivreButtonText : styles.suiviButtonText}>
            {title}
        </Text>
    </TouchableOpacity>

);

const ScreenComposant = ({ navigation, logoProfile, profile, isArtist, userTemp }) => {
    //const [groups, setRectangles] = useState<GroupType[]>([]);
    //const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const loadGroupes = async () => {
    //         try {
    //             const response = await fetch('http://86.218.243.242:8000/api/groupes/', {
    //                 method: 'GET',
    //                 headers: {
    //                     'permission': 'web_user',
    //                 },
    //             });
    //             let data = await response.json();
    //             data = data.results;
    //             // console.log('Données des marqueurs :', data);
    //             setRectangles(data);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error('Erreur lors du chargement des marqueurs :', error);
    //             setIsLoading(false);
    //         }
    //     };
    //     loadGroupes();
    // }, []);
    //console.log('Données des groupes :', groups);
    //const group = groups.find((group) => group.id === profile_id);
    //console.log('Données du group :', profile_id);
    
      const [suivreGroupe, setSuivreGroupe] = useState<GroupType[]>([]);
      const [users, setUsers] = useState<UserType[]>([]);
      const [filteredConcerts, setFilteredConcerts] = useState<ConcertType[]>([]);
    // const Actualite = [
    //     {
    //         id: 1,
    //         title: 'Nom de l’actualité',
    //         details: 'détail de l’actualité',
    //         image: image,
    //     },
    //     {
    //         id: 2,
    //         title: 'Nom de l’actualité',
    //         details: 'détail de l’actualité',
    //         image: image,
    //     },
    //     {
    //         id: 3,
    //         title: 'Nom de l’actualité',
    //         details: 'détail de l’actualité',
    //         image: image,
    //     },
    //     {
    //         id: 4,
    //         title: 'Nom de l’actualité',
    //         details: 'détail de l’actualité',
    //         image: image,
    //     },
    // ];

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
    const renderItemArtiste = ({ item }: { item: GroupType }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={[styles.card1]}>
                    <ImageBackground source={image} style={styles.cardimages1}>
                        <View style={styles.overlay} />
                        <View style={styles.content}>
                            <Text style={styles.cardTitle}>{item.libelle}</Text>
                            <Text style={styles.card1Details}>{item.description}</Text>
                            {/* <View style={styles.cardLink}>
                                <Link to={{ screen: '' }}><Text style={styles.card1Details}>Voir plus</Text></Link>
                            </View> */}
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        );
    };

    const renderItemAConcert = ({ item }: { item: ConcertType }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={[styles.card1]}>
                    <ImageBackground source={image} style={styles.cardimages1}>
                        <View style={styles.overlay} />
                        <View style={styles.content}>
                            <Text style={styles.cardTitle}>{item.intitule}</Text>
                            <Text style={styles.card1Details}>{item.date_debut}, {item.lieu}</Text>
                            {/* <View style={styles.cardLink}>
                                <Link to={{ screen: '' }}><Text style={styles.card1Details}>Voir plus</Text></Link>
                            </View> */}
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        );
    };
    useEffect(() => {
          const loadUser = async () => {
            try {
              const response = await fetch('http://86.218.243.242:8000/api/Utilisateur/', {
                method: 'GET',
                headers: {
                  'permission': 'mobile_user',
                },
              });
              let data = await response.json();
              data = data.results;
              setUsers(data);
            } catch (error) {
              console.error('Erreur lors du chargement dun user :', error);
            }
          };
          loadUser();
}, []);
    const user = users.find((us) => us.id === userTemp.id);
    suivreGroupeIds = user?.suivre_groupe ?? [];
    useEffect(() => {
        const loadArtists = async () => {
            try {
              const response = await fetch('http://86.218.243.242:8000/api/groupes/', {
                method: 'GET',
                headers: {
                  'permission': 'web_user',
                },
              });
              let data = await response.json();
              data = data.results;
              const filteredData = data.filter((groupe) => suivreGroupeIds.includes(groupe.id));
              //console.log('Groupes suivi :', suivreGroupeIds);
              console.log('Groupes filtrés :', filteredData);
              setSuivreGroupe(filteredData);
            } catch (error) {
              console.error('Erreur lors du chargement des artistes :', error);
            }
          };
          loadArtists();
          const loadConcerts = async () => {
            try {
              const response = await fetch('http://86.218.243.242:8000/api/concerts/', {
                method: 'GET',
                headers: {
                  'permission': 'web_user',
                },
              });
              let data = await response.json();
              data = data.results;
              //console.log('Données des marqueurs :', data);
              //const currentDate = new Date();
              const filteredData = data.filter(
                (item) =>
                  item.groupe === profile.id
                //&& new Date(item.date_debut) >= currentDate
              );
              setFilteredConcerts(filteredData);
            } catch (error) {
              console.error('Erreur lors du chargement des marqueurs :', error);
            }
          };
          loadConcerts();
    }, []);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    //let text = isArtist ? profile?.libelle : profile?.nom;
    let text = isArtist ? profile?.libelle : `${user?.prenom} ${user?.nom}`;

    const toggleModal = (content) => {
        setModalContent(content);
        setModalVisible(!isModalVisible);
    };
    const filteredSuivreGroupe = suivreGroupe.filter(item =>
        item.libelle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const buttonData = [
        {
            id: 1,
            title: isArtist ? "Description" : "Mes infos",
            content: isArtist ? (
                <View >
                    <Text style={styles.modalTitle}>Description de {profile?.libelle}</Text>

                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>{profile?.description}</Text>
                        <Text style={styles.modalSubtitle}>Nombre de personnes</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Image
                                source={logo_homme}
                                style={{ width: 35, height: 35, }}
                            />
                            <Text style={styles.modalText}>{profile?.nb_homme} hommes</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Image
                                source={logo_femme}
                                style={{ width: 35, height: 35, }}
                            />
                            <Text style={styles.modalText}>{profile?.nb_femme} femmes</Text>
                        </View>
                        <Text style={styles.modalSubtitle}>Producteurice</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(profile?.lien_producteur)}>
                            <Text style={styles.modalLien}>{profile?.producteur}</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalSubtitle}>Département d’origine</Text>
                        <Text style={styles.modalText}>{profile?.departement}</Text>
                    </View>
                </View>
            ) : (

                <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>Mes infos</Text>

                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalSubtitle}>Nom</Text>
                        <Text style={styles.modalText}>{user?.nom}</Text>
                        <Text style={styles.modalSubtitle}>Prénom</Text>
                        <Text style={styles.modalText}>{user?.prenom}</Text>
                        <Text style={styles.modalSubtitle}>Email</Text>
                        <Text style={styles.modalText}>{user?.mail}</Text>
                        <Text style={styles.modalSubtitle}>Code Postale</Text>
                        <Text style={styles.modalText}>{user?.code_postal}</Text>
                    </View>
                </View>
            )
        },
        {
            id: 2,
            title: isArtist ? "Prochains concerts" : "Artistes et \nlieux favoris",
            content: isArtist ? (
                <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>Prochains concerts de {profile?.libelle}</Text>

                    <View style={styles.container1}>
                        <FlatList
                            //data={Actualite}
                            data={filteredConcerts}
                            renderItem={renderItemAConcert}
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
                            data={filteredSuivreGroupe}
                            ListHeaderComponent={
                                <SearchBarComposant
                          searchQuery = {searchQuery}
                          setSearchQuery = {setSearchQuery}
                          setModalVisible = {setModalVisible}
                          searchIconSize = {20}
                          filterIconSize = {24}
                          iconColor = "#888"
                          placeholderTextColor = "#888"
                          searchBarHeight = {40}
                          searchBarWidth = '100%'
                          filterButtonHeight = {40}
                          filterButtonWidth = {40}
                        />
                            }
                            renderItem={renderItemArtiste}
                            keyExtractor={item => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            style={styles.cardList}
                        />
                    </View>
                </View>
            )
        },
        isArtist ? ({
            id: 3,
            title: isArtist ? "Liens" : "Mes événements\npassés",
            content: isArtist ? (
                <View>
                    <Text style={styles.modalTitle}>Liens de {profile?.libelle}</Text>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>Youtube: {profile?.lien_youtube}</Text>
                        <Text style={styles.modalText}>Twitter: {profile?.lien_twitter}</Text>
                        <Text style={styles.modalText}>Facebook:{profile?.lien_facebook}</Text>
                        <Text style={styles.modalText}>Instagram:{profile?.lien_instagram}</Text>

                    </View>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>Evenements Suivies</Text>

                    <View style={styles.container1}>
                        {/* <FlatList
                            data={Actualite}
                            renderItem={renderItemActualite}
                            keyExtractor={item => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            style={styles.cardList}
                        /> */}
                    </View>
                </View>
            )
        }): {},
    ];

    //   if (isLoading) {
    //     return (
    //       <View style={styles.cont}>
    //         <Text style={styles.loadingText}>Chargement des données...</Text>
    //       </View>
    //     );
    //   }
    // if (group) {

    suivreGroupeIds = user?.suivre_groupe || [];
        return (
            <ImageBackground source={backImage} style={styles.image}>
                <ScrollView style={{ marginBottom: 65 }}>
                    <Image source={logoProfile} style={styles.logo} resizeMode="contain"></Image>

                    <TitreComposant text={text} />


                    <View>
                        {isArtist ? (
                            <AppButton
                                title={user?.suivre_groupe?.includes(profile.id) ? "Suivi" : "Suivre"}
                                profile={profile}
                                user={user}
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
    //}
};

const styles = StyleSheet.create({
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
        height: height * 0.1,
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

export default ScreenComposant;