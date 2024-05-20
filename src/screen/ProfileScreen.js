import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {Container, ProfilePicture, UserInfoWrapper, UserName} from "../styles/ProfileStyles";
import {useEffect, useState} from "react";
import {collection, query, where, getDocs} from "firebase/firestore";
import {FIREBASE_DB, FIREBASE_AUTH} from "../firebase/FirebaseConfig";
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ProfileScreen = ({navigation}) => {
    const [userData, setUserData] = useState({});
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUserData = async () => {
        setLoading(true);
        const q = query(collection(FIREBASE_DB, "users"),
            where("uid", "==", FIREBASE_AUTH.currentUser.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserData(doc.data());

            getProfilePic(doc.data()["photoURI"]);
        });
    }

    const getProfilePic = async (imageUri) => {
        if (imageUri === null) {
            setLoading(false);
            return null;
        }

        const storage = getStorage();
        const reference = ref(storage, imageUri);

        await getDownloadURL(reference)
            .then((url) => {
                setProfile(url);
                console.log("url: " + profile);
                setLoading(false);
            });
    }

    const logout = () => {
        FIREBASE_AUTH.signOut().then(r => navigation.navigate("Splash"));
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Container>
            {
                loading ? (
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                    }}>
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
                    <>
                        <UserInfoWrapper>
                            {
                                profile === null ? (
                                    <FontAwesome
                                        name="user-circle"
                                        size={100}
                                        color={"#1B022E"}
                                        style={{
                                            margin: 10,
                                        }}
                                    />
                                ) : (
                                    <ProfilePicture source={{uri: profile}}/>
                                )
                            }
                            <UserName>{userData.name}</UserName>
                        </UserInfoWrapper>

                        {/*Botão para logout temporário*/}
                        <TouchableOpacity
                            onPress={() => logout()}
                            style={{
                                backgroundColor: "#1B022E",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                margin: 50,
                                width: 100,
                                height: 50,
                                borderRadius: 5,
                            }}>
                            <Text style={{color: "#FDFDFB"}}>Sair</Text>
                        </TouchableOpacity>
                    </>
                )
            }
        </Container>
    );
};

export default ProfileScreen;
