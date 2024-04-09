import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #D9D9D9;
    padding: 5px;
`;

export const Card = styled.View`
    background-color: #FDFDFB;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
`;

export const UserWrapper = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
`;

export const ProfilePic = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
`;

export const UserNameWrapper = styled.View`
    flex-direction: column;
    justify-content: center;
`

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #1B022E;
`

export const PostTime = styled.Text`
    font-size: 10px;
    color: rgba(27, 2, 46, 0.5);
`

export const PostText = styled.Text`
    font-size: 14px;
    padding: 0 15px 0 15px;
`;

export const PostImage = styled.Image`
    width: 100%;
    height: 300px;
    margin-top: 15px;
    border-radius: 5px;
`

export const Divider = styled.View`
    border-bottom-color: rgba(27, 2, 46, 0.2);
    border-bottom-width: 1px;
    width: 95%;
    align-self: center;
    margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 15px;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    padding: 2px 5px;
`;

export const InteractionText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #485982;
    margin-top: 10px;
    margin-left: 5px;
`
