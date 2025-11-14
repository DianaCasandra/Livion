import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Colors } from '../../../constants/Colors';

function TabLabel({ title }: { title: string }) {
  return (
    <View style={{ paddingVertical: 8 }}>
      <ThemedText variant="caption" color="tertiary" align="center">
        {title}
      </ThemedText>
    </View>
  );
}

export default function OnboardingTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.teal,
        tabBarStyle: {
          backgroundColor: Colors.background.cardGlass,
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tabs.Screen name="welcome" options={{ title: 'Welcome', tabBarButton: () => <TabLabel title="Welcome" /> }} />
      <Tabs.Screen name="login" options={{ title: 'Login', tabBarButton: () => <TabLabel title="Login" /> }} />
      <Tabs.Screen name="consent" options={{ title: 'Consent', tabBarButton: () => <TabLabel title="Consent" /> }} />
      <Tabs.Screen name="dataconnections" options={{ title: 'Data', tabBarButton: () => <TabLabel title="Data" /> }} />
      <Tabs.Screen name="risk" options={{ title: 'Risk', tabBarButton: () => <TabLabel title="Risk" /> }} />
    </Tabs>
  );
}
