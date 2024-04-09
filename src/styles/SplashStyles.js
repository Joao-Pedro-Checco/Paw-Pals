import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Background = styled.ImageBackground`
    flex: 1;
    justify-content: center;
`;

export const Icon = styled.Image`
    width: 250px;
    height: 250px;
    margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
    width: 200px;
    height: 50px;
    marginTop: 30px;
    background-color: #1B022E;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

export const LoginButton = styled.TouchableOpacity`
    width: 250px;
    height: 50px;
    margin-top: 180px;
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
