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
  UserWrapper,
} from "../../styles/feed/PostCardStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";

const PostCard = ({ item }) => {
  const [like, setLike] = useState(false);
  let likeIcon = like ? "heart" : "heart-outline";
  let likeText = like ? "Curtiu" : "Curtir";

  const likePost = () => {
    setLike(!item.liked);
  };

  return (
    <Card>
      <UserWrapper>
        <ProfilePic source={item.profilePic} />
        <UserNameWrapper>
          <UserName>{item.userName}</UserName>
          <PostTime>{JSON.stringify(item.postTime)}</PostTime>
        </UserNameWrapper>
      </UserWrapper>
      <PostText>{item.description}</PostText>
      {item.postImage == null ? (
        <Divider></Divider>
      ) : (
        <PostImage source={item.postImage}></PostImage>
      )}
      <InteractionWrapper>
        <Interaction onPress={likePost}>
          <Icon name={likeIcon} size={40} color="#485982" />
          <InteractionText>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Icon name="chatbubble-outline" size={40} color="#485982" />
          <InteractionText>Comentar</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
