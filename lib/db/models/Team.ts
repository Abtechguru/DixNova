let mongoose: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  mongoose = require('mongoose');
} catch (e) {
  // mongoose package not installed in node_modules yet
}

export interface ITeamMember {
  memberId: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  skills: string[];
}

let TeamModel: any = null;

if (mongoose) {
  const TeamSchema = new mongoose.Schema(
    {
      memberId: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      role: { type: String, required: true },
      bio: { type: String, default: '' },
      photoUrl: { type: String, required: true },
      skills: { type: [String], default: [] },
    },
    { timestamps: true }
  );

  TeamModel = mongoose.models.Team || mongoose.model('Team', TeamSchema);
}

export default TeamModel;
