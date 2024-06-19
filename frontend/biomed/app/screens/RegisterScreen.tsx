import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/login/InputField';
import Button from '../components/login/Button';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [nome, setNome] = React.useState('');
  const [RA, setRa] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.104:9090/api/users', {
        name: nome.trim(),
        email: email.trim(),
        password: senha,
        RA: RA.trim(), // Ou outra identificação que você use
      });

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('Login'); // Redireciona para o login após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário. Tente novamente mais tarde.');
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
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <InputField
        label="RA:"
        placeholder="Digite seu RA"
        value={RA}
        onChangeText={setRa}
      />
      <InputField
        label="Email:"
        keyboardType="email-address"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        label="Senha:"
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="CADASTRAR" onPress={handleRegister} />
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

export default RegisterScreen;
