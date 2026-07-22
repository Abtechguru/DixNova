let mongoose: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  mongoose = require('mongoose');
} catch (e) {
  // mongoose package not installed in node_modules yet
}

export interface IAnalysisRecord {
  recordId: string;
  name: string;
  activeBuses: number;
  occupancyRate: number;
  revenueToday: number;
  status: string;
  avgSpeedKmh: number;
  state: string;
  importedAt: Date;
}

let AnalysisDataModel: any = null;

if (mongoose) {
  const AnalysisDataSchema = new mongoose.Schema(
    {
      recordId: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      activeBuses: { type: Number, default: 0 },
      occupancyRate: { type: Number, default: 0 },
      revenueToday: { type: Number, default: 0 },
      status: { type: String, default: 'NORMAL' },
      avgSpeedKmh: { type: Number, default: 40 },
      state: { type: String, default: 'Lagos State (LAMATA)' },
      importedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
  );

  AnalysisDataModel = mongoose.models.AnalysisData || mongoose.model('AnalysisData', AnalysisDataSchema);
}

export default AnalysisDataModel;
