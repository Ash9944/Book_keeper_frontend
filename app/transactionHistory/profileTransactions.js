import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProfileTransactions = ({ route }) => {
    const { name, type, amount } = route.params;

    return (
        <View>
            <View>

            </View>
            <ScrollView>
                <Text>sfsdfsdf</Text>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({

})
export default ProfileTransactions;