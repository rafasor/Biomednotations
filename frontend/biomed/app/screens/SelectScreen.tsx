import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Button from '../components/login/Button';

const SelectScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Text style={styles.logoHealth}>HEALTH</Text>
          <Text style={styles.logoEasy}>EASY</Text>
        </Text>
        <Text style={styles.subtitle}>ANÁLISES LABORATORIAIS</Text>
      </View>
        <Button title="PACIENTES" onPress={() => navigation.navigate('Pacientes')} />
      <Button title="NOVO PACIENTE" onPress={() => navigation.navigate('Novo Paciente')} />
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

export default SelectScreen;