import {View, StyleSheet} from 'react-native';
import React from 'react';
import CustomImage from "../components/CustomImagem";
import CustomButton from "../components/CustomButton";

const SplashScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <CustomImage
                path={require("../assets/logo.png")}
                style={styles.image}
            />

            <CustomButton
                text="Login"
                onPress={() => navigation.navigate("Login")}
                buttonStyle={styles.button}
                buttonTextStyle={styles.buttonText}
            ></CustomButton>

            <CustomButton
                text="Cadastre-se"
                onPress={() => navigation.navigate("Register")}
                buttonStyle={styles.button}
                buttonTextStyle={styles.buttonText}
            ></CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#77BBC4",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: "contain",
        marginBottom: 20,
    },
    button: {
        width: 200,
        height: 50,
        marginTop: 30,
        backgroundColor: "#1B022E",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#FDFDFB",
        fontWeight: "bold",
    },
});

export default SplashScreen;
