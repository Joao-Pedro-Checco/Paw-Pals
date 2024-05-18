import {ButtonText, Container, InputField, InputWrapper, PostButton, PostImage} from "../../styles/feed/NewPostStyles";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import React, {useState} from "react";

const NewPostScreen = ({navigation}) => {
    const [selectedImage, setSelectedImage] = useState(null);

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

    const post = () => {

    }

    return (
        <Container>
            <InputWrapper>
                <InputField
                    placeholder="No que você está pensando?"
                    multiline
                    numberOfLines={4}
                />

                {selectedImage !== null ? <PostImage source={{uri: selectedImage}}/> : null}
            </InputWrapper>

            <PostButton onPress={post}>
                <ButtonText>Postar</ButtonText>
            </PostButton>

            <ActionButton buttonColor="#485982">
                <ActionButton.Item
                    buttonColor='#1B022E'
                    title="Tirar foto"
                    onPress={() => openCamera()}
                >
                    <Icon name="camera" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor='#77BBC4' title="Adicionar imagem"
                    onPress={() => openGallery()}
                >
                    <Icon name="images" style={styles.actionButtonIcon}/>
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
        color: 'white',
    },
}); *