import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SplashScreen from "./src/screen/SplashScreen"
import LoginScreen from "./src/screen/LoginScreen";
import RegisterScreen from "./src/screen/RegisterScreen";
import {useState, useEffect} from "react";
import {FIREBASE_AUTH} from "./src/firebase/FirebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import FeedStack from "./src/navigation/FeedStack";

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log(user);
            setUser(user);
        });
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" options={{headerShown: false}}>
                {user ? (
                    <>
                        <Stack.Screen name="Feed" component={FeedStack} options={{headerShown: false}}/>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
