import {
    Card,
    Container,
    Divider,
    Interaction,
    InteractionText,
    InteractionWrapper,
    PostImage,
    PostText,
    PostTime,
    ProfilePic,
    UserName,
    UserNameWrapper,
    UserWrapper
} from "../../styles/feed/HomeStyles";
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
    return (
        <Container>
            <Card>
                <UserWrapper>
                    <ProfilePic source={require("../../assets/logo.png")} />
                    <UserNameWrapper>
                        <UserName>Nome do usuário</UserName>
                        <PostTime>4 horas atrás</PostTime>
                    </UserNameWrapper>
                </UserWrapper>
                <PostText>Esse é o texto da postagem</PostText>
                <Divider></Divider>
                <InteractionWrapper>
                    <Interaction>
                        <Icon name="heart-outline" size={40} color="#485982" />
                        <InteractionText>Curtir</InteractionText>
                    </Interaction>
                    <Interaction>
                        <Icon name="chatbubble-outline" size={40} color="#485982" />
                        <InteractionText>Comentar</InteractionText>
                    </Interaction>
                </InteractionWrapper>
            </Card>

            <Card>
                <UserWrapper>
                    <ProfilePic source={require("../../assets/logo.png")} />
                    <UserNameWrapper>
                        <UserName>Nome do usuário</UserName>
                        <PostTime>14 horas atrás</PostTime>
                    </UserNameWrapper>
                </UserWrapper>
                <PostText>Esse é o texto da postagem</PostText>
                <PostImage source={require("../../assets/mario.jpeg")} />
                <InteractionWrapper>
                    <Interaction>
                        <Icon name="heart-outline" size={40} color="#485982" />
                        <InteractionText>Curtir</InteractionText>
                    </Interaction>
                    <Interaction>
                        <Icon name="chatbubble-outline" size={40} color="#485982" />
                        <InteractionText>Comentar</InteractionText>
                    </Interaction>
                </InteractionWrapper>
            </Card>

            <Card>
                <UserWrapper>
                    <ProfilePic source={require("../../assets/logo.png")} />
                    <UserNameWrapper>
                        <UserName>Nome do usuário</UserName>
                        <PostTime>1 hora atrás</PostTime>
                    </UserNameWrapper>
                </UserWrapper>
                <PostText>Esse é o texto da postagem</PostText>
                <Divider></Divider>
                <InteractionWrapper>
                    <Interaction>
                        <Icon name="heart-outline" size={40} color="#485982" />
                        <InteractionText>Curtir</InteractionText>
                    </Interaction>
                    <Interaction>
                        <Icon name="chatbubble-outline" size={40} color="#485982" />
                        <InteractionText>Comentar</InteractionText>
                    </Interaction>
                </InteractionWrapper>
            </Card>
        </Container>
    );
};

export default HomeScreen;
