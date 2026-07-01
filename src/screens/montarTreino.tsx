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
    ScrollView,
} from "react-native";

import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { Alert } from "react-native";

import {
  useContext
} from "react";

import {
  ThemeContext
} from "../styles/contextoTema";

type Exercicio = {
    nome: string;
    series: number;
};

export default function MontarTreinoScreen({ route, navigation }: any) {
    const [numSeries, setNumSeries] = useState("");
    const [nomeExercicio, setNomeExercicio] = useState("");
    const [treinoSelecionado, setTreinoSelecionado] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

        const {
      darkMode,
      setDarkMode,
      fontSize,
      setFontSize,
    } = useContext(ThemeContext);


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

    for (const treino of treinos) {
        if (
            exercicios[treino as keyof typeof exercicios].length === 0
        ) {
            Alert.alert(
                "Treino incompleto",
                `Adicione pelo menos um exercício no treino ${treino}.`
            );
            return;
        }
    }

    try {
        await addDoc(collection(db, "treinos"), {
            uid: auth.currentUser?.uid,
            tipo,
            exercicios,
            dataCriacao: new Date(),
        });

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

        <ScrollView   style={darkMode
              ? stylesDark.container
              : stylesLight.container}
  contentContainerStyle={{
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  }}
  showsVerticalScrollIndicator={false}>

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
                Criando Treino {tipo}
            </Text>

            {treinos.map((treino) => (
                <View
                    key={treino}
                    style={darkMode
              ? stylesDark.card
              : stylesLight.card}
                >
                    <Text style={darkMode
              ? stylesDark.cardTitle
              : stylesLight.cardTitle}>
                        Treino {treino}
                    </Text>

                    {exercicios[treino as keyof typeof exercicios].map(
                        (item, index) => (
                            <Text
                                key={index}
                                style={darkMode
              ? stylesDark.exerciseItem
              : stylesLight.exerciseItem}
                            >
                                • {item.nome} - {item.series} séries
                            </Text>
                        )
                    )}

                    <TouchableOpacity
                        style={stylesDark.addButton}
                        onPress={() => {
                            setTreinoSelecionado(treino);
                            setModalVisible(true);
                        }}
                    >
                        <Text style={stylesDark.addButtonText}>
                            + Adicionar Exercício
                        </Text>
                    </TouchableOpacity>

                </View>
            ))}

                        <TouchableOpacity
                style={stylesDark.finishButton}
                onPress={finalizarTreino}
            >
                <Text style={stylesDark.finishButtonText}>
                    Finalizar
                </Text>
            </TouchableOpacity>


            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={darkMode
              ? stylesDark.modalContainer
              : stylesLight.modalContainer}>
                    <View style={darkMode
              ? stylesDark.modalContent
              : stylesLight.modalContent}>

                        <Text style={stylesDark.modalTitle}>
                            Novo Exercício
                        </Text>

                        <TextInput
                            placeholder="Nome do exercício"
                            value={nomeExercicio}
                            onChangeText={setNomeExercicio}
                            style={stylesDark.input}
                        />

                        <TextInput
                            placeholder="Número de séries"
                            value={numSeries}
                            onChangeText={(text) => {
                                const apenasNumeros = text.replace(/[^0-9]/g, "");
                                setNumSeries(apenasNumeros);
                            }}
                            keyboardType="numeric"
                            style={stylesDark.input}
                        />

                        <TouchableOpacity
    style={stylesDark.saveButton}
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
    <Text style={stylesDark.saveButtonText}>
        Salvar
    </Text>
</TouchableOpacity>

<TouchableOpacity
    style={stylesDark.cancelButton}
    onPress={() => {
        setNomeExercicio("");
        setNumSeries("");
        setModalVisible(false);
    }}
>
    <Text style={stylesDark.cancelButtonText}>
        Cancelar
    </Text>
</TouchableOpacity>

                    </View>
                </View>
            </Modal>
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
        marginBottom: 60,
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

  settingButton: {
    backgroundColor: "#696969",
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 80,
  },
cancelButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
},

cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
},
});

const stylesLight = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e2e2e2",
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
        marginBottom: 25,
    },

    card: {
        backgroundColor: "#969696",
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },

    cardTitle: {
        color: "#000000",
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
        backgroundColor: "rgba(126, 126, 126, 0.5)",
    },

    modalContent: {
        width: "85%",
        backgroundColor: "#e76b3a",
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

  settingButton: {
    backgroundColor: "#696969",
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  cancelButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
},

cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
},
});