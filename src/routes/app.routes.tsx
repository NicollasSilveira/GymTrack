import { NavigationContainer } from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/cadastro";
import HomeScreen from "../screens/home";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );

}