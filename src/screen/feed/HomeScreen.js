import {Container} from "../../styles/feed/HomeStyles";
import PostCard from "./PostCard";
import {FlatList} from "react-native";

const HomeScreen = ({navigation}) => {
    const Posts = [
        {
            id: 1,
            userName: "João Pedro",
            profilePic: require("../../assets/logo.png"),
            postTime: "4 horas atrás",
            description: "Esse é o texto da postagem",
            postImage: require("../../assets/mario.jpeg"),
            liked: true
        },
        {
            id: 2,
            userName: "Gustavo",
            profilePic: require("../../assets/logo.png"),
            postTime: "4 horas atrás",
            description: "Esse é o texto da postagem",
            postImage: null,
            liked: true
        },
        {
            id: 3,
            userName: "Renan Almossar",
            profilePic: require("../../assets/logo.png"),
            postTime: "4 horas atrás",
            description: "Esse é o texto da postagem",
            postImage: require("../../assets/mario.jpeg"),
            liked: false
        },
        {
            id: 4,
            userName: "Lucas Nakamura",
            profilePic: require("../../assets/logo.png"),
            postTime: "4 horas atrás",
            description: "Esse é o texto da postagem",
            postImage: null,
            liked: false
        },
        {
            id: 5,
            userName: "Gabriel Geme Fino",
            profilePic: require("../../assets/logo.png"),
            postTime: "4 hora atrás",
            description: "Esse é o texto da postagem",
            postImage: null,
            liked: false
        }
    ];

    return (
        <Container>
            <FlatList
                data={Posts}
                renderItem={({item}) => <PostCard item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
};

export default HomeScreen;
