import * as React from 'react';
import { StyleSheet, View, ScrollView, Image, Alert, TouchableOpacity, TextInput, Text } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { ToastShow } from "../../components/toastModal";
import saveStory from '../../utils/saveStory';
import { getAPI, ins_updAPI } from '../../utils/apiSheets';

import ButtonPressable from '../../components/buttonPressable';
import BoxPrices from '../../components/boxPrice';
import ToolBar from '../../components/toolBar';
import ScreenLoading from '../../components/screenLoading';
import { convertUriToBase64Expo } from '../../utils/convertUriToBase64';
// import {dividirStringEmPartes} from '../../utils/dividirStringEmPartes';

export default function FormProduto({ route }) {
    const { data } = route.params;

    const uuid = data.uuid ? data.uuid : '';

    const [errorAlert, setErrorAlert] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [name, setName] = React.useState(data.name || "");
    const [descript, setDescript] = React.useState(data.descript || "");
    const [image, setImage] = React.useState(data.image || null);
    const [listPrices, setListPrices] = React.useState(data.prices ? JSON.parse(data.prices) : [{ "descri": "", "price": 0.00 }]);
    const [active, setActive] = React.useState(data.active || true);
    const [saveLoad, setSaveLoad] = React.useState(false);

    // Função para abrir as opções de imagem
    const openImageOptions = () => {
        Alert.alert(
            "Escolher imagem",
            "Selecione a origem da imagem",
            [
                { text: "Tirar uma foto", onPress: () => handleImageSelection('camera') },
                { text: "Escolher da galeria", onPress: () => handleImageSelection('gallery') },
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    // Função para manipular a seleção de imagem
    const handleImageSelection = async (type) => {

        const options = {
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }

        // const options = { mediaType: 'photo', includeBase64: true };
        const result = type === 'camera' ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);

        if (!result.canceled) {
            const base64 = await convertUriToBase64Expo(result.assets[0].uri)
            setImage(`data:${result.assets[0].mimeType};base64,${base64}`)
        }
    };

    // async function processarBase64(base64List, sheetId, uuidSave) {
    //     for (const [index, stringBase64] of base64List.entries()) {
    //         const indexString = index.toString();
    //         const progressValue = (index + 1) / base64List.length;
    //         setProgress(progressValue);            
    //         await ins_updAPI(sheetId, "products", [indexString, stringBase64], [], "updIMG", uuidSave);
    //     }
    // }

    // Função para salvar os dados
    const SaveData = async () => {
        const sheetId = await saveStory.get('appgrafica@SHEET_ID');

        // Validação de campos obrigatórios
        if (!name || !descript) {
            setErrorAlert(true);
            return;
        }

        setErrorAlert(false);
        setSaveLoad(true);
        setProgress(0.3)

        // Dados a serem enviados
        const newValues = [
            name,
            descript,
            image,
            JSON.stringify(listPrices),
            active
        ];
        const columnsUpd = ['name', 'descript','image','prices', 'active'];
        setProgress(0.5)

        try {
            const type = uuid === "" ? "ins" : "upd"
            const resultSave = await ins_updAPI(sheetId, "products", newValues, columnsUpd,type ,uuid);
            // const uuidSave = uuid || resultSave.uuid;
            setProgress(0.8)

            if (resultSave.success) {

                // if (image != data.image) {
                //     const base64List = dividirStringEmPartes(image);
                //     await processarBase64(base64List, sheetId, uuidSave);
                // }

                const result = await getAPI(sheetId, "products");
                setProgress(0.9) 
                result.success ? ToastShow("success", "Sucesso","Registro atualizado com sucesso.") : ToastShow("error", "Error","Erro ao inserir/atualizar dados da API.");
            }

            else {
                throw new Error(resultSave.message)
            }

            setProgress(1) 
        } catch (error) {
            console.error("Erro ao inserir/atualizar dados:", error);
            ToastShow("error", "Error", "Erro ao inserir/atualizar dados da API.");
        } finally {
            setSaveLoad(false);
            setProgress(0);
        }
    };

    return (
        <View style={styles.container}>
            {saveLoad && <ScreenLoading progress={progress}/>}

            <ScrollView style={styles.form} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Escolher a imagem */}
                <TouchableOpacity onPress={openImageOptions}>
                    <Image
                        style={styles.logo}
                        source={{ uri: image }}
                    />
                </TouchableOpacity>

                {/* Nome do produto */}
                <TextInput
                    label="Nome"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder="Nome do produto"
                />
                {errorAlert && !name && <Text style={styles.errorText}>O nome do produto é obrigatório.</Text>}

                {/* Descrição do produto */}
                <TextInput
                    label="Descrição"
                    style={[styles.input, styles.textArea]}
                    multiline
                    value={descript}
                    onChangeText={setDescript}
                    placeholder="Descrição do produto"
                />
                {errorAlert && !descript && <Text style={styles.errorText}>A descrição é obrigatória.</Text>}

                {/* Tabela de preços */}
                <BoxPrices listPrices={listPrices} setListPrices={setListPrices} />

                {/* Botão para adicionar mais preços */}
                <ButtonPressable
                    text="Clique para adicionar mais preços"
                    color="#2e8dcc"
                    colorPressed="#2574A8FF"
                    colorText="white"
                    paddingH={10}
                    paddingV={15}
                    onPress={() => setListPrices([...listPrices, { "descri": "", "price": 0.00 }])}
                />
            </ScrollView>

            {/* Barra de ferramentas */}
            <ToolBar onSave={SaveData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272b40',
    },
    form: {
        padding: 25,
        paddingTop: 60,
        backgroundColor: "#fff"
    },
    logo: {
        width: '100%',
        height: 250,
        objectFit: 'contain',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    textArea: {
        height: 100,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});
