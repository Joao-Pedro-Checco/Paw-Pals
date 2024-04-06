import { Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({ text, onPress, buttonStyle, buttonTextStyle }) => {
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={buttonTextStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
