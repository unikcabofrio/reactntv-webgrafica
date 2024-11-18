import React, { useState } from "react";
import { StyleSheet, View, Image, ActivityIndicator, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAPI } from "../../utils/apiSheets";
import saveStory from "../../utils/saveStory";
import Logo from "../../../assets/logo 02.png";
import CopyText from "../../components/copyText";

export default function Loading() {
  const navigation = useNavigation();
  const [loadingMessage, setLoadingMessage] = useState("Carregando...");

  // Lógica para obter o ID e redirecionar
  const fetchDataAndNavigate = async () => {

    // await saveStory.remove("appgrafica@SHEET_ID");
    try {
      setLoadingMessage("Verificando configurações...");
      const sheetId = await saveStory.get("appgrafica@SHEET_ID");

      if (!sheetId) {
        setLoadingMessage("Configuração necessária.");
        navigation.navigate("Config");
        return;
      }

      setLoadingMessage("Carregando produtos...");
      const result = await getAPI(sheetId, "products");

      if (result.success) {
        navigation.navigate("Produtos");
      } else {
        setLoadingMessage("Erro ao carregar dados. Redirecionando...");
        navigation.navigate("Config");
      }
    } catch (error) {
      console.error("Erro no carregamento:", error);
      setLoadingMessage("Erro inesperado. Tente novamente.");
    }
  };

  // Efeito para executar a navegação ao focar na tela
  useFocusEffect(
    React.useCallback(() => {
      fetchDataAndNavigate();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <ActivityIndicator size="large" color="#f2b705" />
      <Text style={styles.message}>{loadingMessage}</Text>
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
    marginBottom: 50,
  },
  message: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
});
