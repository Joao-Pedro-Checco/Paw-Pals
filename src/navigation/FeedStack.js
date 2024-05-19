import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapScreen from "../screen/feed/MapScreen";
import HomeScreen from "../screen/feed/HomeScreen";
import {View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ProfileScreen from "../screen/ProfileScreen";
import NewPostScreen from "../screen/feed/NewPostScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({navigation}) => (
    <Stack.Navigator>
        <Stack.Screen
            name="HeaderFeed"
            component={HomeScreen}
            options={{
                title: "Paw Pals",
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    color: '#FDFDFB',
                    fontSize: 28,
                },
                headerStyle: {
                    backgroundColor: '#77BBC4',
                },
                headerRight: () => (
                    <View style={{marginRight: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <FontAwesome
                            name="plus"
                            size={25}
                            color="#FDFDFB"
                            onPress={() => navigation.navigate("NewPost")}
                        />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="NewPost"
            component={NewPostScreen}
            options={{
                title: "Nova Postagem",
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    color: '#FDFDFB',
                    fontSize: 24,
                },
                headerTintColor: '#FDFDFB',
                headerStyle: {
                    backgroundColor: '#77BBC4',
                },
            }}
        />
    </Stack.Navigator>
);

const FeedStack = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: 60,
                backgroundColor: "#77BBC4",
            },
            tabBarActiveTintColor: "#485982",
            tabBarInactiveTintColor: "#FDFDFB",
        }}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" size={40} color={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarLabel: 'Mapa',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="google-maps" size={40} color={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account" size={40} color={color}/>
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default FeedStack;
