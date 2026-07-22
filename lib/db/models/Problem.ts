let mongoose: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  mongoose = require('mongoose');
} catch (e) {
  // mongoose package not installed in node_modules yet
}

export interface IProblemStep {
  stepId: number;
  title: string;
  category: string;
  description: string;
  details?: string[];
  iconName: string;
  color: string;
  badgeColor: string;
}

let ProblemModel: any = null;

if (mongoose) {
  const ProblemSchema = new mongoose.Schema(
    {
      stepId: { type: Number, required: true, unique: true },
      title: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      details: { type: [String], default: [] },
      iconName: { type: String, default: 'AlertTriangle' },
      color: { type: String, default: 'from-blue-500 to-indigo-600' },
      badgeColor: { type: String, default: 'text-blue-400 border-blue-500/30 bg-blue-500/10' }
    },
    { timestamps: true }
  );

  ProblemModel = mongoose.models.Problem || mongoose.model('Problem', ProblemSchema);
}

export default ProblemModel;
