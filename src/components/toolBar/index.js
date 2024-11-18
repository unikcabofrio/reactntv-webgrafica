import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Cores e tamanhos como variáveis constantes para facilitar a manutenção
const ICON_COLOR_BACK = "#6E6E6E";
const ICON_COLOR_SAVE = "#2e8dcc";
const ICON_SIZE = 25;

export default function ToolBar({ onSave }) {
    const navigation = useNavigation();

    // Função para navegar de volta
    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    // Função para salvar (passada via props)
    const handleSave = useCallback(() => {
        if (onSave) {
            onSave();
        }
    }, [onSave]);

    return (
        <View style={styles.toolBar}>
            <View style={styles.toolBarStyle}>
                <Ionicons
                    style={styles.iconButtonBar}
                    name="arrow-back"
                    color={ICON_COLOR_BACK}
                    size={ICON_SIZE}
                    onPress={handleGoBack}
                />
                <Ionicons
                    style={styles.iconButtonBar}
                    name="save"
                    size={ICON_SIZE}
                    color={ICON_COLOR_SAVE}
                    onPress={handleSave}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    toolBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 30,
        alignItems: "center",
        backgroundColor: 'white',
    },
    toolBarStyle: {
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    iconButtonBar: {
        padding: 10,
    }
});
