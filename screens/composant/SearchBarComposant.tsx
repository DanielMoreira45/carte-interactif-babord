import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, DimensionValue } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarComposantProps {
  /**
   * The current search query entered by the user.
   */
  searchQuery: string;
  /**
   * Function to update the search query.
   */
  setSearchQuery: (text: string) => void;
  /**
   * Function to show or hide the modal.
   */
  setModalVisible: (visible: boolean) => void;
  /**
   * Size of the search icon.
   */
  searchIconSize?: number;
  /**
   * Size of the filter icon.
   */
  filterIconSize?: number;
  /**
   * Color of the icons.
   */
  iconColor?: string;
  /**
   * Color of the placeholder text.
   */
  placeholderTextColor?: string;
  /**
   * Height of the search bar.
   */
  searchBarHeight?: number;
  /**
   * Width of the search bar.
   */
  searchBarWidth?: number | string;
  /**
   * Height of the filter button.
   */
  filterButtonHeight?: number;
  /**
   * Width of the filter button.
   */
  filterButtonWidth?: number;
}

const SearchBarComposant: React.FC<SearchBarComposantProps> = ({
  searchQuery,
  setSearchQuery,
  setModalVisible,
  searchIconSize = 20,
  filterIconSize = 24,
  iconColor = "#888",
  placeholderTextColor = "#888",
  searchBarHeight = 40,
  searchBarWidth = '100%',
  filterButtonHeight = 40,
  filterButtonWidth = 40,
}) => {
  return (
    <View style={[styles.searchContainer, { height: searchBarHeight, width: searchBarWidth as DimensionValue }]}>
      <View style={[styles.searchInputContainer, { height: searchBarHeight }]}>
        <Icon name="search" size={searchIconSize} color={iconColor} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          placeholderTextColor={placeholderTextColor}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      <TouchableOpacity
        style={[styles.filterButton, { height: filterButtonHeight, width: filterButtonWidth }]}
        onPress={() => setModalVisible(true)}
        testID="filter-button"
      >
        <Icon name="filter" size={filterIconSize} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
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
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#ff3399',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBarComposant;