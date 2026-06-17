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

import { db, auth } from "../firebase/config";


export default function IniciarTreinoScreen({ navigation }: any) {

  const [treinos, setTreinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    <View style={styles.container}>
      <Text style={styles.title}>
        Meus Treinos
      </Text>

      {treinos.map((treino) => (
        <TouchableOpacity
          key={treino.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate(
              "ExecutarTreino",
              {
                treino,
              }
            )
          }
        >
          <Text style={styles.cardTitle}>
            Treino {treino.tipo}
          </Text>
        </TouchableOpacity>
      ))}
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
    backgroundColor: "#1e1e1e",
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
});