import { createStackNavigator } from '@react-navigation/stack';
import RecentTransactions from './recentTransactions'
import ProfileTransactions from './profileTransactions';

const Stack = createStackNavigator();

const TransactionHistory = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Recent Transactions" component={RecentTransactions} options={{ headerShown: false }}/>
            <Stack.Screen name="ProfileTrx" component={ProfileTransactions} options={{ title: 'Profile Transactions' }}/>
        </Stack.Navigator>
    );
}

export default TransactionHistory;