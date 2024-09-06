import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';

const RecentTransactions = ({ navigation, route }) => {
    // const [amountDetails, setAmountDetails] = useState({});
    const data = [
        {
            title: 'Active Transactions',
            data: [{ "name": 'Ashwajit', "type": "credit", "amount": 500 }, { "name": 'Logesh', "type": "debit", "amount": 600 }],
        },
    ];

    const onPress = ({ name, type, amount }) => {
        navigation.navigate("ProfileTrx", { name, type, amount });
    }

    const Item = ({ name, type, amount }) => (
        <TouchableOpacity onPress={() => onPress({ name, type, amount })}>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
                {type === 'credit' ?
                    (<Text style={styles.textProfit}>{`+${amount}`}</Text>) :
                    (<Text style={styles.textLoss}>{`-${amount}`}</Text>)
                }

            </View>
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item name={item.name} type={item.type} amount={item.amount} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.title}>{title}</Text>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'black',
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