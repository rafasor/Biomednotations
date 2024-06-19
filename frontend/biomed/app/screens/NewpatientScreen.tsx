import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/login/InputField';
import Button from '../components/login/Button';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const NewpatientScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Erro ao armazenar o token:', error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
      return null;
    }
  };

  const createPatient = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.error('Token de autenticação não encontrado');
        Alert.alert('Erro', 'Token de autenticação não encontrado. Faça login novamente.');
        navigation.navigate('Login'); // Redireciona para a tela de login
        return;
      }

      const patientData = {
        name: nome.trim(),
        email: email.trim(),
        cpf: cpf.trim(),
        idade: idade.trim(),
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://192.168.1.104:9090/api/patients', patientData, config);

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Paciente registrado com sucesso!');
        navigation.navigate('Pagina Principal');
      } else {
        Alert.alert('Erro', 'Não foi possível registrar o paciente. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar paciente:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          Alert.alert('Erro', 'Dados inválidos. Verifique os campos e tente novamente.');
        } else if (axiosError.response?.status === 401) {
          Alert.alert('Erro', 'Não autorizado. Faça login novamente.');
          navigation.navigate('Login');
        } else {
          Alert.alert('Erro', 'Não foi possível registrar o paciente. Verifique sua conexão e tente novamente.');
        }
      } else {
        Alert.alert('Erro', 'Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Text style={styles.logoHealth}>HEALTH</Text>
          <Text style={styles.logoEasy}>EASY</Text>
        </Text>
        <Text style={styles.subtitle}>ANÁLISES LABORATORIAIS</Text>
      </View>
      <InputField
        label="Nome:"
        placeholder="Digite o nome do paciente"
        value={nome}
        onChangeText={setNome}
      />
      <InputField
        label="Email:"
        keyboardType="email-address"
        placeholder="Digite o email do paciente"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        label="CPF:"
        keyboardType="numeric"
        placeholder="Digite o CPF do paciente"
        value={cpf}
        onChangeText={setCpf}
      />
      <InputField
        label="Idade:"
        keyboardType="numeric"
        placeholder="Digite a idade do paciente"
        value={idade}
        onChangeText={setIdade}
      />
      <Button title="REGISTRAR" onPress={createPatient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  logoHealth: {
    writingDirection: 'rtl', // para texto vertical
    fontSize: 24,
  },
  logoEasy: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
  },
});

export default NewpatientScreen;
