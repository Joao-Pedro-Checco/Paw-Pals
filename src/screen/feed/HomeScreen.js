import { Container } from "../../styles/feed/HomeStyles";
import PostCard from "./PostCard";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { Text } from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [formatedPosts, setFormatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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

      // Fetch image URLs for users and posts
      const formatedPostsPromises = posts.map(async (post) => {
        const user = newUsers.find((user) => user.uid === post.userId);
        const profilePic = user ? await getUrlFromUri(user.photoURI) : null;
        const postImage = await getUrlFromUri(post.postImg);

        return {
          id: post.id,
          userName: user ? user.name : "Unknown",
          profilePic,
          postTime: post.postTime,
          description: post.postText,
          postImage,
          liked: post.likes,
        };
      });

      const newFormatedPosts = await Promise.all(formatedPostsPromises);
      setFormatedPosts(newFormatedPosts);
      console.log("Formatted posts:", newFormatedPosts);
    } catch (error) {
      console.error("Error fetching users or formatting posts:", error);
    }
    setLoading(false);
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

  const getUrlFromUri = async (uri) => {
    if (!uri) return null;

    try {
      const storage = getStorage();
      const reference = ref(storage, uri);
      const url = await getDownloadURL(reference);
      console.log("url:", url);
      return url;
    } catch (error) {
      console.error("Error fetching URL:", error);
      return null;
    }
  };

  return (
    <Container>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color="#1B022E"
            style={{
              marginTop: 50,
              marginHorizontal: 58,
            }}
          />
        </View>
      ) : (
        <FlatList
          data={formatedPosts}
          renderItem={({ item }) => <PostCard item={item} />}
          keyExtractor={(item) => item.postTime}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default HomeScreen;
