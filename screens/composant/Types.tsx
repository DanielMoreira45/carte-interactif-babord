import { FlatList } from "react-native";

export type MarkerType = {
    id: number;
    coordinate: { latitude: number; longitude: number };
    title: string;
    description: string;
    details: string;
    image: string;
};

export type CarteMapComposantProps = {
    markers: MarkerType[];
    flatListRef: React.RefObject<FlatList>;
    selectedMarkerId: number | null;
    onCardPress: (item: MarkerType) => void;
};

export type GroupType = {
    id: number;
    libelle: string;
    description: string;
    nb_homme: string;
    nb_femme: number;
    producteur: string;
    lien_producteur: string;
    departement: string;
    lien_twitter: string;
    lien_facebook: string;
    lien_youtube: string;
    lien_instagram: string;
};

export type UserType = {
    id: number;
    nom: string;
    prenom: string;
    mail: string;
    password: string;
    code_postal:  number
    suivre_groupe: number[];
};

export type ConcertType = {
    id: number;
    intitule: string;
    date_debut: string;
    lieu: string;
    groupe: number;
  };