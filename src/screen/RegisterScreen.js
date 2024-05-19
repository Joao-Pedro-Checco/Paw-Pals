import React from "react";
import {ActivityIndicator, Text, TouchableOpacity} from "react-native";
import {FIREBASE_AUTH, FIREBASE_DB} from "../firebase/FirebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {
    Background,
    ButtonText,
    Card,
    Container,
    Header,
    Input,
    ProfilePicture,
    RegisterButton,
    Title
} from "../styles/RegisterStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import {collection, addDoc} from "firebase/firestore";
import {getStorage, ref, uploadBytes} from "firebase/storage";

const RegisterScreen = ({navigation}) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [profilePic, setProfilePic] = React.useState(null);
    const auth = FIREBASE_AUTH;

    const passwordConfirmed = (password, confirmPassword) => {
        return password && confirmPassword && password === confirmPassword;
    }

    const register = async () => {
        if (!passwordConfirmed(password, confirmPassword)) {
            alert("As senhas não correspondem! Tente novamente.")
            return;
        }

        setLoading(true);

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            if (profilePic === null) {
                const docRef = await addDoc(collection(FIREBASE_DB, "users"), {
                    name: name.trim(),
                    photoURI: profilePic,
                    uid: response.user.uid
                });

                return;
            }

            const uploadURI = profilePic;
            let fileName = uploadURI.substring(uploadURI.lastIndexOf("/") + 1);
            const extension = fileName.split(".").pop();
            fileName = "/images/profile/" + response.user.uid + "." + extension;

            const docRef = await addDoc(collection(FIREBASE_DB, "users"), {
                name: name.trim(),
                photoURI: fileName,
                uid: response.user.uid
            });

            await uploadProfilePic(fileName);

        } catch (error) {
            console.log(error);
            alert("Falha no cadastro: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    const uploadProfilePic = async (fileName) => {
        try {
            const storage = getStorage();
            const storageRef = ref(storage, fileName);
            const img = await fetch(profilePic);
            const bytes = await img.blob();
            await uploadBytes(storageRef, bytes);
        } catch (e) {
            console.log(e);
        }
    }

    const chooseProfilePic = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            setProfilePic(result.assets[0].uri);
        }
    }

    return (
        <Background
            resizeMode='cover'
            source={require("../assets/bg.png")}>
            <Container>
                <Title>Paw Pals</Title>

                <Card>
                    <Header>Cadastro</Header>

                    <TouchableOpacity onPress={chooseProfilePic}>
                        {
                            profilePic === null ? (
                                <MaterialIcons
                                    name="add-a-photo"
                                    size={70}
                                    color={"#1B022E"}
                                />
                            ) : (
                                <ProfilePicture source={{uri: profilePic}}/>
                            )
                        }
                        <ButtonText style={{color: "#1B022E"}}>Foto de perfil</ButtonText>
                    </TouchableOpacity>

                    <Input
                        value={name}
                        placeholder="Nome"
                        autocapitalize="none"
                        onChangeText={setName}
                    ></Input>

                    <Input
                        value={email}
                        placeholder="E-mail"
                        autocapitalize="none"
                        onChangeText={setEmail}
                    ></Input>

                    <Input
                        value={password}
                        secureTextEntry
                        placeholder="Senha"
                        autocapitalize="none"
                        onChangeText={setPassword}
                    ></Input>

                    <Input
                        value={confirmPassword}
                        secureTextEntry
                        placeholder="Confirmar senha"
                        autocapitalize="none"
                        onChangeText={setConfirmPassword}
                    ></Input>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="#1B022E"
                            style={{
                                marginTop: 50,
                                marginHorizontal: 58
                            }}
                        />
                    ) : (
                        <RegisterButton onPress={register}>
                            <ButtonText>Cadastrar-se</ButtonText>
                        </RegisterButton>
                    )}

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{alignSelf: "center", marginTop: 32}}>
                            Já possui cadastro?{" "}
                            <Text style={{color: "#1B022E"}}>Faça login</Text>
                        </Text>
                    </TouchableOpacity>
                </Card>
            </Container>
        </Background>
    );
};

export default RegisterScreen;
