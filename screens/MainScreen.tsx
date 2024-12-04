import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CarteScreen from './CarteScreen';
import DetailsConcertsScreen from './DetailsConcertsScreen';
const logo = require('./assets/logo_babord.png');
const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity style=  {{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
      } }
      onPress = {onPress}>
       {/* <View style = {{width: 70, height: 70, borderTopLeftRadius: 90, borderTopRightRadius: 100, borderBottomLeftRadius: 15, borderBottomRightRadius: 100,  backgroundColor: '#ff3399', transform: [{ rotate: '-45deg'} ]}}>{children}</View>  */}
       <Image source={logo} style={styles.logo}></Image>
    </TouchableOpacity>
)


const MainScreen = ({navigation}) => (
<Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    borderTopStartRadius: 24,
                    borderTopEndRadius: 24, 
                    height: 63,
                    position: 'absolute'
                },
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Search':
                            iconName = 'search';
                            break;
                        case 'Maps':
                            iconName = 'map';
                            break;
                        // case 'Forum':
                        //     iconName = 'activity';
                        //     break;
                        // case 'Profile':
                        //     iconName = 'user';
                        //     break;
                        default:
                            break;
                    }
                    return <Ionicons name={iconName} size={24} color={'#C7C7C7'} />;
                },

            })}
>
<Tab.Screen name="Home" component={HomeScreen}/>
    <Tab.Screen name="Notifications" component={HomeScreen}/>
    <Tab.Screen name="Maps" component={CarteScreen} options={{tabBarButton: (props) => (<CustomTabBarButton {...props} />)}}/>
    <Tab.Screen name="Search" component={SearchScreen}/>
    <Tab.Screen name="Profile" component={HomeScreen}/>
    <Tab.Screen
        name="DetailsConcerts"
        component={DetailsConcertsScreen}
        options={{
          tabBarButton: () => null, // Cache le bouton dans la barre pour naviguer uniquement par programmation
        }}
      />

</Tab.Navigator>
);

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        textShadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    container: {
        alignItems: 'center',
      },
      circle: {
        width: 120,
        height: 120,
        backgroundColor: '#FF4081', // Розовый цвет значка
        borderRadius: 60, // Полностью круглая форма
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        width: 94,
        height: 93,
        marginTop: 15,
        //top: 15,
        alignSelf: "center",
    
      },
  });

export default MainScreen;