import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../components/providers/UserProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useUser();

  if (loading) return <LoadingScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="App" component={AppStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
