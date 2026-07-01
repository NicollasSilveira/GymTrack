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


export default function CriarTreinoScreen({ navigation }: any) {
  
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
              style={darkMode ? stylesDark.backButton : stylesLight.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={darkMode ? stylesDark.backButtonText : stylesLight.backButtonText}>
                ← Voltar
              </Text>
            </TouchableOpacity>

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


      <TouchableOpacity
        style={stylesDark.button}
        onPress={() =>
          navigation.navigate("MontarTreino", {
            tipo: "AB",
          })
        }
      >
        <Text style={stylesDark.buttonText}>Treino AB</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesDark.button}
        onPress={() =>
          navigation.navigate("MontarTreino", {
            tipo: "ABC",
          })
        }
      >
        <Text style={stylesDark.buttonText}>Treino ABC</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesDark.button}
        onPress={() =>
          navigation.navigate("MontarTreino", {
            tipo: "ABCD",
          })
        }
      >
        <Text style={stylesDark.buttonText}>Treino ABCD</Text>
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

    settingButton: {
    backgroundColor: "#696969",
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  backButton: {
  position: "absolute",
  top: 50,
  left: 20,

  backgroundColor: "#ff6b00",
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,

  zIndex: 999,
},

backButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
});

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7c7c7",
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
    backgroundColor: "#ff0000",
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

    settingButton: {
    backgroundColor: "#696969",
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  
  backButton: {
  position: "absolute",
  top: 50,
  left: 20,

  backgroundColor: "#ff6b00",
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,

  zIndex: 999,
},

backButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
});