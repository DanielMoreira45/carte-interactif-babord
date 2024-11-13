import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapComposant = () => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 46.603354,
    longitude: 1.888334,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  });

  const PinImage = require('./assets/pinBabord.png');

  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const mapRef = useRef<MapView>(null);
  const flatListRef = useRef<FlatList>(null);

  const markers = [
    {
      id: 1,
      coordinate: { latitude: 47.916672, longitude: 1.9 },
      title: 'Orleans',
      description: 'Linked to the Orleans cathedral',
      details: 'Orleans is famous for its cathedral and its history with Joan of Arc.',
      style: 'rock',
      date: '2025-02-24',
      image: 'https://picsum.photos/200',
    },
    {
      id: 2,
      coordinate: { latitude: 48.8566, longitude: 2.3522 },
      title: 'Paris',
      description: 'Eiffel Tower',
      details: 'Paris is known for the Eiffel Tower, Louvre Museum, and its rich culture.',
      style: 'jazz',
      date: '2025-03-15',
      image: 'https://picsum.photos/200',
    },
    {
      id: 3,
      coordinate: { latitude: 43.296482, longitude: 5.36978 },
      title: 'Marseille',
      description: 'Notre-Dame de la Garde',
      details: 'Marseille is known for its port and Notre-Dame de la Garde.',
      style: 'classical',
      date: '2025-04-10',
      image: 'https://picsum.photos/200',
    },
    {
      id: 4,
      coordinate: { latitude: 48.443854, longitude: 1.489012 },
      title: 'Chartres',
      description: 'Chartres Cathedral',
      details: 'Chartres is known for its cathedral and its history.',
      style: 'baroque',
      date: '2025-05-20',
      image: 'https://picsum.photos/200',
    },
    {
      id: 5,
      coordinate: { latitude: 47.322047, longitude: 5.04148 },
      title: 'Dijon',
      description: 'Palace of the Dukes of Burgundy',
      details: 'Dijon is known for its mustard and the Palace of the Dukes of Burgundy.',
      style: 'renaissance',
      date: '2025-06-30',
      image: 'https://picsum.photos/200',
    },
];


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission de localisation accordée');
            getCurrentLocation();
          } else {
            console.log('Permission de localisation refusée, recentrage sur la France');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setInitialRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        error => {
          console.log('Erreur lors de la récupération de la position : ', error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    requestLocationPermission();
  }, []);

  // Fonction pour centrer la carte sur le marqueur sélectionné
  const focusOnMarker = (coordinate: { latitude: number, longitude: number }) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...coordinate,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000); // Durée de l'animation en ms
    }
  };

  // Fonction pour gérer le clic sur un marqueur et centrer la FlatList sur la carte correspondante
  const onMarkerPress = (id: number, index: number, coordinate: { latitude: number, longitude: number }) => {
    setSelectedMarkerId(id);
    focusOnMarker(coordinate); // Recentrer la carte sur le POI sélectionné
    flatListRef.current?.scrollToIndex({ index, animated: true }); // Faire défiler la FlatList
  };

  // Fonction pour gérer le clic sur une carte (qui recentre la carte sur le marqueur)
  const onCardPress = (marker: typeof markers[0], index: number) => {
    setSelectedMarkerId(marker.id); // Mettre à jour l'ID du marqueur sélectionné
    focusOnMarker(marker.coordinate); // Recentrer la carte
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  // Affichage de la card
  const renderCard = ({ item, index }: { item: typeof markers[0], index: number }) => {
    return (
      <TouchableOpacity onPress={() => onCardPress(item, index)}>
        <View style={[styles.card, item.id === selectedMarkerId && styles.selectedCard]}>
          <View>
            <Image source={{ uri: item.image }} style={styles.cardimages}/>
          </View>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDetails}>{item.details}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={initialRegion}
        showsUserLocation={true}
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => onMarkerPress(marker.id, index, marker.coordinate)}
          >
            <Image
              source={PinImage}
              style={{ width: 50, height: 50 }} // Ajustez la taille selon vos besoins
              resizeMode="contain" // Pour garder les proportions de l'image
            />
          </Marker>
        ))}

      </MapView>

      <FlatList
        ref={flatListRef} // Associer la référence à FlatList
        data={markers}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={renderCard}
        showsHorizontalScrollIndicator={false}
        style={styles.cardList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  cardList: {
    position: 'absolute',
    bottom: 20,
    // height: '20%',
    paddingHorizontal: 10,
  },
  card: {
    width: 330,
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    flexDirection: 'row',
  },
  selectedCard: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardDetails: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    textAlign: 'justify',
    maxWidth: 210,
  },
  cardimages:{
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default MapComposant;
