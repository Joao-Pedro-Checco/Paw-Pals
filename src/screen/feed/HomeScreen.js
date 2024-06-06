import { Container } from "../../styles/feed/HomeStyles";
import PostCard from "./PostCard";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { Text } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [formatedPosts, setFormatedPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      fetchUsersAndFormatPosts();
    }
  }, [posts]);

  const fetchPosts = async () => {
    try {
      console.log("Fetching posts from Firebase...");
      const postsResponse = await getPosts();
      setPosts(postsResponse);
      console.log("Posts fetched:", postsResponse);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchUsersAndFormatPosts = async () => {
    try {
      const userPromises = posts.map((post) => getUser(post.userId));
      const usersResponse = await Promise.all(userPromises);
      const newUsers = usersResponse.flat();
      setUsers(newUsers);

      console.log("Users fetched:", newUsers);

      const newFormatedPosts = posts.map((post) => {
        const user = newUsers.find((user) => user.uid === post.userId);
        return {
          id: post.id,
          userName: user ? user.name : "Unknown",
          profilePic: user ? user.photoURI : null,
          postTime: post.postTime,
          description: post.postText,
          postImage: post.postImg,
          liked: post.likes,
        };
      });

      setFormatedPosts(newFormatedPosts);
      console.log("Formatted posts:", newFormatedPosts);
    } catch (error) {
      console.error("Error fetching users or formatting posts:", error);
    }
  };

  const getPosts = async () => {
    const arr = [];
    const q = query(collection(FIREBASE_DB, "posts"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      arr.push(post);
    });

    return arr;
  };

  const getUser = async (userId) => {
    const userArr = [];
    const q = query(
      collection(FIREBASE_DB, "users"),
      where("uid", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const user = doc.data();
      userArr.push(user);
    });

    return userArr;
  };

  return (
    <Container>
      <FlatList
        data={formatedPosts}
        renderItem={({ item }) => <PostCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default HomeScreen;
