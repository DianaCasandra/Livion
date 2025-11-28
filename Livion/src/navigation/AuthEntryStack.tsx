import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingPage from "../screens/LandingPage";
import RoleAuthStack from "./roleAuthStack";

const Stack = createNativeStackNavigator();

export default function AuthEntryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="RoleAuth" component={RoleAuthStack} />
    </Stack.Navigator>
  );
}
