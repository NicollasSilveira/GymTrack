import { useState } from "react";
import { Alert } from "react-native";

import {
  useContext
} from "react";

import {
  ThemeContext
} from "../styles/contextoTema";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase/config";

export default function LoginScreen({ navigation }: any) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    darkMode,
    setDarkMode,
    fontSize,
    setFontSize,
  } = useContext(ThemeContext);

  async function handleLogin() {

    if (!email || !password) {

      Alert.alert(
        "Campos obrigatórios",
        "Preencha e-mail e senha."
      );

      return;
    }

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(userCredential.user);

      Alert.alert(
        "Sucesso",
        "Login realizado com sucesso!"
      );

      navigation.navigate("Home");

    } catch (error: any) {

      switch (error.code) {

        case "auth/invalid-email":
          Alert.alert(
            "E-mail inválido",
            "Digite um e-mail válido."
          );
          break;

        case "auth/invalid-credential":
          Alert.alert(
            "Login inválido",
            "E-mail ou senha incorretos."
          );
          break;

        default:
          Alert.alert(
            "Erro",
            error.message
          );
      }

    }

  }

  return (

    <View
      style={
        darkMode
          ? stylesDark.container
          : stylesLight.container
      }
    >

      <TouchableOpacity
        style={stylesDark.settingButton}
        onPress={() =>
          setDarkMode(!darkMode)
        }
      >
        <Text>
          {darkMode
            ? "☀️ Tema Claro"
            : "🌙 Tema Escuro"}
        </Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/images/arm.png")}
        style={stylesDark.logo}
      />

      <Text style={[stylesDark.title, {}]}>
        GymTrack
      </Text>

      <Text style={stylesDark.subtitle}>
        Acompanhe sua evolução
      </Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#777"
        style={stylesDark.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
        style={stylesDark.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={stylesDark.button}
        onPress={handleLogin}
      >

        <Text style={stylesDark.buttonText}>
          Entrar
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
      >

        <Text style={stylesDark.registerText}>
          Não possui conta? Cadastre-se
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const stylesDark = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#888",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 10,
    fontSize: 16,
  },

  input: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 15,
    color: "#fff",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#dc2626",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  registerText: {
    color: "#888",
    textAlign: "center",
    marginTop: 25,
  },

  settingButton: {
    backgroundColor: "#696969",
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  fontContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },

  fontButton: {
    backgroundColor: "#444",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

});

const stylesLight = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#888",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 10,
    fontSize: 16,
  },

  input: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 15,
    color: "#fff",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#dc2626",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  registerText: {
    color: "#888",
    textAlign: "center",
    marginTop: 25,
  },

  settingButton: {
    backgroundColor: "#696969",
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  fontContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },

  fontButton: {
    backgroundColor: "#444",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

});