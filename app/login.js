// components/LoginScreen.js
import React, { useState , useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { validateUser , getUserDetails } from './httpRequests';
import { AppContext } from '../AppContext';

const LoginScreen = ({ navigation, route }) => {
    const [details, setDetails] = useState({});
    const { setUserToken , setUserDetails } = useContext(AppContext);

    const handleChange = (key, value) => {
        setDetails(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp')
    }

    const handleLogin = async () => {
        try {
            await validateUser(details);
            setUserToken(true);

            let userDetails = await getUserDetails(details.userId)
            if(!userDetails){
                throw new Error('User not found');
            }
            setUserDetails(userDetails);
            return;
        } catch (error) {
            Alert.alert(error.message);
        }

    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Login</Text> */}
            <TextInput
                style={styles.input}
                placeholder="UserId"
                value={details.email}
                onChangeText={text => handleChange('userId', text)}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={details.password}
                onChangeText={text => handleChange('password', text)}
                secureTextEntry
                autoCapitalize="none"
            />

            <Button title="Login" onPress={handleLogin} />
            <Text></Text>
            <Button title="Signup" onPress={handleSignUp} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'black'
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 70,
        borderColor: 'gray',
        borderWidth: 4,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    submitButtons: {
        marginTop: 20,
        paddingHorizontal: 20,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 's',
    }
});

export default LoginScreen;
