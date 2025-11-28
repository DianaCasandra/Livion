import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/rootNavigator';
import { UserProvider, MockDataProvider } from '@/components/providers';
import { ThemeProvider } from '@/components/providers/ThemeProvider';


export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MockDataProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </MockDataProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
