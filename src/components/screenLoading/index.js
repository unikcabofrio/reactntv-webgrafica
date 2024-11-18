import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import * as Progress from "react-native-progress";

// Constantes para cores e valores repetidos
const COLORS = {
    primary: "#f2b705",
    secondary: "#bf0f30",
    background: "#ffffff"
};

export default function ScreenLoading({progress}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aguarde, estamos realizando as alterações</Text>
            <ActivityIndicator size="large" color={COLORS.primary} style={styles.activityIndicator} />
            <Progress.Bar
                progress={progress}
                width={200}
                color={COLORS.primary}
                unfilledColor="#e0e0e0"
                borderWidth={0}
                style={styles.progressBar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 999,
        position: 'absolute',
        top: '40%',
        bottom: '30%',
        left: 20,
        right: 20,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: COLORS.secondary,
        marginBottom: 10, // Um pequeno espaço entre o texto e o indicador de carregamento
    },
    activityIndicator: {
        height: "50%",
    },
    progressBar: {
        marginTop: 20,
    },
});
