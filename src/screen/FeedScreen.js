import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const FeedScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Feed Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#77BBC4",
        alignItems: "center",
        justifyContent: "center",
    }
});

export default FeedScreen;
