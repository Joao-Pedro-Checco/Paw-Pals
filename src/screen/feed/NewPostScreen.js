import {
  ButtonText,
  Container,
  InputField,
  InputWrapper,
  PostButton,
  PostImage,
} from "../../styles/feed/NewPostStyles";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const NewPostScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [postText, setPostText] = useState("");
  const [posting, setPosting] = useState(false);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (postText === "" && selectedImage === null) {
      alert(
        "É necessário adicionar um texto ou uma imagem para criar uma postagem!"
      );
      return;
    }

    setPosting(true);

    let userId = FIREBASE_AUTH.currentUser.uid;
    let postTime = Timestamp.now();

    if (selectedImage === null) {
      const docRef = await addDoc(collection(FIREBASE_DB, "posts"), {
        userId: userId,
        postText: postText,
        postImg: null,
        postTime: postTime,
        likes: null,
        comments: null,
      });

      setPosting(false);
      alert("Postagem criada com sucesso");
      navigation.goBack();
      return;
    }

    const uploadURI = selectedImage;
    let fileName = uploadURI.substring(uploadURI.lastIndexOf("/") + 1);
    const extension = fileName.split(".").pop();
    fileName = "/images/posts/" + userId + "_" + postTime + "." + extension;

    await uploadPostImage(fileName);

    const docRef = await addDoc(collection(FIREBASE_DB, "posts"), {
      userId: userId,
      postText: postText,
      postImg: fileName,
      postTime: postTime,
      likes: null,
      comments: null,
    });
  };

  const uploadPostImage = async (fileName) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, fileName);
      const img = await fetch(selectedImage);
      const bytes = await img.blob();
      await uploadBytes(storageRef, bytes);
    } catch (e) {
      console.log(e);
    }

    setPosting(false);
    alert("Postagem criada com sucesso");
    navigation.goBack();
  };

  return (
    <Container>
      <InputWrapper>
        <InputField
          value={postText}
          placeholder="No que você está pensando?"
          onChangeText={setPostText}
        />

        {selectedImage !== null ? (
          <PostImage source={{ uri: selectedImage }} />
        ) : null}
      </InputWrapper>

      {posting ? (
        <ActivityIndicator
          size="large"
          color={"#485982"}
          style={{
            margin: 40,
            alignSelf: "flex-start",
          }}
        />
      ) : (
        <PostButton onPress={createPost}>
          <ButtonText>Postar</ButtonText>
        </PostButton>
      )}

      <ActionButton buttonColor="#485982">
        <ActionButton.Item
          buttonColor="#1B022E"
          title="Tirar foto"
          onPress={() => openCamera()}
        >
          <Icon name="camera" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#77BBC4"
          title="Adicionar imagem"
          onPress={() => openGallery()}
        >
          <Icon name="images" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </Container>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
