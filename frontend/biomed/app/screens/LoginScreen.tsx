import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/login/InputField';
import Button from '../components/login/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [ra, setRa] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  // Função para realizar o login
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.104:9090/api/login', {
        RA: ra.trim(),
        password: senha,
      });

      // Armazena o token no AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);

      // Navega para a tela desejada após o login
      navigation.navigate('Pagina Principal');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Credenciais inválidas. Verifique seu RA e senha.');
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
        label="RA:"
        keyboardType="numeric"
        placeholder="Digite seu RA"
        value={ra}
        onChangeText={setRa}
      />
      <InputField
        label="SENHA:"
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="ENTRAR" onPress={handleLogin} />
      <Button title="CADASTRAR" onPress={() => navigation.navigate('Registro')} />
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

export default LoginScreen;
