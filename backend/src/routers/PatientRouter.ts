import express from 'express';
import { createPatient, getPatients, getPatientById, updatePatient, deletePatient } from '../controllers/PatientController';
import auth from '../middleware/auth';

const PatientRouter = express.Router();

PatientRouter.post('/patients', auth, createPatient);  // Rota para criar um novo paciente
PatientRouter.get('/apatients', auth, getPatients);  // Rota para obter todos os pacientes
PatientRouter.get('/bpatients/:id', auth, getPatientById);  // Rota para obter um paciente específico
PatientRouter.put('/cpatients/:id', auth, updatePatient);  // Rota para atualizar um paciente
PatientRouter.delete('/dpatients/:id', auth, deletePatient);  // Rota para excluir um paciente

export default PatientRouter;
