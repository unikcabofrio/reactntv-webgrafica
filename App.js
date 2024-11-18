import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import RootStack from './src/utils/RootStack';


export default function App() {
  return (
    <NavigationContainer>
      {/* Stack de navegação principal */}
      <RootStack />
      
      {/* Exibição de mensagens toast */}
      <Toast />

      {/* Barra de status com estilo ajustável */}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
