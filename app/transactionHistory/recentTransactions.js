import React, { useState , useContext } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import { getTransactions } from '../httpRequests';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../AppContext';

const RecentTransactions = ({navigation }) => {
    const { userDetails } = useContext(AppContext);
    const [data, setData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            // This will fire every time the screen is focused
            getUsers();
        }, [userDetails])
    );

    async function getUsers() {
        let response = await getTransactions(userDetails["_id"]);

        setData([{
            title: 'Active Transactions',
            data: response,
        }])
    }

    const onPress = (userId) => {
        navigation.navigate("ProfileTrx", { "userId" : userId});
    }

    const Item = ({ userData , amount }) => (
        <TouchableOpacity onPress={() => onPress(userData["_id"])}>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{userData.name}</Text>
                {amount > 0 ?
                    (<Text style={styles.textProfit}>{`${amount}`}</Text>) :
                    (<Text style={styles.textLoss}>{`${(amount)}`}</Text>)
                }

            </View>
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item userData={item} amount={item['CREDIT'] - item['DEBIT']} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.title}>{title}</Text>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 10,
        height: 40
    },
    name: {
        fontSize: 18,
    },
    textProfit: {
        color: 'green'
    },
    textLoss: {
        color: 'red'
    }
});

export default RecentTransactions;