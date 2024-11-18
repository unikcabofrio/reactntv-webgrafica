import React from "react";
import { StyleSheet, Text } from "react-native";

export default function CopyText() {
    const currentYear = new Date().getFullYear();
    const startYear = 2024;

    // Formatação do ano
    const formattedYear = currentYear === startYear
        ? currentYear
        : `${startYear} - ${currentYear}`;

    return (
        <Text style={styles.copyTitle}>
            Todos os direitos reservados © {formattedYear}{'\n'}Unik Cabo Frio
        </Text>
    );
}

const styles = StyleSheet.create({
    copyTitle: {
        textAlign: 'center',
        fontSize: 13,
        color: '#ffffff',
    }
});
