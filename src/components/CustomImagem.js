import { Image } from "react-native";

const CustomImage = ({path, style}) => {
    return <Image source={path} style={style} />;
};

export default CustomImage;
