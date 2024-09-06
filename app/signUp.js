// components/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signUpUser } from './httpRequests';

const SignUpScreen = ({ navigation }) => {
    const [signUpDetails, setSignUpDetails] = useState({});

    const handleChange = (key, value) => {
        setSignUpDetails(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSignUp = async () => {
        try {
            if (!Object.keys(signUpDetails).length) {
                Alert.alert('Please Enter All details');
                return;
            }

            await signUpUser(signUpDetails);
            Alert.alert('Sign Up Successful, login with your credentials');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder="User Id"
                value={signUpDetails.userId}
                onChangeText={text => handleChange('userId', text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={signUpDetails.name}
                onChangeText={text => handleChange('name', text)}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={setSignUpDetails.password}
                onChangeText={text => handleChange('password', text)}
                secureTextEntry
                autoCapitalize="none"
            />
            <Button title="Sign Up" onPress={handleSignUp} />
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
});

export default SignUpScreen;
