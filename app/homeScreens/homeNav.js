import React, { useEffect, useContext, } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native';
import AmountEntryScreen from './entryForm';
import AddFriendsScreen from './addFriends';
import FriendRequestScreen from './friendRequest';
import MyFriendsScreen from './myFriends';
import TransactionHistory from '../transactionHistory/transactionHistoryNav';
import { AppContext } from '../../AppContext';

const Drawer = createDrawerNavigator();

export default function TabLayout({ navigation }) {
    const { userDetails } = useContext(AppContext);

    useEffect(() => {
        navigation.setOptions({
            title: `Hi ${userDetails.name || 'User'}`,
        });



    }, [userDetails]);

    return (
        <Drawer.Navigator initialRouteName="Credit/Debit Entry">
            <Drawer.Screen name="Credit/Debit Entry" component={AmountEntryScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerShown: false }} />
            <Drawer.Screen name="Add Users" component={AddFriendsScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="See Requests" component={FriendRequestScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="My Friends" component={MyFriendsScreen} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );

}
