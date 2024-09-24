import React, { useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getFriends , addTransaction } from '../httpRequests';
import { AppContext } from '../../AppContext';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'

const AmountEntryScreen = () => {
    const [amountDetails, setAmountDetails] = useState({});
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const { userDetails } = useContext(AppContext);

    useFocusEffect(
        React.useCallback(() => {
            // This will fire every time the screen is focused
            getUsers();
        }, [userDetails])
    );

    async function getUsers() {
        let response = await getFriends(userDetails["_id"]);
        const filteredUsers = response.map((user) => {
            return {
                label: user.name,
                value: user,
            }
        });
        setUsers(filteredUsers);
    }

    const trxTypes = [
        { label: 'Credit', value: '1' },
        { label: 'Debit', value: '2' },
    ]

    const onPressLearnMore = async function () {
        await addTransaction(userDetails["_id"] , amountDetails);
        setAmountDetails({});
    }

    const handleChange = (key, value) => {
        setAmountDetails(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    return (

        <View style={styles.container}>
            <Text style={styles.label}>Type Of Transaction</Text>
            <Dropdown style={styles.input}
                data={trxTypes}
                labelField="label"
                valueField="value"
                value={amountDetails.type}
                onChange={item => {
                    handleChange('type', item);
                }}
                containerStyle={{ backgroundColor: 'black' }}
            />

            <Text style={styles.label}>Select user to Credit / Debit</Text>
            <Dropdown style={styles.input}
                data={users}
                labelField="label"
                valueField="value"
                value={amountDetails.user}
                onChange={item => {
                    handleChange('user', item);
                }}
                containerStyle={{ backgroundColor: 'black' }}
                search
            />

            <Text style={styles.label}>Amount Credit/Debit</Text>
            <TextInput
                style={styles.input}
                value={amountDetails.amount}
                onChangeText={text => handleChange('amount', text)}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={amountDetails.description}
                onChangeText={text => handleChange('description', text)}
                autoCapitalize="none"

            />

            <Text style={styles.label}>Date Of Transaction</Text>
            <Button title={`${amountDetails.date ? amountDetails.date.toDateString() : "Click here to Enter Date"}`} onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    handleChange("date", date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                mode="date"
                maximumDate={new Date()}
            />

            <Text style={styles.label}></Text>
            <Button title="Submit Details" onPress={() => onPressLearnMore()} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 8,
        marginTop: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '900',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 14,
        paddingHorizontal: 8,
        borderCurve: 60,
    },
    label: {
        fontWeight: '900',
        marginBottom: 4,
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: 'oldlace'
    }
});

export default AmountEntryScreen;