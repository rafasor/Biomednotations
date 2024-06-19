import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import CreateAnalysisFormModal from '../screens/AnaliseScreen';

export interface Patient {
  _id: string;
  name: string;
  cpf: string;
  idade: number;
  email: string;
  ordem: number;
}

const PatientsScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [patientIdForModal, setPatientIdForModal] = useState<string>('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get<Patient[]>('http://192.168.1.104:9090/api/GetPatients', config);

        if (response.status === 200) {
          setPatients(response.data);
          setLoading(false);
        } else {
          Alert.alert('Erro', 'Não foi possível obter a lista de pacientes. Por favor, tente novamente.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 401) {
            Alert.alert('Erro', 'Não autorizado. Faça login novamente.');
            navigation.navigate('Login');
          } else {
            Alert.alert('Erro', 'Não foi possível obter a lista de pacientes. Verifique sua conexão e tente novamente.');
          }
        } else {
          Alert.alert('Erro', 'Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.');
        }
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const togglePatientOptions = (patient: Patient) => {
    if (selectedPatient && selectedPatient._id === patient._id) {
      setSelectedPatient(null);
    } else {
      setSelectedPatient(patient);
    }
  };

  const handleNavigateToShowAnalysis = (patientId: string) => {
    navigation.navigate('Mostrar Analises', { patientId });
  };

  const handleDeletePatient = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(`http://192.168.1.104:9090/api/deletarPatients/${id}`, config);

      if (response.status === 200) {
        const updatedPatients = patients.filter(patient => patient._id !== id);
        setPatients(updatedPatients);
        Alert.alert('Sucesso', 'Paciente deletado com sucesso.');
        setSelectedPatient(null);
      } else {
        Alert.alert('Erro', 'Não foi possível deletar o paciente. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao deletar o paciente. Verifique sua conexão e tente novamente.');
    }
  };

  const handleCreateAnaliseForPatient = (patientId: string) => {
    setPatientIdForModal(patientId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setPatientIdForModal('');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Text style={styles.logoHealth}>HEALTH</Text>
          <Text style={styles.logoEasy}>EASY</Text>
        </Text>
        <Text style={styles.subtitle}>ANÁLISES LABORATORIAIS</Text>
      </View>
      
      {patients.length === 0 ? (
        <Text style={styles.noPatientsText}>Nenhum paciente encontrado.</Text>
      ) : (
        <FlatList
          data={patients}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>Nome: {item.name}</Text>
              <Text style={styles.cardText}>CPF: {item.cpf}</Text>
              <Text style={styles.cardText}>Idade: {item.idade}</Text>
              <Text style={styles.cardText}>Email: {item.email}</Text>
              <Text style={styles.cardText}>Ordem: {item.ordem}</Text>
              {selectedPatient?._id === item._id && (
                <View style={styles.optionsContainer}>
                  <TouchableOpacity style={styles.optionButton} onPress={() => handleCreateAnaliseForPatient(item._id)}>
                    <Text style={styles.optionButtonText}>Cadastrar Análises</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionButton} onPress={() => handleNavigateToShowAnalysis(item._id)}>
                    <Text style={styles.optionButtonText}>Mostrar Análises</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.optionButton, styles.deleteButton]} onPress={() => handleDeletePatient(item._id)}>
                    <Text style={styles.optionButtonText}>Deletar Paciente</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => togglePatientOptions(item)}
              >
                <Text style={styles.toggleButtonText}>{selectedPatient?._id === item._id ? 'Fechar Opções' : 'Abrir Opções'}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <CreateAnalysisFormModal
        visible={modalVisible}
        onClose={closeModal}
        patientId={patientIdForModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  logoHealth: {
    fontSize: 24,
  },
  logoEasy: {
    fontSize: 64,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 20,
  },
  noPatientsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  optionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PatientsScreen;
