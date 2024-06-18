import { Request, Response } from 'express';
import PatientModel, { IPatient } from '../models/Patient';

export const createPatient = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const { name, email, cpf } = req.body;
    const patient: IPatient = new PatientModel({ userId, name, email, cpf });
    const newPatient = await patient.save();
    res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const patients = await PatientModel.find({ userId });
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const { id } = req.params;
    const patient = await PatientModel.findOne({ _id: id, userId });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const { id } = req.params;
    const { name, email, cpf } = req.body;

    const updatedPatient = await PatientModel.findOneAndUpdate(
      { _id: id, userId },
      { name, email, cpf },
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const { id } = req.params;

    const deletedPatient = await PatientModel.findOneAndDelete({ _id: id, userId });
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

