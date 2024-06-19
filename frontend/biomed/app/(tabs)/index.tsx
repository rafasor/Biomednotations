import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewpatientScreen from '../screens/NewpatientScreen';
import SelectScreen from '../screens/SelectScreen';
import PatientsScreen from '../screens/PatientsScreen';
import AnaliseScreen from '../screens/AnaliseScreen';
import ShowAnalysisScreen from '../screens/ShowAnalisesScreen';


const Stack = createStackNavigator();
const queryClient = new QueryClient();


const App : React.FC= () => {
  return (
    <QueryClientProvider client={queryClient}>
          <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Novo Paciente" component={NewpatientScreen} />
        <Stack.Screen name="Pagina Principal" component={SelectScreen} />
        <Stack.Screen name="Pacientes" component={PatientsScreen} />
        <Stack.Screen name="Cadastrar Analise" component={AnaliseScreen} />
        <Stack.Screen name="Mostrar Analises" component={ShowAnalysisScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </QueryClientProvider>

  );
};

export default App;
