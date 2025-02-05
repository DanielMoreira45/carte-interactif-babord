import React from 'react';
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
import ArtisteScreen from './ArtisteScreen';

const logo = require('./assets/logo_babord.png');
const im1 = require('./assets/backgroundConnexion.png');
const im2 = require('./assets/backgroundEntry.png');

const Actualite = [
  {
    id: 1,
    title: 'Nom de l’actualité',
    details: 'détail de l’actualité',
    image: im1,
  },
  {
    id: 2,
    title: 'Nom de l’actualité',
    details: 'détail de l’actualité',
    image: im1,
  },
  {
    id: 3,
    title: 'Nom de l’actualité',
    details: 'détail de l’actualité',
    image: im1,
  },
];

const Artiste = [
  {
    id: 1,
    name: 'Nom de l’artiste',
    details: "détails",
    image: im2,
  },
  {
    id: 2,
    name: 'Nom de l’artiste',
    details: "détails",
    image: im2,
  },
  {
    id: 3,
    name: 'Nom de l’artiste',
    details: "détails",
    image: im2,
  },
];

const HomeScreen = ({ navigation }) => {

  const renderItemActualite = ({ item }: { item: typeof Actualite[0] }) => {

    return (
      <TouchableOpacity onPress={() => navigation.navigate('DetailsConcerts', { marker_id: item.id })}>
        <View style={[styles.card1]}>
          <ImageBackground source={item.image} style={styles.cardimages1}>
            <View style={styles.overlay} />
            <View style={styles.content}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.card1Details}>{item.details}</Text>
              <View style={styles.cardLink}>
              <Link to={{ screen: 'ArtisteScreen' }}><Text style={styles.card1Details}>Voir plus</Text></Link>
            </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemArtiste = ({ item }: { item: typeof Artiste[0] }) => {

    return (
      <TouchableOpacity onPress={() => navigation.navigate('ArtisteScreen')}>
        <View style={[styles.card2]}>
          <Image source={item.image} style={styles.cardimages2} />
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.card2Details}>Détail ...</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    
    <LinearGradient
      colors={['#000000', '#FF3399']}
      style={styles.linearGradient}
    >
      <ScrollView style={{marginBottom: 65}}>
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.title}>
        Ohé explorateurice à grandes oreilles !
      </Text>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Prochains concerts</Text>
        <Link to={{ screen: 'Connexion'}} style={styles.link}>View All</Link>
      </View>



      <View style={styles.container1}>
        <FlatList
          data={Actualite}
          horizontal
          renderItem={renderItemActualite}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.cardList}
        />
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Proche de chez vous</Text>
        <Link to={{ screen: 'Connexion'}} style={styles.link}>View All</Link>
      </View>
      <View style={styles.container2}>
        <FlatList
          data={Artiste}
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
    marginTop: 45,
    marginLeft: 18,
    marginBottom: 18,
    backgroundColor: "#000",
    borderRadius: 18,
    width: "30%",
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
  cardLinkText:{
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

});

export default HomeScreen;