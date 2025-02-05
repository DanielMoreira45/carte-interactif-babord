import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { MarkerType } from './composant/Types';
import CarteMapComposant from './composant/CarteMapComposant';

const MapComposant = (route) => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 46.603354,
    longitude: 1.888334,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  });
  const user = route.params;
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
  const onMarkerPress = (marker: MarkerType, index: number) => {
    setSelectedMarkerId(marker.id);
    focusOnMarker(marker.coordinate); // Recentrer la carte sur le POI sélectionné
    console.log('Index du marqueur sélectionné :', index);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
    console.log(flatListRef);
  };

  const onCardPress = (marker: MarkerType) => {
    setSelectedMarkerId(marker.id); // Mettre à jour l'ID du marqueur sélectionné
    try {
      navigation.navigate('DetailsConcerts', { marker_id: marker.id , user: user});
    } catch (error) {
      console.error('Erreur lors de la navigation vers les détails :', error);
    }
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
                onMarkerPress(marker, index);
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
      <CarteMapComposant
        markers={markers}
        flatListRef={flatListRef}
        selectedMarkerId={selectedMarkerId}
        onCardPress={onCardPress}
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
