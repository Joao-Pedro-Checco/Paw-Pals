import React from 'react';
import {Background, Button, ButtonText, Container, Icon} from "../styles/SplashStyles";

const SplashScreen = ({navigation}) => {
    return (
        <Background resizeMode='cover' source={require("../assets/bg.png")}>
            <Container>
                <Icon source={require("../assets/logo.png")}/>

                <Button onPress={() => navigation.navigate("Login")}>
                    <ButtonText>Login</ButtonText>
                </Button>

                <Button onPress={() => navigation.navigate("Register")}>
                    <ButtonText>Cadastre-se</ButtonText>
                </Button>
            </Container>
        </Background>
    );
};

export default SplashScreen;
