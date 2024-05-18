import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #D9D9D9;
`

export const InputWrapper = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
`

export const InputField = styled.TextInput`
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    width: 90%;
`

export const PostImage = styled.Image`
    width: 90%;
    height: 70%;
    border-radius: 5px;
`

export const PostButton = styled.TouchableOpacity`
    width: 150px;
    height: 50px;
    margin-bottom: 32px;
    margin-left: 20px;
    background-color: #485982;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
`

export const ButtonText = styled.Text`
    color: #FDFDFB;
`
