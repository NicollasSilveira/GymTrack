import { useState } from "react";
import { Alert } from "react-native";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

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

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  function formatPhone(text: string) {

  const cleaned = text.replace(/\D/g, "");

  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  }

  if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }

  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;

}

  async function handleRegister() {

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword
  ) {

    console.log(
      "Campos obrigatórios",
      "Preencha todos os campos."
    );

    return;
  }

  if (firstName.trim().length < 3) {
    console.log(
      "Nome inválido",
      "O nome deve ter pelo menos 3 caracteres."
    );
    return;
  }

  if (lastName.trim().length < 3) {
    console.log(
      "Nome inválido",
      "O sobrenome deve ter pelo menos 3 caracteres."
    );
    return;
  }

  if (!email.includes("@")) {

    console.log(
      "E-mail inválido",
      "Digite um e-mail válido."
    );

    return;
  }

  if (password.length < 6) {

    console.log(
      "Senha inválida",
      "A senha deve possuir pelo menos 6 caracteres."
    );

    return;
  }

  if (password !== confirmPassword) {

    console.log(
      "Erro",
      "As senhas não coincidem."
    );

    return;
  }

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const uid = userCredential.user.uid;

    await setDoc(
      doc(db, "users", uid),
      {
        firstName,
        lastName,
        email,
        phone: phone.replace(/\D/g, ""),
        createdAt: new Date(),
      }
    );

    console.log(
      "Sucesso",
      "Conta criada com sucesso!"
    );

    navigation.navigate("Login");

  } catch (error: any) {

    console.log(error);

    console.log(
      "Erro",
      error.message
    );

  }

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
        onChangeText={(text) => {
          const valorFormatado = text.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
          setFirstName(valorFormatado);
        }}
      />

      <TextInput
        placeholder="Sobrenome"
        placeholderTextColor="#777"
        style={styles.input}
        value={lastName}
        onChangeText={(text) => {
          const valorFormatado = text.replace(/[^a-zA-ZÀ-ÿ\s]/sg, "");
          setLastName(valorFormatado);
        }}
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
        maxLength={14}
        onChangeText={(text) => {
          setPhone(formatPhone(text));
        }}
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