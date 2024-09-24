// App.js
import React, { useContext } from 'react';
import { AppRegistry, TouchableOpacity, Text, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/login';
import HomeScreen from './app/homeScreens/homeNav';
import SignUpScreen from './app/signUp';
import { AppProvider, AppContext } from './AppContext';

const Stack = createStackNavigator();

const App = () => {
    const { userToken, setUserToken  , setUserDetails} = useContext(AppContext);

    const logout = () => {
        setUserToken(false);
        setUserDetails({});
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userToken ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={{
                            headerRight: (props) => (
                                <TouchableOpacity onPress={() => { logout() }}>
                                    <Text style={{ marginRight: 10, color: 'black' }}>Sign Out</Text>
                                </TouchableOpacity>
                            ),
                        }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign up !' }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function RootApp() {
    return (
        <AppProvider>
            <App />
        </AppProvider>
    );
}


AppRegistry.registerComponent("frontEnd", () => RootApp);

