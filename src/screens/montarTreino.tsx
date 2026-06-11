import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    TextInput,
} from "react-native";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Alert } from "react-native";

type Exercicio = {
    nome: string;
    series: number;
};

export default function MontarTreinoScreen({ route, navigation }: any) {
    const [numSeries, setNumSeries] = useState("");
    const [nomeExercicio, setNomeExercicio] = useState("");
    const [treinoSelecionado, setTreinoSelecionado] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const { tipo } = route.params;
    let treinos: string[] = [];

    switch (tipo) {
        case "AB":
            treinos = ["A", "B"];
            break;

        case "ABC":
            treinos = ["A", "B", "C"];
            break;

        case "ABCD":
            treinos = ["A", "B", "C", "D"];
            break;

        default:
            treinos = ["A"];
    }

    const [exercicios, setExercicios] = useState<{
        A: Exercicio[];
        B: Exercicio[];
        C: Exercicio[];
        D: Exercicio[];
    }>({
        A: [],
        B: [],
        C: [],
        D: [],
    });

    function adicionarExercicio(
        treino: string,
        nome: string,
        series: number
    ) {
        setExercicios((prev) => ({
            ...prev,

            [treino]: [
                ...prev[treino as keyof typeof prev],
                {
                    nome,
                    series,
                },
            ],
        }));
    }

    async function finalizarTreino() {
        try {
            await addDoc(
                collection(db, "treinos"),
                {
                    tipo,
                    exercicios,
                    dataCriacao: new Date(),
                }
            );

            Alert.alert(
                "Sucesso",
                "Treino salvo com sucesso!"
            );

            navigation.navigate("Home");
        } catch (error) {
            Alert.alert(
                "Erro",
                "Não foi possível salvar o treino."
            );

            console.log(error);
        }
    }

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Criando Treino {tipo}
            </Text>

            {treinos.map((treino) => (
                <View
                    key={treino}
                    style={styles.card}
                >
                    <Text style={styles.cardTitle}>
                        Treino {treino}
                    </Text>

                    {exercicios[treino as keyof typeof exercicios].map(
                        (item, index) => (
                            <Text
                                key={index}
                                style={styles.exerciseItem}
                            >
                                • {item.nome} - {item.series} séries
                            </Text>
                        )
                    )}

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                            setTreinoSelecionado(treino);
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.addButtonText}>
                            + Adicionar Exercício
                        </Text>
                    </TouchableOpacity>

                </View>
            ))}

                        <TouchableOpacity
                style={styles.finishButton}
                onPress={finalizarTreino}
            >
                <Text style={styles.finishButtonText}>
                    Finalizar
                </Text>
            </TouchableOpacity>


            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <Text style={styles.modalTitle}>
                            Novo Exercício
                        </Text>

                        <TextInput
                            placeholder="Nome do exercício"
                            value={nomeExercicio}
                            onChangeText={setNomeExercicio}
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="Número de séries"
                            value={numSeries}
                            onChangeText={(text) => {
                                const apenasNumeros = text.replace(/[^0-9]/g, "");
                                setNumSeries(apenasNumeros);
                            }}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {

                                if (
                                    nomeExercicio.trim() === "" ||
                                    Number(numSeries) <= 0

                                ) {
                                    return;

                                }

                                adicionarExercicio(
                                    treinoSelecionado,
                                    nomeExercicio,
                                    Number(numSeries),
                                );
                                setNumSeries("");
                                setNomeExercicio("");
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.saveButtonText}>
                                Salvar
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>



    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
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
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },

    exerciseItem: {
        color: "#ddd",
        fontSize: 16,
        marginBottom: 5,
    },

    addButton: {
        marginTop: 10,
        backgroundColor: "#ff6b00",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    saveButton: {
        backgroundColor: "#28a745",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },

    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    modalContent: {
        width: "85%",
        backgroundColor: "#1e1e1e",
        padding: 20,
        borderRadius: 15,
    },

    modalTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },

    input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
    },

    finishButton: {
        backgroundColor: "#d62828",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },

    finishButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});