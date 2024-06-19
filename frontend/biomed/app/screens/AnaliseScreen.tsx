import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface CreateAnalysisFormModalProps {
  visible: boolean;
  onClose: () => void;
  patientId: string;
}

const CreateAnalysisFormModal: React.FC<CreateAnalysisFormModalProps> = ({ visible, onClose, patientId }) => {
  const [examTechnique, setExamTechnique] = useState('');
  const [sample, setSample] = useState('');
  const [reagents, setReagents] = useState('');
  const [reagentValidity, setReagentValidity] = useState('');
  const [batch, setBatch] = useState('');
  const [result, setResult] = useState('');
  const [observations, setObservations] = useState('');
  
  const handleCreateAnalysis = async () => {
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

      const analysisData = {
        examTechnique,
        sample,
        reagents,
        reagentValidity,
        batch,
        result,
        observations,
        patientId,
      };

      const response = await axios.post(`http://192.168.1.104:9090/api/analyses/${patientId}`, analysisData, config);

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Análise criada com sucesso.');
        onClose(); // Fecha o modal após o sucesso
      } else {
        Alert.alert('Erro', 'Não foi possível criar a análise. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar análise:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar a análise. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Cadastrar Análise</Text>
          <TextInput
            style={styles.input}
            placeholder="Técnica de Exame"
            onChangeText={setExamTechnique}
            value={examTechnique}
          />
          <TextInput
            style={styles.input}
            placeholder="Amostra"
            onChangeText={setSample}
            value={sample}
          />
          <TextInput
            style={styles.input}
            placeholder="Reagentes"
            onChangeText={setReagents}
            value={reagents}
          />
          <TextInput
            style={styles.input}
            placeholder="Validade do Reagente"
            onChangeText={setReagentValidity}
            value={reagentValidity}
          />
          <TextInput
            style={styles.input}
            placeholder="Lote"
            onChangeText={setBatch}
            value={batch}
          />
          <TextInput
            style={styles.input}
            placeholder="Laudo"
            onChangeText={setResult}
            value={result}
          />
          <TextInput
            style={styles.input}
            placeholder="Observações"
            onChangeText={setObservations}
            value={observations}
          />
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateAnalysis}
          >
            <Text style={styles.createButtonText}>Cadastrar Análise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  createButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CreateAnalysisFormModal;
