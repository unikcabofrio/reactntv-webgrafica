import React, { useState } from "react";
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import saveStory from "../../utils/saveStory";
import { ToastShow } from "../../components/toastModal";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/logo 02.png";
import CopyText from "../../components/copyText";
import ButtonPressable from "../../components/buttonPressable";

export default function ConfigId() {
  const navigation = useNavigation();
  const SHEET = "AKfycbzi_IUGaSLrg1C02QM3CsDd_qrMrNM6cs4AVLnS6lkH-feYDCai0lw9rybYC_bDbslC"
  const [textId, setTextId] = useState('');

  const handleSaveId = async () => {
    if (textId.trim().length === 0) {
      ToastShow("info", "Aviso","O ID não pode estar vazio.");
      return;
    }

    try {
      const isSaved = await saveStory.save("appgrafica@SHEET_ID", textId.trim());
      if (isSaved) {
        ToastShow("success", "Sucesso","ID salvo com sucesso!");
        navigation.navigate("Loading");
      } else {
        ToastShow("error", "Error","Erro ao salvar o ID. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao salvar ID:", error);
      ToastShow("error", "Error","Ocorreu um erro inesperado.");
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setTextId}
          value={textId}
          placeholder="Digite aqui o seu código..."
          placeholderTextColor="#999"
          returnKeyType="done"
          autoFocus
        />
        <ButtonPressable
          text="Acessar Planilha"
          color="#f2b705"
          colorPressed="#D6A103"
          colorText="#272b40"
          width={'100%'}
          paddingH={10}
          paddingV={15}
          onPress={handleSaveId}
        />
      </View>
      <CopyText />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#272b40",
    padding: 20,
    paddingTop: 60,
  },
  logo: {
    width: 250,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    paddingVertical: 20,
    color: "#000",
    fontSize: 16,
  }
});
