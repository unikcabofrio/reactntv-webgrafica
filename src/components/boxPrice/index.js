import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/MaterialIcons';

export default function BoxPrices(props) {

    const handleChangePrice = (index, field, value) => {
        const updatedPrices = props.listPrices.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    [field]: field === 'price'
                        ? value.replace(",", ".")  // Substitui vírgula por ponto
                        : value,
                };
            }
            return item;
        });
        props.setListPrices(updatedPrices);
    };

    const handleDeletePrice = (index) => {
        const updatedPrices = props.listPrices.filter((_, i) => i !== index);
        props.setListPrices(updatedPrices);

        if (updatedPrices.length === 0) {
            props.setListPrices([{ "descri": "", "price": 0.00 }]); // Mantém pelo menos uma linha
        }
    };

    return (
        <View style={styles.boxPrice}>
            <Text style={styles.title}>Tabela de Preços</Text>
            {props.listPrices.map((item, index) => (
                <View key={index} style={styles.cardPrices}>
                    <TextInput
                        style={styles.textDescri}
                        value={item.descri}
                        onChangeText={value => handleChangePrice(index, 'descri', value)}
                        placeholder="Descrição"
                    />
                    <TextInput
                        style={styles.textPrice}
                        value={item.price.toLocaleString('pt-br', { minimumFractionDigits: 2 }).replace(".", ",")}
                        keyboardType="numeric"
                        onChangeText={value => handleChangePrice(index, 'price', value)}
                        placeholder="Preço"
                    />
                    <Ionicons
                        name="delete"
                        size={25}
                        color="#bf0f30"
                        onPress={() => handleDeletePrice(index)}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    boxPrice: {
        paddingVertical: 10,
        marginTop: 20,
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 20,
    },
    cardPrices: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#DFDFDFFF',
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: '#fff', // Um fundo branco para dar destaque
    },
    textDescri: {
        width: '70%',
        paddingLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    textPrice: {
        width: '20%',
        borderLeftWidth: 1,
        borderColor: '#DFDFDFFF',
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#f20519',
    },
});
