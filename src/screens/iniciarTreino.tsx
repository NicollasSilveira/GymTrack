import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function IniciarTreinoScreen({ navigation }: any) {
  return (

        <Text style={styles.container}>
          Tela Treino
        </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
    resizeMode: "contain",
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
  },

  button: {
    width: "100%",
    height: 70,
    backgroundColor: "#ff6b00",
    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});