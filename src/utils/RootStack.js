import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação das telas
import Loading from '../screen/loading';
import ConfigId from '../screen/configId';
import Produtos from '../screen/produtos';
import FormProduto from '../screen/formProdutos';

// Inicialização do Stack Navigator
const Stack = createNativeStackNavigator();

// Configuração das rotas
const routes = [
  { name: 'Loading', component: Loading },
  { name: 'Config', component: ConfigId },
  { name: 'Produtos', component: Produtos },
  { name: 'FormProdutos', component: FormProduto },
];

// Componente principal do Stack Navigator
export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Loading" // Tela inicial
      screenOptions={{ headerShown: false }} // Opções globais para todas as telas
    >
      {/* Renderização dinâmica das rotas */}
      {routes.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}
