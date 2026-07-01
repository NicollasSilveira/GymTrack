import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import {
  useContext
} from "react";

import {
  ThemeContext
} from "../styles/contextoTema";

export default function HomeScreen({ navigation }: any) {

      const {
      darkMode,
      setDarkMode,
      fontSize,
      setFontSize,
    } = useContext(ThemeContext);

  return (
    <View style={darkMode
          ? stylesDark.container
          : stylesLight.container}>

      <TouchableOpacity
        style={stylesDark.settingButton}
        onPress={() =>
          setDarkMode(!darkMode)
        }
      >
        <Text>
          {darkMode
            ? "Tema Claro"
            : "Tema Escuro"}
        </Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/images/arm.png")}
        style={stylesDark.logo}
      />

      <Text style={darkMode
          ? stylesDark.title
          : stylesLight.title}>ADP Training</Text>

      <TouchableOpacity
        style={darkMode
          ? stylesDark.button
          : stylesLight.button}
        onPress={() => navigation.navigate("IniciarTreino")}
      >
        <Text style={stylesDark.buttonText}>
          Iniciar Treino
        </Text>
      </TouchableOpacity>
 
      <TouchableOpacity
        style={darkMode
          ? stylesDark.button
          : stylesLight.button}
        onPress={() => navigation.navigate("CriarTreino")}
      >
        <Text style={stylesDark.buttonText}>
          Criar Novo Treino
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const stylesDark = StyleSheet.create({
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

    settingButton: {
    backgroundColor: "#696969",
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

});

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e2e2",
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
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
  },

  button: {
    width: "100%",
    height: 100,
    backgroundColor: "#fc8d3d",
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

    settingButton: {
    backgroundColor: "#696969",
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

});