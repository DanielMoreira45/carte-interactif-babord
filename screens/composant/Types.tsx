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