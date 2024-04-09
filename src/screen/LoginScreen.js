import React from "react";
import {ActivityIndicator, Text, TouchableOpacity} from "react-native";
import {FIREBASE_AUTH} from "../firebase/FirebaseConfig.js"
import {signInWithEmailAndPassword} from "firebase/auth"
import {Background, ButtonText, Card, Container, Header, Input, LoginButton, Title} from "../styles/LoginStyles";

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
        <Background source={require("../assets/bg.png")}>
            <Container>
                <Title>Paw Pals</Title>

                <Card>
                    <Header>Login</Header>
                    <Input
                        value={email}
                        placeholder="Email"
                        autocapitalize="none"
                        onChangeText={setEmail}
                    ></Input>

                    <Input
                        value={password}
                        secureTextEntry
                        placeholder="Senha"
                        autocapitalize="none"
                        onChangeText={setPassword}
                    ></Input>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="#0000FF"
                            style={{marginTop: 180, marginHorizontal: 58}}
                        />
                    ) : (
                        <LoginButton onPress={login}>
                            <ButtonText>Login</ButtonText>
                        </LoginButton>
                    )}

                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{alignSelf: "center", marginTop: 32}}>
                            É novo no Paw Pals?{" "}
                            <Text style={{color: "#1B022E"}}>Cadastre-se</Text>
                        </Text>
                    </TouchableOpacity>
                </Card>
            </Container>
        </Background>
    );
};

export default LoginScreen;
