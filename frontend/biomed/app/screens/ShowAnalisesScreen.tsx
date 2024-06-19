import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

interface Analysis {
  _id: string;
  examTechnique: string;
  sample: string;
  reagents: string;
  reagentValidity: string;
  batch: string;
  result: string;
  observations: string;
  patientId: string;
}

const ShowAnalysisScreen = () => {
  const route = useRoute<RouteProp<{ params: { patientId: string } }, 'params'>>();
  const { patientId } = route.params;
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalyses = async () => {
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

        const response = await axios.get<Analysis[]>(`http://192.168.1.104:9090/api/GetAnalyses/${patientId}`, config);

        if (response.status === 200) {
          setAnalyses(response.data);
          setLoading(false);
        } else {
          Alert.alert('Erro', 'Não foi possível obter as análises. Por favor, tente novamente.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar análises:', error);

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 401) {
            Alert.alert('Erro', 'Não autorizado. Faça login novamente.');
          } else {
            Alert.alert('Erro', 'Não foi possível obter as análises. Verifique sua conexão e tente novamente.');
          }
        } else {
          Alert.alert('Erro', 'Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.');
        }
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, [patientId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Análises do Paciente</Text>
      <FlatList
        data={analyses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>Técnica de Exame: {item.examTechnique}</Text>
            <Text style={styles.cardText}>Amostra: {item.sample}</Text>
            <Text style={styles.cardText}>Reagentes: {item.reagents}</Text>
            <Text style={styles.cardText}>Validade dos Reagentes: {item.reagentValidity}</Text>
            <Text style={styles.cardText}>Lote: {item.batch}</Text>
            <Text style={styles.cardText}>Resultado: {item.result}</Text>
            <Text style={styles.cardText}>Observações: {item.observations}</Text>
          </View>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
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
});

export default ShowAnalysisScreen;
