import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import HomeTab from '../screens/patient/dashboard/HomeTab';
import CarePlanTab from '../screens/patient/dashboard/CarePlanTab';
import PeerCirclesTab from '../screens/patient/dashboard/PeerCirclesTab';
import SymptomsTab from '../screens/patient/dashboard/SymptomsTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/Colors';
import { useLanguage } from '../components/providers/LanguageProvider';

const Tab = createBottomTabNavigator();

export default function DashboardTabs() {
   const { t } = useLanguage();
   const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar ,
          paddingBottom: insets.bottom + 6,
          height: 60 + insets.bottom
        },
        tabBarActiveTintColor: COLORS.teal,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarLabel: t.navigation.home,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CarePlanTab"
        component={CarePlanTab}
        options={{
          tabBarLabel: t.navigation.carePlan,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SymptomsTab"
        component={SymptomsTab}
        options={{
          tabBarLabel: t.navigation.symptoms,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pulse-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PeerCirclesTab"
        component={PeerCirclesTab}
        options={{
          tabBarLabel: t.navigation.circles,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    paddingBottom: 8,
    height: 70,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});
