import {Platform, Text} from 'react-native';
import {Container} from "../../styles/feed/MapStyles";
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { StyleSheet, Button } from 'react-native';
import {FlatList} from "react-native";
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';






const MapScreen = ({navigation}) => {
    const {width, height} = Dimensions.get('screen');


   const userLocation = async() => {

        let Location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        setMapRegion({
            latitude: location.coords.latitude,
            logintude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    }


    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }




    
    
    const onRegionChange = (region) =>{
        console.log(region);
    };
    return (
        <Container>
            <Text>Map Screen teste</Text>
            <MapView style ={styles.map}
            onRegionChange={onRegionChange}
            showsUserLocation={true}
            followsUserLocation={true}
            ></MapView>
            <Button title ='Get Location' onPress={userLocation}/>
        </Container>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width:'100%',
      height: '100%'
    },
    mapOverlay: {
      position: "absolute",
      bottom: 50,
      backgroundColor: "#ffffff",
      borderWidth: 2,
      borderRadius: 5,
      padding: 16,
      left: "25%",
      width: "50%",
      textAlign: "center"
    }
  });