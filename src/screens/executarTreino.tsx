import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  useContext
} from "react";

import {
  ThemeContext
} from "../styles/contextoTema";

export default function ExecutarTreinoScreen({ route, navigation }: any) {
  const { treino } = route.params;

   const {
      darkMode,
      setDarkMode,
      fontSize,
      setFontSize,
    } = useContext(ThemeContext);


  return (
    <ScrollView style={darkMode
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

      <Text style={darkMode
          ? stylesDark.title
          : stylesLight.title}>
        Treino {treino.tipo}
      </Text>

      {Object.entries(treino.exercicios).map(
        ([letra, lista]: any) => {
          if (lista.length === 0) return null;

          return (
            <View
              key={letra}
              style={darkMode
          ? stylesDark.card
          : stylesLight.card}
            >
              <Text style={darkMode
          ? stylesDark.cardTitle
          : stylesLight.cardTitle}>
                Treino {letra}
              </Text>

              {lista.map(
                (
                  exercicio: any,
                  index: number
                ) => (
                  <View
                    key={index}
                    style={darkMode
          ? stylesDark.exerciseCard
          : stylesLight.exerciseCard}
                  >
                    <Text
                      style={darkMode
          ? stylesDark.exerciseName
          : stylesLight.exerciseName}
                    >
                      {exercicio.nome}
                    </Text>

                    <Text
                      style={darkMode
          ? stylesDark.exerciseInfo
          : stylesLight.exerciseInfo}
                    >
                      {exercicio.series} séries
                    </Text>
                  </View>
                )
              )}
            </View>
          );
        }
      )}
    </ScrollView>
  );
}

const stylesDark = StyleSheet.create({
    container: {
  flex: 1,
  backgroundColor: "#121212",
  padding: 20,
},

title: {
  color: "#fff",
  fontSize: 30,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 25,
},

card: {
  backgroundColor: "#1e1e1e",
  borderRadius: 15,
  padding: 15,
  marginBottom: 20,
},

cardTitle: {
  color: "#ff6b00",
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 15,
},

exerciseCard: {
  backgroundColor: "#2a2a2a",
  borderRadius: 10,
  padding: 12,
  marginBottom: 10,
},

exerciseName: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
},

exerciseInfo: {
  color: "#ccc",
  fontSize: 15,
  marginTop: 5,
},

 settingButton: {
    backgroundColor: "#696969",
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 120,
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

})

const stylesLight = StyleSheet.create({
    container: {
  flex: 1,
  backgroundColor: "#e2e2e2",
  padding: 20,
},

title: {
  color: "#000000",
  fontSize: 30,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 25,
},

card: {
  backgroundColor: "#b9b9b9",
  borderRadius: 15,
  padding: 15,
  marginBottom: 20,
},

cardTitle: {
  color: "#ff0000",
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 15,
},

exerciseCard: {
  backgroundColor: "#969696",
  borderRadius: 10,
  padding: 12,
  marginBottom: 10,
},

exerciseName: {
  color: "#000000",
  fontSize: 18,
  fontWeight: "bold",
},

exerciseInfo: {
  color: "#2c2c2c",
  fontSize: 15,
  marginTop: 5,
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
})