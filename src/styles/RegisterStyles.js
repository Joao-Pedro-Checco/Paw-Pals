import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const Background = styled.ImageBackground`
    flex: 1;
    justify-content: center;
`;

export const Title = styled.Text`
    margin: 70px 0 50px 15px;
    font-size: 36px;
    font-weight: 400;
    color: #FDFDFB;
`;

export const Card = styled.View`
    width: 92%;
    height: 75%;
    border-radius: 10px;
    background-color: #FDFDFB;
    padding: 10px;
    margin: 0 0 48px 15px;
`;

export const Header = styled.Text`
    font-size: 30px;
    margin-bottom: 20px;
    color: #1B022E;
`;

export const ProfilePicture = styled.Image`
    width: 75px;
    height: 75px;
    border-radius: 60px;
`

export const Input = styled.TextInput`
    margin-top: 20px;
    height: 40px;
    border-width: 1px;
    border-radius: 4px;
    padding: 10px;
    background-color: white;
    color: #1B022E;
`;

export const RegisterButton = styled.TouchableOpacity`
    width: 250px;
    height: 50px;
    margin-top: 50px;
    background-color: #1B022E;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const ButtonText = styled.Text`
    color: #FDFDFB;
    font-weight: bold;
`;
