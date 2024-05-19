import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #D9D9D9;
`;

export const UserInfoWrapper = styled.View`
    flex-direction: row;
    padding: 10px;
    align-items: flex-start;
    margin: 50px 10px 10px 0;
`;

export const ProfilePicture = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 70px;
`;

export const UserName = styled.Text`
    color: #1B022E;
    font-weight: bold;
    font-size: 16px;
    margin-top: 55px;
    margin-left: 50px;
`;

export const PostsWrapper = styled.View`
    flex-direction: grid;
`;

export const Post = styled.View``;
