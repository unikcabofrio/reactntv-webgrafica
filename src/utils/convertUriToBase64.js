import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export const convertUriToBase64Expo = async (uri) => {
  try {
    // Redimensionar para 226x223
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 448, height: 320 } }], // Dimensões fixas
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } // Compressão leve para preservar qualidade
    );

    // Converter a imagem redimensionada para Base64
    const base64 = await FileSystem.readAsStringAsync(resizedImage.uri, { encoding: FileSystem.EncodingType.Base64 });

    // Verificar se a string está no limite
    if (base64.length > 50000) {
      console.warn("Imagem ainda excede o limite de 50.000 caracteres, considere ajustar as dimensões ou compressão.");
    }

    return base64;
  } catch (error) {
    console.error("Erro ao redimensionar ou converter URI para base64:", error);
    return null;
  }
};
