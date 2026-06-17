import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ExecutarTreinoScreen({ route }: any) {
  const { treino } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Treino {treino.tipo}
      </Text>

      {Object.entries(treino.exercicios).map(
        ([letra, lista]: any) => {
          if (lista.length === 0) return null;

          return (
            <View
              key={letra}
              style={styles.card}
            >
              <Text style={styles.cardTitle}>
                Treino {letra}
              </Text>

              {lista.map(
                (
                  exercicio: any,
                  index: number
                ) => (
                  <View
                    key={index}
                    style={styles.exerciseCard}
                  >
                    <Text
                      style={styles.exerciseName}
                    >
                      {exercicio.nome}
                    </Text>

                    <Text
                      style={styles.exerciseInfo}
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

const styles = StyleSheet.create({
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
})