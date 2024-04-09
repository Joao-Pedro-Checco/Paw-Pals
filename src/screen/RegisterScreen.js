import React from "react";
import {ActivityIndicator, Text, TouchableOpacity} from "react-native";
import {FIREBASE_AUTH} from "../firebase/FirebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {Background, ButtonText, Card, Container, Header, Input, RegisterButton, Title} from "../styles/RegisterStyles";

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
        <Background
            resizeMode='cover'
            source={require("../assets/bg.png")}>
            <Container>
                <Title>Paw Pals</Title>

                <Card>
                    <Header>Cadastro</Header>

                    <Input
                        value={name}
                        placeholder="Nome"
                        autocapitalize="none"
                        onChangeText={setName}
                    ></Input>

                    <Input
                        value={email}
                        placeholder="E-mail"
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

                    <Input
                        value={confirmPassword}
                        secureTextEntry
                        placeholder="Confirmar senha"
                        autocapitalize="none"
                        onChangeText={setConfirmPassword}
                    ></Input>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="#0000FF"
                            style={{
                                marginTop: 120,
                                marginHorizontal: 58,
                            }}
                        />
                    ) : (
                        <RegisterButton onPress={register}>
                            <ButtonText>Cadastrar-se</ButtonText>
                        </RegisterButton>
                    )}

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{alignSelf: "center", marginTop: 32}}>
                            Já possui cadastro?{" "}
                            <Text style={{color: "#1B022E"}}>Faça login</Text>
                        </Text>
                    </TouchableOpacity>
                </Card>
            </Container>
        </Background>
    );
};

export default RegisterScreen;
