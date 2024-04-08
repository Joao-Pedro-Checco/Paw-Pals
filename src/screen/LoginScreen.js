import React from "react";
import { ImageBackground } from 'react-native-web';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity, ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";
import {FIREBASE_AUTH} from "../firebase/FirebaseConfig.js"
import {signInWithEmailAndPassword} from "firebase/auth"

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const auth = FIREBASE_AUTH;

    const login = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Falha no login: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
        style = {styles.ImageBackground}
        resizeMode = 'cover' 
        source = {require("../assets/bg.png") }>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Paw Pals</Text>

                <View style={[styles.form, styles.card]}>
                    <Text style={styles.header}>Login</Text>

                    <TextInput
                        value={email}
                        style={styles.input}
                        placeholder="Email"
                        autocapitalize="none"
                        onChangeText={setEmail}
                    ></TextInput>

                    <TextInput
                        value={password}
                        style={styles.input}
                        secureTextEntry
                        placeholder="Senha"
                        autocapitalize="none"
                        onChangeText={setPassword}
                    ></TextInput>

                    {loading ? (
                        <ActivityIndicator size="large" color="#0000FF" style={styles.loading}/>
                    ) : (
                        <CustomButton
                            text="Login"
                            buttonStyle={styles.button}
                            buttonTextStyle={styles.buttonText}
                            onPress={login}
                        ></CustomButton>
                    )}

                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{alignSelf: "center", marginTop: 32}}>
                            É novo no Paw Pals?{" "}
                            <Text style={{color: "#1B022E"}}>Cadastre-se</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#77BBC4",
    },
    card: {
        width: "92%",
        height: "70%",
        borderRadius: 10,
        backgroundColor: "#FDFDFB",
        padding: 10,
    },
    title: {
        marginTop: 70,
        marginBottom: 50,
        marginHorizontal: 30,
        fontSize: 36,
        fontWeight: "400",
        color: "#FDFDFB",
    },
    header: {
        fontSize: 30,
        marginBottom: 20,
        color: "#1B022E",
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 15,
    },
    input: {
        marginVertical: 4,
        marginTop: 20,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'white',
        color: "#1B022E",
    },
    loading: {
        marginTop: 180,
        marginHorizontal: 58
    },
    button: {
        width: 250,
        height: 50,
        marginTop: 180,
        marginHorizontal: 58,
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
    ImageBackground:{
        flex: 1,
        justifyContent: 'center',
    }
});

export default LoginScreen;
