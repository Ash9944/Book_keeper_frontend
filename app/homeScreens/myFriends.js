import React, { useEffect, useState, useContext } from 'react';
import { Modal, FlatList, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFriends, removeFriend , removeCustomFriend } from '../httpRequests';
import { AppContext } from '../../AppContext';
import { useFocusEffect } from '@react-navigation/native';

const MyFriendsScreen = ({ navigation }) => {
    const [allFriends, setAllFriends] = useState(null);
    const { userDetails } = useContext(AppContext);

    async function fetchFriends() {
        try {
            var allFriendsResp = await getFriends(userDetails["_id"]);
            if (!allFriendsResp) {
                Alert.alert("No Uses Found");
            }

            setAllFriends(allFriendsResp);
        } catch (error) {
            Alert.alert("Failed To Fetch Friends");
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            // This will fire every time the screen is focused
            fetchFriends();

            return () => {
                // Optional: cleanup function if needed when screen loses focus
            };
        }, [])
    );

    const setEnvToRemoveFriend = async function (user) {
        let response = await removeFriend(userDetails["_id"], user["_id"]);
        if (response) {
            Alert.alert(`Removed ${user.name} from your friends`);
            fetchFriends();
        } else {
            Alert.alert(`Failed to Removed ${user.name} from your friends`);
        }
    }

    const setEnvToRemoveCustomFriend = async function (user) {
        let response = await removeCustomFriend(userDetails["_id"], user["_id"]);
        if (response) {
            Alert.alert(`Removed ${user.name} from your friends`);
            fetchFriends();
        } else {
            Alert.alert(`Failed to Removed ${user.name} from your friends`);
        }
    }

    const addFriendList = ({ item }) => (
        (!item.isCustomUser ? (
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <TouchableOpacity onPress={() => setEnvToRemoveFriend(item)}>
                    <Text>Remove Friend</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <TouchableOpacity onPress={() => setEnvToRemoveCustomFriend(item)}>
                    <Text>Remove custom friend</Text>
                </TouchableOpacity>
            </View>
        )
        )
    );

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <Text style={styles.label}>My Friends</Text>
            </View>

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

export default MyFriendsScreen;