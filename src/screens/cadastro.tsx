import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function TelaCadastro({ navigation }: any) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [city, setCity] = useState("");

  const [state, setState] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  function handleRegister() {

    if (password !== confirmPassword) {
      return alert("As senhas não coincidem");
    }

    console.log({
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      password,
    });

    navigation.navigate("Login");

  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: 25,
        paddingVertical: 60,
      }}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.title}>
        Criar Conta
      </Text>

      <Text style={styles.subtitle}>
        Crie sua conta para acompanhar sua evolução
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#777"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        placeholder="Sobrenome"
        placeholderTextColor="#777"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#777"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Telefone"
        placeholderTextColor="#777"
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="Cidade"
        placeholderTextColor="#777"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        placeholder="Estado"
        placeholderTextColor="#777"
        style={styles.input}
        value={state}
        onChangeText={setState}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirmar senha"
        placeholderTextColor="#777"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >

        <Text style={styles.buttonText}>
          Criar Conta
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
      >

        <Text style={styles.loginText}>
          Já possui conta? Entrar
        </Text>

      </TouchableOpacity>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#888",
    fontSize: 16,
    marginBottom: 35,
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

  loginText: {
    color: "#888",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 40,
  },

});