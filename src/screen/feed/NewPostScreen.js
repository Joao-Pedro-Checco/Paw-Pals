import {Container, InputField, InputWrapper} from "../../styles/feed/NewPostStyles";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, PermissionsAndroid} from "react-native";
import {launchImageLibrary, launchCamera} from "react-native-image-picker";
import {useState} from "react";

const NewPostScreen = ({navigation}) => {
    let options = {
        saveToPhotos: true,
        mediaType: "photo"
    };
    const [cameraPhoto, setCameraPhoto] = useState(null);

    const openCamera = async () => {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted === PermissionsAndroid.PERMISSIONS.GRANTED) {
            const result = await launchCamera(options);
            setCameraPhoto(result.assets[0].uri);
        }
    };

    const openGallery = async () => {
        const result = await launchImageLibrary(options);
    };

    return (
        <Container>
            <InputWrapper>
                <InputField
                    placeholder="No que você está pensando?"
                    multiline
                    numberOfLines={4}
                />

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
            </InputWrapper>
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
});
