import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';


import { TextInput } from 'react-native-paper';
import { Link} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const backImage = require('./assets/backgroundConnexion.png');

const {height, width} = Dimensions.get('window');

const ConnectionScreen = ({navigation}) => {
    const [text, onChangeText] = React.useState('');
    
    return (
    <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
    <SafeAreaView>
      <TextInput
        label="Email"
        value={text}
        onChangeText={onChangeText}
        style={styles.input}
        activeUnderlineColor = "#FF3399"
      />
      <TextInput
        label="Mot de passe"
        value={text}
        onChangeText={onChangeText}
        style={styles.input}
        activeUnderlineColor = "#FF3399"
      />
      <Link to={{ screen: ''}} style={styles.link}>Mot de passe oublié ?</Link>  
      <View style={styles.container}>
      <Text style={styles.agreement}>
        By continuing, you agree to our 
        <Link to={{ screen: ''}} style={styles.link}> Terms of Service </Link>and 
         <Link to={{ screen: ''}} style={styles.link}> Privacy Policy</Link>
         .
         </Text>
      <AppButton
        onPress={() => navigation.navigate("Connection")}
        title="Connexion"
      />
      </View>
    </SafeAreaView>
  </ImageBackground>
    )
};

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
  )

const styles = StyleSheet.create({
    appButtonContainer: {
      //elevation: 1,
      backgroundColor: "#FF3399",
      borderRadius: 48,
      paddingVertical: 16,
      paddingHorizontal: 32,
      width: width - 47,
      height: 48,
      alignSelf: "center",
      //gap: 10,
      //marginTop: 65,
      //marginBottom: 25,
    },
    appButtonText: {
      fontSize: 16,
      color: "#fff",
      alignSelf: "center",
      fontFamily: 'Chivo',
      lineHeight: 16,
    },
    image: {
      flex: 1,
      //justifyContent: 'center',
    },
    container: {
    //   flex: 1,
    //   justifyContent: 'center',
      //position: 'absolute',
      top: height * 0.45,
      //marginHorizontal: 16,
      alignSelf: "center",
    },
    view: {
      //flex: 1,
      //justifyContent: 'center',
      top: height * 0.62,
      marginTop: 16,
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
      fontSize: 25,
      fontFamily: 'Chivo',   
    },
    logo: {
      width: 94,
      height: 93,
      top: 15,
      alignSelf: "center",
  
    },
    text: {
      width: 252,
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Chivo',
      color: '#000000'
    },
    link: {
      color: '#FF3399',
      alignSelf: "center",
      marginTop: 45
    },
    input: {
      width: width - 47,
      height: 48,
      alignSelf: "center",
      marginTop: 27,
      fontSize: 16,
      lineHeight: 24,
      backgroundColor: "#FFFFFF"
    },
    agreement:{
      width: width - 47,
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'Chivo',
      color: '#000000',
      marginBottom: 20,
      alignSelf: "center",
    }

  });
  

export default ConnectionScreen;