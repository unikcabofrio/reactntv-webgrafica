import Toast from 'react-native-toast-message';

// Função para exibir o Toast com maior flexibilidade
export const ToastShow = ( type, title, text, position = "top", duration = 1000 ) => {
  // Verificar se os parâmetros obrigatórios foram passados
  if (!type || !title || !text) {
    console.error("Erro: 'type', 'title' e 'text' são obrigatórios.");
    return;
  }

  Toast.show({
    type: type,         // Tipo de toast (info, success, error)
    text1: title,       // Título principal
    text2: text,        // Texto secundário
    position: position, // Posição do toast (bottom, top, center)
    duration: duration, // Duração do toast
  });
};
