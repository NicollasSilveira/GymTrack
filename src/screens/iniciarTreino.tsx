import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  useContext
} from "react";

import {
  ThemeContext
} from "../styles/contextoTema";


import { db, auth } from "../firebase/config";


export default function IniciarTreinoScreen({ navigation }: any) {

  const [treinos, setTreinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

     const {
      darkMode,
      setDarkMode,
      fontSize,
      setFontSize,
    } = useContext(ThemeContext);


  useEffect(() => {
    carregarTreinos();
  }, []);

  async function carregarTreinos() {
    try {
      const q = query(
        collection(db, "treinos"),
        where(
          "uid",
          "==",
          auth.currentUser?.uid
        )
      );

      const snapshot = await getDocs(q);

      const lista: any[] = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setTreinos(lista);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  

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


      <Text style={darkMode
          ? stylesDark.title
          : stylesLight.title}>
        Meus Treinos
      </Text>

      {treinos.map((treino) => (

        <TouchableOpacity
          key={treino.id}
          style={darkMode
          ? stylesDark.card
          : stylesLight.card}
          onPress={() =>
            navigation.navigate(
              "ExecutarTreino",
              {
                treino,
              }
            )
          }
        >
          <Text style={darkMode
          ? stylesDark.cardTitle
          : stylesLight.cardTitle}>
            Treino {treino.tipo}
          </Text>

          <Text
  style={
    darkMode
      ? stylesDark.cardDate
      : stylesLight.cardDate
  }
>
  Criado em{" "}
  {treino.dataCriacao.toDate().toLocaleDateString("pt-BR")} às{" "}
  {treino.dataCriacao.toDate().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}
</Text>

        </TouchableOpacity>
      ))}
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

  card: {
    backgroundColor: "#ff0000",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardDate: {
  color: "#ffffff",
  fontSize: 14,
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

  card: {
    backgroundColor: "#ff0000",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },

  cardDate: {
  color: "#ccc",
  fontSize: 14,
  marginTop: 5,
},

  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
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