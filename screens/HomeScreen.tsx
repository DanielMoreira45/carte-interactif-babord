import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Link } from '@react-navigation/native';
import { GroupType, UserType, ConcertType } from './composant/Types';

const logo = require('./assets/logo_babord.png');
const im2 = require('./assets/backgroundEntry.png');

const HomeScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [actualites, setRectangles] = useState<ConcertType[]>([]);
  const [artistes, setArtistes] = useState<GroupType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userActuel, setUserActuel] = useState<UserType>();

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
        setUserActuel(data.find((us) => us.id === user.id));
      } catch (error) {
        console.error('Erreur lors du chargement dun user :', error);
      }
    };
    loadUser();
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
            userActuel?.suivre_groupe.includes(item.id)
          //&& new Date(item.date_debut) >= currentDate
        );
        setRectangles(filteredData);
      } catch (error) {
        console.error('Erreur lors du chargement des marqueurs :', error);
      }
    };
    loadConcerts();
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
        //console.log('Données des marqueurs :', data);
        setArtistes(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des artistes :', error);
        setIsLoading(false);
      }
    };
    loadArtists();
  }, [user.id, userActuel?.suivre_groupe]);
  
  const onConcertPress = (concert: typeof actualites[0]) => {
    try {
      navigation.navigate('DetailsConcerts', { marker_id: concert.id });
    } catch (error) {
      console.error('Erreur lors de la navigation vers les détails :', error);
    }
  };

  const onArtistePress = (item: typeof artistes[0]) => {
    try {
      navigation.navigate('ArtisteScreen', { navigation: navigation, profile: item, user: user })
    } catch (error) {
      console.error('Erreur lors de la navigation vers les détails :', error);
    }
  };
  const renderItemActualite = ({ item }: { item: typeof actualites[0] }) => {

    return (
      <TouchableOpacity onPress={() => onConcertPress(item)}>
        <View style={[styles.card1]}>
          <ImageBackground source={im2} style={styles.cardimages1}>
            <View style={styles.overlay} />
            <View style={styles.content}>
              <Text style={styles.cardTitle} numberOfLines={2} ellipsizeMode="tail" >{item.intitule}</Text>
              <Text style={styles.card1Details}>{item.date_debut}, {item.lieu}</Text>
              <View style={styles.cardLink}>
              <Link to={{ screen: 'ArtisteScreen' }}><Text style={styles.card1Details}>Voir plus</Text></Link>
            </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemArtiste = ({ item }: { item: typeof artistes[0] }) => {

    return (
      <TouchableOpacity onPress={() => onArtistePress(item)}>
        <View style={[styles.card2]}>
          <Image source={im2} style={styles.cardimages2} />
          <Text style={styles.cardName}>{item.libelle}</Text>
          <Text style={styles.card2Details}>Détail ...</Text>
        </View>
      </TouchableOpacity>
    );
  };
if (isLoading) {
        return (
          <View style={styles.contain}>
            <Text style={styles.loadingText}>Chargement des données...</Text>
          </View>
        );
      }
  return (
    <LinearGradient
      colors={['#000000', '#FF3399']}
      style={styles.linearGradient}
    >
      <ScrollView style={{ marginBottom: 65 }}>
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.title}>
          Ohé explorateurice à grandes oreilles !
        </Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Prochains concerts</Text>
          <Link to={{ screen: 'Connexion' }} style={styles.link}>View All</Link>
        </View>



        <View style={styles.container1}>
          <FlatList
            data={actualites}
            horizontal
            renderItem={renderItemActualite}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.cardList}
          />
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Proche de chez vous</Text>
          <Link to={{ screen: 'Connexion' }} style={styles.link}>View All</Link>
        </View>
        <View style={styles.container2}>
          <FlatList
            data={artistes}
            horizontal
            renderItem={renderItemArtiste}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.cardList}
          />
        </View>
      </ScrollView>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  logo: {
    width: 103,
    height: 103,
    marginTop: 45,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: 'Chivo',
    color: '#FFFFFF',
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 21
  },
  container1: {
    flex: 1,
    maxHeight: 180
  },
  container2: {
    flex: 1,
    maxHeight: 255,
  },
  cardList: {
    marginHorizontal: 15
  },
  card1: {
    width: 290,
    height: 170,
    margin: 5,
    marginRight: 9,
    backgroundColor: '#000',
    borderRadius: 18,
    elevation: 3, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
  },
  card2: {
    display: "flex",
    width: 200,
    height: 250,
    flexDirection: 'column',
    margin: 5,
    marginRight: 17,
    backgroundColor: '#000',
    borderRadius: 25,
    elevation: 3, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,

    overflow: 'hidden',
  },
  selectedCard: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  cardTitle: {
    paddingTop: 10,
    fontSize: 32,
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
    fontWeight: "bold",
    marginLeft: 18,
  },
  card2Details: {
    fontSize: 13,
    color: '#FFF',
    marginTop: 10,
    maxWidth: 210,
    fontWeight: "bold",
    marginLeft: 18,

  },
  cardimages1: {
    width: "100 %",
    height: "100 %",
  },
  cardimages2: {
    width: "100 %",
    height: 160,
    borderRadius: 25,
  },
  cardLink: {
    position: 'absolute',
    top: 130,
    //marginTop: 45,
    marginLeft: 18,
    marginBottom: 18,
    backgroundColor: "#000",
    borderRadius: 18,
    width: 150,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    height: 28,
    maxWidth: 70,
    fontSize: 12,
    justifyContent: "center",
  },
  cardLinkText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    alignSelf: "center",
    height: 28,
    maxWidth: 70,
    fontSize: 12,
    textAlign: "center",
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
  subtitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
  },
  cont: {
    marginHorizontal: 20
  },
  link: {
    fontSize: 15,
    color: "#FF3399",

  },
  subtitleContainer: {

    display: "flex",
    backgroundColor: "#000",
    borderRadius: 10,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 15,
    paddingHorizontal: 15,
    fontSize: 17,
    lineHeight: 25,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  contain: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

});

export default HomeScreen;