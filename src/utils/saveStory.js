import AsyncStorage from '@react-native-async-storage/async-storage';

const saveStory = {
  // Salvar um dado com uma chave
  save: async (key, data) => {
    if (!key) {
      console.error('Chave inválida para salvar os dados.');
      return false;
    }
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Erro ao salvar dados na chave "${key}":`, error);
      return false;
    }
  },

  // Buscar um dado salvo pela chave
  get: async (key) => {
    if (!key) {
      console.error('Chave inválida para buscar os dados.');
      return null;
    }
    try {
      const result = await AsyncStorage.getItem(key);
      return result ? JSON.parse(result) : null;
    } catch (error) {
      console.error(`Erro ao buscar dados na chave "${key}":`, error);
      return null;
    }
  },

  // Remover um dado pela chave
  remove: async (key) => {
    if (!key) {
      console.error('Chave inválida para remover os dados.');
      return false;
    }
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Dados removidos com sucesso na chave "${key}".`);
      return true;
    } catch (error) {
      console.error(`Erro ao remover dados na chave "${key}":`, error);
      return false;
    }
  },

  // Limpar todos os dados armazenados
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
      console.log('Todos os dados foram limpos com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao limpar todos os dados:', error);
      return false;
    }
  },
};

export default saveStory;
