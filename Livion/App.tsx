import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider, MockDataProvider } from '@/components/providers';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

// Patient Onboarding Screens
import WelcomeScreen from './src/screens/patient/onboarding/welcome';
import RegisterScreen from './src/screens/patient/onboarding/register';
import ConsentScreen from './src/screens/patient/onboarding/consent';
import DataConnectionsScreen from './src/screens/patient/onboarding/dataconnections';
import RiskScreen from './src/screens/patient/onboarding/risk';
import UserPromiseScreen from './src/screens/patient/onboarding/userpromise';

// Patient Dashboard (Tab Navigator)
import DashboardTabs from './src/navigation/DashboardTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MockDataProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{ headerShown: false }}
            >
              {/* Onboarding Flow */}
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Consent" component={ConsentScreen} />
              <Stack.Screen name="DataConnections" component={DataConnectionsScreen} />
              <Stack.Screen name="Risk" component={RiskScreen} />
              <Stack.Screen name="UserPromise" component={UserPromiseScreen} />

              {/* Main Dashboard */}
              <Stack.Screen name="Dashboard" component={DashboardTabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </MockDataProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
