import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/images/arm.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>GymTrack</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("IniciarTreino")}
      >
        <Text style={styles.buttonText}>
          Iniciar Treino
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CriarTreino")}
      >
        <Text style={styles.buttonText}>
          Criar Novo Treino
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Progresso")}
      >
        <Text style={styles.buttonText}>
          Ver Progresso
        </Text>
      </TouchableOpacity>

    </View>
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
    height: 100,
    backgroundColor: "#eb6200",
    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});