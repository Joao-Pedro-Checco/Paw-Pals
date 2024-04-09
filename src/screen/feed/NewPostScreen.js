import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const NewPostScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>New Post Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D9D9D9",
    },
});

export default NewPostScreen;
