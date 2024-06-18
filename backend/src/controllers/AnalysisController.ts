import { Request, Response } from 'express';
import AnalysisModel, { IAnalysis } from '../models/Analysis';
import PatientModel from '../models/Patient';

export const createAnalysisForPatient = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const { patientId } = req.params;
    const {
      examTechnique,
      sample,
      reagents,
      reagentValidity,
      batch,
      result,
      observations,
      resultComparison
    } = req.body;

    const patient = await PatientModel.findOne({ _id: patientId, userId });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const analysis: IAnalysis = new AnalysisModel({
      userId,
      patientId,
      examTechnique,
      sample,
      reagents,
      reagentValidity,
      batch,
      result,
      observations,
      resultComparison
    });

    const newAnalysis = await analysis.save();
    res.status(201).json({ message: 'Analysis created successfully', analysis: newAnalysis });
  } catch (error) {
    console.error('Error creating analysis for patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAnalyses = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const analyses = await AnalysisModel.find({ userId });
    res.status(200).json(analyses);
  } catch (error) {
    console.error('Error fetching analyses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAnalysisById = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const { id } = req.params;
    const analysis = await AnalysisModel.findOne({ _id: id, userId });
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.status(200).json(analysis);
  } catch (error) {
    console.error('Error fetching analysis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAnalysis = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const { id } = req.params;
    const {
      examTechnique,
      sample,
      reagents,
      reagentValidity,
      batch,
      result,
      observations,
      resultComparison
    } = req.body;

    const updatedAnalysis = await AnalysisModel.findOneAndUpdate(
      { _id: id, userId },
      {
        examTechnique,
        sample,
        reagents,
        reagentValidity,
        batch,
        result,
        observations,
        resultComparison
      },
      { new: true }
    );
    if (!updatedAnalysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.status(200).json({ message: 'Analysis updated successfully', analysis: updatedAnalysis });
  } catch (error) {
    console.error('Error updating analysis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteAnalysis = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = (req as any).user._id;  // ID do usuário autenticado
    const { id } = req.params;

    const deletedAnalysis = await AnalysisModel.findOneAndDelete({ _id: id, userId });
    if (!deletedAnalysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.status(200).json({ message: 'Analysis deleted successfully' });
  } catch (error) {
    console.error('Error deleting analysis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};