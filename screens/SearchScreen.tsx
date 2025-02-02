import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Modal,
} from 'react-native';
import { listeDepartements } from './constants/listeDepartements';

import ModalSelector from 'react-native-modal-selector';
const Icon = require('react-native-vector-icons/Ionicons').default;
const background = require('./assets/backgroundSearchScreen.png');
const imageConcert = require('./assets/imageConcert.jpg');

const SearchScreen = () => {
  const [rectangles, setRectangles] = useState<(groupe | album | concert | festival | info)[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    type: 'groupes',
    nb_homme: '0',
    nb_femme: '0',
    departement: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === '') {
        setRectangles([]);
        return;
      }
    
      try {
        const [groupesResponse, albumsResponse, concertsResponse, festivalsResponse, infosResponse] = await Promise.all([
          fetch(`http://86.218.243.242:8000/api/groupes?q=${searchQuery}`, {
            headers: {
              'Permission': 'web_user',
            },
          }),
          fetch(`http://86.218.243.242:8000/api/albums?q=${searchQuery}`, {
            headers: {
              'Permission': 'web_user',
            },
          }),
          fetch(`http://86.218.243.242:8000/api/concerts?q=${searchQuery}`, {
            headers: {
              'Permission': 'web_user',
            },
          }),
          fetch(`http://86.218.243.242:8000/api/festivals?q=${searchQuery}`, {
            headers: {
              'Permission': 'web_user',
            },
          }),
          fetch(`http://86.218.243.242:8000/api/infos?q=${searchQuery}`, {
            headers: {
              'Permission': 'web_user',
            },
          }),
        ]);
    
        const groupesData = await groupesResponse.json();
        const albumsData = await albumsResponse.json();
        const concertsData = await concertsResponse.json();
        const festivalsData = await festivalsResponse.json();
        const infosData = await infosResponse.json();
    
        const combinedData = [
          ...groupesData.results.map((item: groupe) => ({ ...item, type: 'groupe' })),
          ...albumsData.results.map((item: album) => ({ ...item, type: 'album' })),
          ...concertsData.results.map((item: concert) => ({ ...item, type: 'concert' })),
          ...festivalsData.results.map((item: festival) => ({ ...item, type: 'festival' })),
          ...infosData.results.map((item: info) => ({ ...item, type: 'info' })),
        ];
    
        // Suppression des doublons
        const uniqueData = Array.from(new Set(combinedData.map(a => a.id)))
          .map(id => {
            return combinedData.find(a => a.id === id);
          });
    
        setRectangles(uniqueData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchQuery]);

  const applyFilters = () => {
    // Ajoutez votre logique de filtrage ici
    setModalVisible(false);
  };

  const resetFilters = () => {
    setFilters({
      type: 'groupes',
      nb_homme: '0',
      nb_femme: '0',
      departement: '',
    });
  };

  const typeOptions = [
    { key: 'groupes', label: 'Groupes' },
    { key: 'actualites', label: 'Actualités' },
    { key: 'concerts', label: 'Concerts' },
    { key: 'festivals', label: 'Festivals' },
  ];

  const numberOptions = [...Array(11).keys()].map(num => ({ key: num.toString(), label: num.toString() }));

  type groupe = {
    id: number;
    libelle: string;
    description: string;
    nb_homme: number;
    nb_femme: number;
    producteur: string;
    lien_producteur: string;
    lien_twitter: string;
    lien_facebook: string;
    lien_youtube: string;
    lien_instagram: string;
    departement: string;
    type: 'groupe';
  };

  type info = {
    id: number;
    titre: string;
    nom_image: string;
    type_info: string;
    type: 'info';
  };

  type concert = {
    id: number;
    intitule: string;
    date_debut: string;
    lieu: string;
    groupe: number;
    type: 'concert';
  };

  type album = {
    id: number;
    libelle: string;
    description: string;
    date_sortie: string;
    lieu: string;
    groupe: number;
    type: 'album';
  };

  type festival = {
    id: number;
    date_debut: string;
    lieu: string;
    description: string;
    concerts: number[];
    type: 'festival';
  };

  const renderItem = ({ item }: { item: groupe | album | concert | festival | info }) => {
    switch (item.type) {
      case 'groupe':
        return (
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
        );
      case 'album':
        return (
          <TouchableOpacity style={styles.rectangle} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
            <ImageBackground source={imageConcert} style={styles.imageBackground} imageStyle={styles.imageStyle}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.libelle}</Text>
                <Text style={styles.subtitle}>{item.description}</Text>
                <Text style={styles.type}>Lieu : {item.lieu}</Text>
                <TouchableOpacity style={styles.moreButton} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
                  <Text style={styles.moreButtonText}>Voir plus</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      case 'concert':
        return (
          <TouchableOpacity style={styles.rectangle} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
            <ImageBackground source={imageConcert} style={styles.imageBackground} imageStyle={styles.imageStyle}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.intitule}</Text>
                <Text style={styles.subtitle}>Date : {item.date_debut}</Text>
                <Text style={styles.type}>Lieu : {item.lieu}</Text>
                <Text style={styles.type}>Groupe : {item.groupe}</Text>
                <TouchableOpacity style={styles.moreButton} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
                  <Text style={styles.moreButtonText}>Voir plus</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      case 'festival':
        return (
          <TouchableOpacity style={styles.rectangle} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
            <ImageBackground source={imageConcert} style={styles.imageBackground} imageStyle={styles.imageStyle}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.description.substring(0, 50)}...</Text>
                <Text style={styles.subtitle}>Date : {item.date_debut}</Text>
                <Text style={styles.type}>Lieu : {item.lieu}</Text>
                <TouchableOpacity style={styles.moreButton} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
                  <Text style={styles.moreButtonText}>Voir plus</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      case 'info':
        return (
          <TouchableOpacity style={styles.rectangle} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
            <ImageBackground source={imageConcert} style={styles.imageBackground} imageStyle={styles.imageStyle}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.titre}</Text>
                <Text style={styles.subtitle}>Type : {item.type_info}</Text>
                <TouchableOpacity style={styles.moreButton} onPress={() => { /* Ajoutez votre logique de navigation ici */ }}>
                  <Text style={styles.moreButtonText}>Voir plus</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

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
                placeholder="Rechercher..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
              />
            </View>
            <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)} testID="filter-button">
              <Icon name="filter" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        }
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Veuillez faire une recherche</Text>
          </View>
        }
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
            <Text style={styles.filterLabel}>Type</Text>
            <ModalSelector
              data={typeOptions}
              initValue="Sélectionner un type"
              onChange={(option) => setFilters({ ...filters, type: option.key })}
            >
              <TextInput
                style={styles.filterInput}
                editable={false}
                placeholder="Sélectionner un type"
                value={typeOptions.find(option => option.key === filters.type)?.label}
              />
            </ModalSelector>
            <Text style={styles.filterLabel}>Nombre d'hommes</Text>
            <ModalSelector
              data={numberOptions}
              initValue="0"
              onChange={(option) => setFilters({ ...filters, nb_homme: option.key })}
            >
              <TextInput
                style={styles.filterInput}
                editable={false}
                placeholder="0"
                value={filters.nb_homme}
              />
            </ModalSelector>
            <Text style={styles.filterLabel}>Nombre de femmes</Text>
            <ModalSelector
              data={numberOptions}
              initValue="0"
              onChange={(option) => setFilters({ ...filters, nb_femme: option.key })}
            >
              <TextInput
                style={styles.filterInput}
                editable={false}
                placeholder="0"
                value={filters.nb_femme}
              />
            </ModalSelector>
            <Text style={styles.filterLabel}>Département</Text>
            <ModalSelector
              data={listeDepartements}
              initValue="Sélectionner un département"
              onChange={(option) => setFilters({ ...filters, departement: option.key.toString() })}
            >
              <TextInput
                style={styles.filterInput}
                editable={false}
                placeholder="Sélectionner un département"
                value={listeDepartements.find((option: { key: string; }) => option.key === filters.departement)?.label}
              />
            </ModalSelector>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>Appliquer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>Réinitialiser</Text>
              </TouchableOpacity>
            </View>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
  },
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
  filterLabel: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'Chivo-Regular',
    marginBottom: 5,
  },
  filterPicker: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  filterInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'Chivo-Regular',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  applyButton: {
    backgroundColor: '#ff3399',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Chivo-Regular',
  },
  resetButton: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  resetButtonText: {
    color: '#000',
    fontSize: 16,
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