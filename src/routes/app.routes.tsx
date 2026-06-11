import { NavigationContainer } from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/cadastro";
import HomeScreen from "../screens/home";
import IniciarTreinoScreen from "../screens/iniciarTreino";
import CriarTreinoScreen from "../screens/criarTreino";
import ProgressoScreen from "../screens/progresso";
import MontarTreinoScreen from "../screens/montarTreino";

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

        <Stack.Screen
          name="IniciarTreino"
          component={IniciarTreinoScreen}
        />

        <Stack.Screen
          name="CriarTreino"
          component={CriarTreinoScreen}
        />

        <Stack.Screen
          name="Progresso"
          component={ProgressoScreen}
        />

        <Stack.Screen
          name="MontarTreino"
          component={MontarTreinoScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );

}