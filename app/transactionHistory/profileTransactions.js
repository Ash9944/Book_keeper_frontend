import React, { useState, useContext } from 'react';
import { View, Modal, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getProfileTrx , removeTrx } from '../httpRequests';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../AppContext';
import moment from 'moment';

const ProfileTransactions = ({ route }) => {
    const { userId } = route.params;
    const { userDetails } = useContext(AppContext);
    const [transactions, setTransactions] = useState([]);
    const [singleTrx, setSingleTrx] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            // This will fire every time the screen is focused
            getProfileTransactions();
        }, [userDetails])
    );

    async function getProfileTransactions() {
        let trxs = await getProfileTrx(userDetails["_id"], userId);
        setTransactions(trxs);
    }

    async function removeTransaction(trxId) {
       await removeTrx(trxId);
       setModalVisible(false); 
       getProfileTransactions();
    }

    const setEnvForDetails = function(userData){
        setModalVisible(true); 
        setSingleTrx(userData) ; 
        console.log(userData)
    }

    const Item = ({ userData }) => (
        <TouchableOpacity onPress={() => setEnvForDetails(userData)}>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{moment(userData.date).format("DD/MMM/YY")}</Text>
                {(userData.type == 'CREDIT' && userData.from["_id"] == userDetails["_id"]) || (userData.type == 'DEBIT' && userData.from["_id"] != userDetails["_id"]) ?
                    (<Text style={styles.textProfit}>{`${userData.amount}`}</Text>) :
                    (<Text style={styles.textLoss}>{`${(userData.amount)}`}</Text>)
                }

            </View>
        </TouchableOpacity>
    );

    return (

        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setSingleTrx({});
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: 'black', marginBottom: 18, fontWeight: 'bold', fontSize: 20, }}>Transaction Details</Text>

                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Text style={{ color: 'black', marginBottom: 10, fontSize: 16, }}>Date :</Text>

                            <Text style={{ color: 'black', marginBottom: 10, fontSize: 16, }}> {singleTrx._id?.timestamp}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Text style={{ color: 'black', marginBottom: 10, fontSize: 16, }}>Description :</Text>

                            <Text style={{ color: 'black', marginBottom: 18, fontSize: 16, }}> {singleTrx.description}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Text style={{ color: 'black', marginBottom: 10, fontSize: 16, }}>Amount :</Text>

                            <Text style={{ color: 'black', marginBottom: 18, fontSize: 16, }}> {singleTrx.amount}</Text>
                        </View>

                        {singleTrx.from?._id == userDetails["_id"] ? <TouchableOpacity onPress={async() => await removeTransaction(singleTrx.id)}>
                            <Text style={{ color: 'red' }}>Remove Transaction</Text>
                        </TouchableOpacity> : null}

                        {/* <Button title="Submit Details" onPress={() => submitCustomUserDetails()} />
                            <Button title="Close Modal" onPress={() => setModalVisible(false)} /> */}
                    </View>
                </View>
            </Modal>

            <FlatList
                data={transactions}                       // Data source for the FlatList
                renderItem={({ item }) => <Item userData={item} />}
                keyExtractor={(item) => item["_id"]}  // Unique key for each item
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: 'black',
        flex: 1
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 10,
        height: 40
    },
    textProfit: {
        color: 'green'
    },
    textLoss: {
        color: 'red'
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
    }
})
export default ProfileTransactions;