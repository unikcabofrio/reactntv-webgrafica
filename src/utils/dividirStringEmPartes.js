export function dividirStringEmPartes(texto, tamanhoMaximo = 45000) {
    const partes = [];
    for (let i = 0; i < texto.length; i += tamanhoMaximo) {
        partes.push(texto.slice(i, i + tamanhoMaximo));
    }
    return partes;
}