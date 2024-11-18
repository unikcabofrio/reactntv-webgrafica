import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { delAPI } from '../../utils/apiSheets';
import saveStory from '../../utils/saveStory';


export default function BoxProdutos({ item,index,produtos,setProdutos }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.boxText}>
                <Text style={styles.titleText}>{item.name}</Text>
                <Text style={styles.descriptionText}>{item.descript}</Text>
            </View>
            <Ionicons
                name="edit"
                size={25}  // Ajuste o tamanho do ícone para se adequar melhor ao layout
                color="#2e8dcc"
                onPress={() => {
                    navigation.navigate('FormProdutos', {
                        data: item
                    });
                }}
            />
            <Ionicons
                name="delete"
                size={25}  // Ajuste o tamanho do ícone para se adequar melhor ao layout
                color="#bf0f30"
                onPress={async () => {
                    const uuid = item.uuid
                    const sheetId = await saveStory.get('appgrafica@SHEET_ID');
                    const resultDel = await delAPI(sheetId, "products", uuid)
                    
                    if(resultDel.success){
                        const produtosUpdated = produtos.splice(index, 1)
                        setProdutos(produtosUpdated)
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#D4D4D4FF',
    },
    boxText: {
        width: '80%',
    },
    titleText: {
        fontWeight: '600',
        fontSize: 16,  // Tamanho de fonte ajustado para uma melhor leitura
        paddingBottom: 5, // Maior espaço entre título e descrição
    },
    descriptionText: {
        fontSize: 14,  // Um tamanho de fonte um pouco menor para a descrição
        color: '#6E6E6E',  // Um tom mais suave para a descrição
    },
});
