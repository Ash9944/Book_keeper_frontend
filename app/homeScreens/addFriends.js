import React, { useEffect, useState, useContext } from 'react';
import { Modal, FlatList, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { addCustomUser, getAllUserDetails, addFriend } from '../httpRequests'
import { AppContext } from '../../AppContext';
import { useFocusEffect } from '@react-navigation/native';


const AddFriendsScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [allFriends, setAllFriends] = useState(null);
    const [customUser, setCustomUser] = useState({});
    const { userDetails } = useContext(AppContext);

    async function fetchFriends() {
        try {
            var allFriendsResp = await getAllUserDetails(userDetails["_id"]);
            if (!allFriendsResp) {
                Alert.alert("No Uses Found");
            }

            setAllFriends(allFriendsResp);
        } catch (error) {
            Alert.alert("Failed To Fetch Friends");
        }
    }

    const handleChange = (key, value) => {
        setCustomUser(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    useFocusEffect(
        React.useCallback(() => {
            // This will fire every time the screen is focused
            fetchFriends();

            return () => {
                // Optional: cleanup function if needed when screen loses focus
            };
        }, [])
    );

    // useEffect(() => {
    //     fetchFriends();
    // }, [navigation]);

    const setEnvToAddFriend = async function (user) {
        let response = await addFriend(userDetails["_id"], user["_id"]);
        if (response) {
            Alert.alert("Friend Added");
            fetchFriends();
        } else {
            Alert.alert("Failed To Add Friend");
        }
    }

    const submitCustomUserDetails = async function () {
        try {
            await addCustomUser(userDetails["_id"],customUser);
            setCustomUser({});
            setModalVisible(false); 
        } catch (error) {
            Alert.alert("Failed To Add User");
        }
        
    }

    const addFriendList = ({ item }) => (
        <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => setEnvToAddFriend(item)}>
                <Text>Add Friend</Text>
            </TouchableOpacity>
        </View>

    );

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <Text style={styles.label}>Search Users</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} >
                    <Text style={{
                        fontWeight: 'bold',
                        marginBottom: 18,
                        textAlign: 'center',
                    }}>Add</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: 'black', marginBottom: 18, fontWeight: 'bold', fontSize: 20, }}>Add Custom Friend</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="black"
                            placeholder="Enter Name"
                            value={customUser.name}
                            onChangeText={text => handleChange('name', text)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholderTextColor="black"
                            placeholder="Enter Phone Number"
                            value={customUser.id}
                            onChangeText={text => handleChange('phoneNumber', text)}
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ width: '30%' }} onPress={() => submitCustomUserDetails()}>
                                <Text style={{ color: 'black' }}>Add</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={{ color: 'black' }}>Close</Text>
                            </TouchableOpacity>
                            {/* <Button title="Submit Details" onPress={() => submitCustomUserDetails()} />
                            <Button title="Close Modal" onPress={() => setModalVisible(false)} /> */}
                        </View>

                    </View>
                </View>
            </Modal>

            <FlatList
                data={allFriends}
                renderItem={addFriendList}
                keyExtractor={item => item.id}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 10,
        height: 40
    },
    userContainer: {
        height: 300
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 16,
    },
    label: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 18,
        color: 'white',
    },
    name: {
        fontSize: 18,
    },
    input: {
        height: 40,
        borderColor: 'black',
        color: 'black',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 5,
        width: 200,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background for the modal overlay
    },
    modalContent: {
        width: 350,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default AddFriendsScreen;