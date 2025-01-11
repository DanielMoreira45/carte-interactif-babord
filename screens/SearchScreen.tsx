import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Modal,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer, Link} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConnectionScreen from './ConnectionScreen';
import EntryScreen from './EntryScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const background = require('./assets/backgroundSearchScreen.png');
const imageConcert = require('./assets/imageConcert.jpg');

const SearchScreen = ({navigation}) => {
  const [rectangles, setRectangles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch('http://86.218.243.242:8000/api/groupes/', {
      headers: {
        'Permission': 'web_user',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Mettez à jour l'état des box des groupes avec les données récupérées
        setRectangles(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <ImageBackground source={background} style={[StyleSheet.absoluteFill]}>
      <FlatList
        data={rectangles}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Concerts, ..."
                placeholderTextColor="#888"
              />
            </View>
            <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
              <Icon name="filter" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.rectangle} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
            <ImageBackground source={imageConcert} style={styles.imageBackground} imageStyle={styles.imageStyle}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.libelle}</Text>
                <Text style={styles.subtitle}>{item.description}</Text>
                <Text style={styles.type}>Département : {item.departement}</Text>
                <TouchableOpacity style={styles.moreButton} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
                  <Text style={styles.moreButtonText}>Voir plus</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options de filtrage</Text>
            {/* Ajoutez vos options de filtrage ici */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  searchContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 50,
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontFamily: 'Chivo-Regular',
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#ff3399',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  listContainer: {
    paddingBottom: 80,
    alignItems: 'center',
  },
  rectangle: {
    width: 334,
    height: 160,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  imageStyle: {
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Alignez les éléments en haut
    alignItems: 'flex-start', // Alignez les éléments sur la gauche
    paddingHorizontal: 10, // Ajoutez un padding horizontal pour créer un espace à gauche
    paddingVertical: 10, // Ajoutez un padding vertical pour créer un espace en haut
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left', // Alignez le texte à gauche
    fontFamily: 'Chivo-Regular',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'left', // Alignez le texte à gauche
    fontFamily: 'Chivo-Regular',
  },
  type: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'left', // Alignez le texte à gauche
    fontFamily: 'Chivo-Regular',
  },
  moreButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#ff3399',
    borderRadius: 20,
    paddingVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Chivo-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Chivo-Regular',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff3399',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Chivo-Regular',
  },
});

export default SearchScreen;