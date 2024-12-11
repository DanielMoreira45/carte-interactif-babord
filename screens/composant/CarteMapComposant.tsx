import React from 'react';
import { FlatList, TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { CarteMapComposantProps, MarkerType } from './Types';


const CarteMapComposant = ({
    markers,
    selectedMarkerId,
    onCardPress,
}: CarteMapComposantProps) => {

    const limitTextLength = (text: string, maxLength: number) => {
        if (text.length <= maxLength) { return text; }

        const cutIndex = text.indexOf('.', maxLength);
        if (cutIndex === -1) { return text.substring(0, maxLength) + '...'; }
        return text.substring(0, cutIndex + 1);
    };


    const renderCard = ({ item }: { item: MarkerType }) => (
        <TouchableOpacity onPress={() => onCardPress(item)}>
            <View style={[styles.card, item.id === selectedMarkerId && styles.selectedCard]}>
                <Image source={{ uri: item.image }} style={styles.cardimages} />
                <View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDetails}>{limitTextLength(item.details, 100)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={markers}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCard}
            showsHorizontalScrollIndicator={false}
            style={styles.cardList}
        />
    );
};

const styles = StyleSheet.create({
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
        elevation: 3,
        shadowColor: '#000',
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
});

export default CarteMapComposant;
