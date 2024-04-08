import React from "react";
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity, ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";
import {FIREBASE_AUTH} from "../firebase/FirebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth";

const RegisterScreen = ({navigation}) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const auth = FIREBASE_AUTH;

    const passwordConfirmed = (password, confirmPassword) => {
        return password && confirmPassword && password === confirmPassword;
    }

    const register = async () => {
        if (!passwordConfirmed(password, confirmPassword)) {
            return;
        }

        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Falha no cadastro: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Paw Pals</Text>

            <View style={[styles.form, styles.card]}>
                <Text style={styles.header}>Cadastro</Text>

                <TextInput
                    value={name}
                    style={styles.input}
                    placeholder="Nome"
                    autocapitalize="none"
                    onChangeText={setName}
                ></TextInput>

                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder="E-mail"
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

                <TextInput
                    value={confirmPassword}
                    style={styles.input}
                    secureTextEntry
                    placeholder="Confirmar senha"
                    autocapitalize="none"
                    onChangeText={setConfirmPassword}
                ></TextInput>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000FF" style={styles.loading}/>
                ) : (
                    <CustomButton
                        text="Cadastrar-se"
                        buttonStyle={styles.button}
                        buttonTextStyle={styles.buttonText}
                        onPress={register}
                    ></CustomButton>
                )}

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{alignSelf: "center", marginTop: 32}}>
                        Já possui cadastro?{" "}
                        <Text style={{color: "#1B022E"}}>Faça login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#77BBC4",
    },
    card: {
        width: "92%",
        height: "75%",
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
        marginTop: 120,
        marginHorizontal: 58
    },
    button: {
        width: 250,
        height: 50,
        marginTop: 120,
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
});

export default RegisterScreen;
