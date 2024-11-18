import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useNavigation,useFocusEffect } from '@react-navigation/native';

import { produtosList } from "../../utils/apiSheets";
import BoxProdutos from "../../components/boxProdutos";
import ButtonPressable from "../../components/buttonPressable";


export default function Produtos() {

    const navigation = useNavigation();
    const [textFilter, onChangeTextFilter] = React.useState('');

    const [produtos,setProdutos] = React.useState(produtosList)

    const filteredProdutos = produtos.filter((item) =>
        item.name.toLowerCase().includes(textFilter.toLowerCase())
    );

    useFocusEffect(()=>{
        setProdutos(produtosList)
    })

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Searchbar
                    style={styles.searchbar}
                    placeholder="Buscar pelo produto..."
                    onChangeText={onChangeTextFilter}
                    value={textFilter}
                />
                <ButtonPressable
                    text='+'
                    color='#f2b705'
                    colorPressed='#D6A103FF'
                    colorText='#272b40'
                    width='15%'
                    paddingH={10}
                    onPress={() => {
                        navigation.navigate('FormProdutos', {
                            data: [],
                        });
                    }}
                />
            </View>
            <ScrollView style={styles.listProdutos}>
                {
                    filteredProdutos.map((item, index) => {
                        return <BoxProdutos item={item} key={index} index={index} produtos={produtos} setProdutos={setProdutos}/>
                    })
                }
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272b40',
    },
    searchBox: {
        padding: 25,
        paddingTop: 60,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    searchbar: {
        width: '80%',
        borderRadius: 10,
        backgroundColor: "#FFF"
    },
    listProdutos: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 5,
        paddingHorizontal: 25
    },
});
