import { useState } from "react";
import { Alert } from "react-native";

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

    <View style={styles.container}>

      <Image
        source={require("../../assets/images/arm.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        GymTrack
      </Text>

      <Text style={styles.subtitle}>
        Acompanhe sua evolução
      </Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >

        <Text style={styles.buttonText}>
          Entrar
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
      >

        <Text style={styles.registerText}>
          Não possui conta? Cadastre-se
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

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

});