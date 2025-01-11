import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

type MarkerType = {
  id: number;
  coordinate: { latitude: number; longitude: number };
  title: string;
  description: string;
  details: string;
  image: string;
};

const MapComposant = () => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 46.603354,
    longitude: 1.888334,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  });

  const navigation = useNavigation();
  const PinImage = require('./assets/pinBabord.png');
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const mapRef = useRef<MapView>(null);
  const flatListRef = useRef<FlatList>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);


  useEffect(() => {
    const loadMarkers = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/673df339e41b4d34e4577d85', {
          method: 'GET',
          headers: {
            'X-Master-key': '$2a$10$1ga991U9L9JBX12QCZUP7eoSIDcCcG9lq9Aa93L6w5efPrzeyNRZy',
          },
        });
        const data = await response.json().then((json) => json.record);
        // console.log('Données des marqueurs :', data);
        setMarkers(data);
      } catch (error) {
        console.error('Erreur lors du chargement des marqueurs :', error);
      }
    };
    loadMarkers();
  }, []);

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

  const limitTextLength = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {return text;}
    // Trouver la position du premier point après la limite
    const cutIndex = text.indexOf('.', maxLength);
    // Si aucun point n'est trouvé après la limite, couper simplement à maxLength
    if (cutIndex === -1) {
      return text.substring(0, maxLength) + '...';
    }
    // Sinon, couper au premier point trouvé après la limite
    return text.substring(0, cutIndex + 1); // Inclure le point
  };

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

  // Fonction pour gérer le clic sur une carte qui permet d'avoir le lien vers les détails
  const onCardPress = (marker: typeof markers[0]) => {
    setSelectedMarkerId(marker.id); // Mettre à jour l'ID du marqueur sélectionné
    try {
      navigation.navigate('DetailsConcerts', { marker_id: marker.id });
    } catch (error) {
      console.error('Erreur lors de la navigation vers les détails :', error);
    }
  };

  // Affichage de la card
  const renderCard = ({ item }: { item: typeof markers[0] }) => {
    return (
      <TouchableOpacity onPress={() => onCardPress(item)}>
        <View style={[styles.card, item.id === selectedMarkerId && styles.selectedCard]}>
          <View>
            <Image source={{ uri: item.image }} style={styles.cardimages} />
          </View>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDetails}>{limitTextLength(item.details, 100)}</Text>
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
        showsCompass={false}
      >
        {markers.length > 0 &&
          markers.map((marker, index) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={() => {
                onMarkerPress(marker.id, index, marker.coordinate);
              }}
            >
              <Image
                source={PinImage}
                style={styles.markerimage} // Ajustez la taille selon vos besoins
                resizeMode="contain" // Pour garder les proportions de l'image
              />
            </Marker>
          ))}
      </MapView>
      <FlatList
        ref={flatListRef}
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
    bottom: 70,
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
  cardimages: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  markerimage: {
    width: 50,
    height: 50,
  },
});

export default MapComposant;
