import {
    Card,
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
} from "../../styles/feed/PostCardStyles";
import Icon from 'react-native-vector-icons/Ionicons';

const PostCard = ({item}) => {
    const likeIcon = item.liked ? "heart" : "heart-outline";
    const likeText = item.liked ? "Curtiu" : "Curtir";

    const likePost = () => {
        item.liked = !item.liked;
    }

    return (
        <Card>
            <UserWrapper>
                <ProfilePic source={item.profilePic}/>
                <UserNameWrapper>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.postTime}</PostTime>
                </UserNameWrapper>
            </UserWrapper>
            <PostText>{item.description}</PostText>
            {
                item.postImage == null ? (
                    <Divider></Divider>
                ) : (
                    <PostImage source={item.postImage}></PostImage>
                )
            }
            <InteractionWrapper>
                <Interaction onPress={likePost}>
                    <Icon name={likeIcon} size={40} color="#485982"/>
                    <InteractionText>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Icon name="chatbubble-outline" size={40} color="#485982"/>
                    <InteractionText>Comentar</InteractionText>
                </Interaction>
            </InteractionWrapper>
        </Card>
    );
};

export default PostCard;
