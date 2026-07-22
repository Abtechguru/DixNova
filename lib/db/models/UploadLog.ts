let mongoose: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  mongoose = require('mongoose');
} catch (e) {
  // mongoose package not installed in node_modules yet
}

export interface IUploadLog {
  logId: string;
  filename: string;
  uploadedBy: string;
  timestamp: Date;
  type: string;
  recordCount: number;
}

let UploadLogModel: any = null;

if (mongoose) {
  const UploadLogSchema = new mongoose.Schema(
    {
      logId: { type: String, required: true, unique: true },
      filename: { type: String, required: true },
      uploadedBy: { type: String, default: 'Admin User' },
      timestamp: { type: Date, default: Date.now },
      type: { type: String, default: 'Corridor Analytics Batch' },
      recordCount: { type: Number, default: 0 }
    },
    { timestamps: true }
  );

  UploadLogModel = mongoose.models.UploadLog || mongoose.model('UploadLog', UploadLogSchema);
}

export default UploadLogModel;
