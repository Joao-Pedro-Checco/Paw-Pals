import {
  Platform,
  SafeAreaView,
  Text,
  NativeModules,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Container } from "../../styles/feed/MapStyles";
import MapView from "react-native-maps";
import { Dimensions } from "react-native";
import { StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

const MapScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("screen");
  const { StatusBarManager } = NativeModules;

  const userLocation = async () => {
    let Location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      logintude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onRegionChange = (region) => {
    console.log(region);
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0 },
      ]}
    >
      <MapView
        style={styles.map}
        onRegionChange={onRegionChange}
        showsUserLocation={true}
        followsUserLocation={true}
      ></MapView>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#77BBC4",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
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
    textAlign: "center",
  },
});
