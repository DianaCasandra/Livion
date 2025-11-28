import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../../components/providers/UserProvider';

// import LoadingScreen from '../screens/LoadingScreen';
import AuthEntryStack from './authEntryStack';
import AppStack from './appStack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useUser();

  // if (loading) return <LoadingScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="App" component={AppStack} />
      ) : (
        <Stack.Screen name="AuthEntry" component={AuthEntryStack} />
      )}
    </Stack.Navigator>
  );
}
