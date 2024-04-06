import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SplashScreen from "./src/screen/SplashScreen"
import LoginScreen from "./src/screen/LoginScreen";
import RegisterScreen from "./src/screen/RegisterScreen";
import {useState, useEffect} from "react";
import {FIREBASE_AUTH} from "./src/firebase/FirebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import FeedScreen from "./src/screen/FeedScreen";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
      <InsideStack.Navigator>
          <InsideStack.Screen name="Feed" component={FeedScreen} options={{headerShown: false}} />
      </InsideStack.Navigator>
    );
}

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
            <Stack.Navigator initialRouteName="Splash">
                {user ? (
                    <Stack.Screen name="Splash" component={InsideLayout} options={{headerShown: false}}/>
                ) : (
                    <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
                )}

                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
