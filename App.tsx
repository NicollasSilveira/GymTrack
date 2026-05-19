import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import { db } from "./src/firebase/config";

import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function App() {

  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function handleSaveWorkout() {

    if (!exercise || !weight || !reps) {
      return;
    }

    try {

      await addDoc(collection(db, "workouts"), {
        exercise,
        weight: Number(weight),
        reps: Number(reps),
        date: new Date().toLocaleDateString("pt-BR"),
        createdAt: new Date(),
      });

      await loadWorkouts();

      console.log("Treino salvo!");

      setExercise("");
      setWeight("");
      setReps("");

    } catch (error) {

      console.log(error);

    }

  }

  async function loadWorkouts() {

    try {

      const querySnapshot = await getDocs(
        query(
          collection(db, "workouts"),
          orderBy("createdAt", "desc")
        )
      );

      const workoutsList: any[] = [];

      querySnapshot.forEach((doc) => {

        workoutsList.push({
          id: doc.id,
          ...doc.data(),
        });

      });

      setWorkouts(workoutsList);

    } catch (error) {

      console.log(error);

    }

  }

  function calcular_vl(carga: number, reps: number) {
    return carga * reps;
  }

  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.container}>

        <Text style={styles.title}>
          GymTrack       <Image
        source={require("./assets/images/arm.png")}
        style={{height:42, width: 42}}
      />
        </Text>



        <TextInput
          placeholder="Exercício"
          placeholderTextColor="#888"
          style={styles.input}
          value={exercise}
          onChangeText={newText => setExercise(newText)}
        />

        <TextInput
          placeholder="Carga"
          placeholderTextColor="#888"
          keyboardType="numeric"
          style={styles.input}
          value={weight}
          onChangeText={newText => setWeight(newText)}
        />

        <TextInput
          placeholder="Repetições"
          placeholderTextColor="#888"
          keyboardType="numeric"
          style={styles.input}
          value={reps}
          onChangeText={newText => setReps(newText)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveWorkout}>
          <Text style={styles.buttonText}>
            Salvar treino
          </Text>
        </TouchableOpacity>

        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <View style={styles.card}>

              <Text style={styles.exercise}>
                {item.exercise}
              </Text>

              <Text style={styles.cardText}>
                {item.date} {"\n"}
                {item.weight}kg x {item.reps} reps{"\n"}
                Volume Load: {calcular_vl(item.weight, item.reps)} Kg
              </Text>

            </View>

          )}
        />

        <StatusBar style="light" />

      </SafeAreaView>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  title: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#1e1e1e",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    color: "#fff",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#ff0000",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1e1e1e",
    marginBottom: 10,
  },

  exercise: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 9,
    backgroundColor: '#ff0000b9',
    borderRadius: 9,
    padding: 10,
  },

  cardText: {
    color: "#ccc",
    fontSize: 16,
  },

});