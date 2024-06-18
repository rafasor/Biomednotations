import { Schema, model, Document, Types } from 'mongoose';

export interface IAnalysis extends Document {
  userId: string;
  patientId: Types.ObjectId;
  examTechnique: string;
  sample: string;
  reagents: string;
  reagentValidity: Date;
  batch: string;
  result: string;
  observations: string;
  resultComparison: string;
}

const analysisSchema = new Schema<IAnalysis>({
  userId: { type: String, required: true },
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  examTechnique: { type: String, required: true },
  sample: { type: String, required: true },
  reagents: { type: String, required: true },
  reagentValidity: { type: Date, required: true },
  batch: { type: String, required: true },
  result: { type: String, required: true },
  observations: { type: String, required: true },
  resultComparison: { type: String, required: true },
});

const AnalysisModel = model<IAnalysis>('Analysis', analysisSchema);

export default AnalysisModel;
