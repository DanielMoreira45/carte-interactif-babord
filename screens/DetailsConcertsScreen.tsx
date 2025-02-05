import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import TitreComposant from './composant/TitreComposant.tsx';
import { useNavigation } from '@react-navigation/native';
import { ConcertType, GroupType, UserType } from './composant/Types.tsx';
import { ENDPOINT_CONCERT, ENDPOINT_GROUPES, ENDPOINT_USERS } from './composant/endpoints.tsx';

type MarkerType = {
  id: number;
  coordinate: { latitude: number; longitude: number };
  title: string;
  description: string;
  details: string;
  image: string;
  artist: string; // A voir si on prend le Nom de l'artiste ou l'id de l'artiste ou un sous objet artiste
  date: string;
  style: string;
  lieu: string; // A voir si on prend le Nom du lieu ou l'id du lieu ou un sous objet lieu
};

const DetailsConcertsScreen = ({ route }: { route: any }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const { marker_id } = route.params;
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const background = require('./assets/backgroundConcert.png');


  const [concert, setConcert] = useState<ConcertType[]>([]);

  useEffect(() => {
    const loadConcerts = async () => {
      try {
        const response = await fetch(ENDPOINT_CONCERT, {
          method: 'GET',
          headers: {
            'permission': 'web_user',
          },
        });
        let data = await response.json();
        data = data.results;
        setConcert(data.find((us) => us.id === marker_id));
      } catch (error) {
        console.error('Erreur lors du chargement des concerts :', error);
      }
    };
    loadConcerts();
  }, );

  const [groupe, setgroupe] = useState<GroupType[]>([]);

  useEffect(() => {
    const loadConcerts = async () => {
      try {
        const response = await fetch(ENDPOINT_GROUPES, {
          method: 'GET',
          headers: {
            'permission': 'web_user',
          },
        });
        let data = await response.json();
        data = data.results;
        setgroupe(data.find((us) => us.id === concert.id));
      } catch (error) {
        console.error('Erreur lors du chargement des groupes :', error);
      }
    };
    loadConcerts();
  }, );

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
        setMarkers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des marqueurs :', error);
        setIsLoading(false);
      }
    };
    loadMarkers();
  }, []);

  const [newuser, setUser] = useState<UserType[]>([]);

  useEffect(() => {
    const loadMarkers = async () => {
      try {
        const response = await fetch(ENDPOINT_USERS, {
          method: 'GET',
          headers: {
            'permission': 'mobile_user',
          },
        });
        let data = await response.json();
        data = data.results;
        setUser(data.find((us) => us.id === user.id));
      } catch (error) {
        console.error('Erreur lors du chargement des Utilisateurs :', error);
      }
    };
    loadMarkers();
  }, []);

  const marker = markers.find((marker) => marker.id === marker_id);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement des données...</Text>
      </View>
    );
  }

  if (!marker) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun détail trouvé pour ce marqueur.</Text>
      </View>
    );
  }
  return (
    <ImageBackground source={background} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: marker.image }} style={styles.image} />
        <TitreComposant text={marker.title} />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{marker.details}</Text>
          <Text style={styles.sectionTitle}>Artiste</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ArtisteScreen', { navigation: navigation, profile: groupe, user: newuser })}>
            <Text style={styles.link}>{marker.artist ?? 'Redirection vers l\'Artiste'}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Date de l'événement</Text>
          <Text style={styles.date}>{marker.date}</Text>
          <Text style={styles.sectionTitle}>Style</Text>
          <Text style={styles.description}>{marker.style}</Text>
          <Text style={styles.sectionTitle}>Lieu</Text>
          <Text style={styles.description}>{marker.lieu}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  content: {
    backgroundColor: '#fff', // Fond blanc pour la section du contenu
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Ombre pour Android
    maxWidth: 300,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Noir pour les sections
    marginTop: 20,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 22,
  },
  link: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  date: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default DetailsConcertsScreen;
