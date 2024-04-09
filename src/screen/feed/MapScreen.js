import {View, Text, StyleSheet} from 'react-native';

const MapScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Map Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D9D9D9",
        alignItems: "center",
        justifyContent: "center",
    }
});

export default MapScreen;
