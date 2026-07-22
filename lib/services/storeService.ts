import fs from 'fs';
import path from 'path';
import { connectToDatabase } from '@/lib/db/connect';
import Team from '@/lib/db/models/Team';
import Problem from '@/lib/db/models/Problem';
import AnalysisData from '@/lib/db/models/AnalysisData';
import Settings from '@/lib/db/models/Settings';
import UploadLogModel from '@/lib/db/models/UploadLog';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  skills: string[];
}

export interface ProblemStep {
  id: number;
  title: string;
  category: string;
  description: string;
  details?: string[];
  iconName: string;
  color: string;
  badgeColor: string;
}

export interface AnalysisRecord {
  id: string;
  name: string;
  activeBuses: number;
  occupancyRate: number;
  revenueToday: number;
  status: string;
  avgSpeedKmh: number;
  state: string;
  importedAt: string;
}

export interface SystemSettings {
  telemetryEnabled: boolean;
  teamAutoPlay: boolean;
  maintenanceAlerts: boolean;
  liveFareAudit: boolean;
  problemJourneyPublic: boolean;
  systemNotice: string;
}

export interface UploadLog {
  id: string;
  filename: string;
  uploadedBy: string;
  timestamp: string;
  type: string;
  recordCount: number;
}

export interface DbSchema {
  team: TeamMember[];
  problems: ProblemStep[];
  customAnalysisData: AnalysisRecord[];
  settings: SystemSettings;
  uploadLogs: UploadLog[];
}

const DB_PATH = path.join(process.cwd(), 'lib', 'data', 'db.json');

export class StoreService {
  private static readDb(): DbSchema {
    try {
      if (!fs.existsSync(DB_PATH)) {
        return {
          team: [],
          problems: [],
          customAnalysisData: [],
          settings: {
            telemetryEnabled: true,
            teamAutoPlay: true,
            maintenanceAlerts: true,
            liveFareAudit: true,
            problemJourneyPublic: true,
            systemNotice: "DixNova Telemetry Realtime Engine Active"
          },
          uploadLogs: []
        };
      }
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading db.json:', error);
      return {
        team: [],
        problems: [],
        customAnalysisData: [],
        settings: {
          telemetryEnabled: true,
          teamAutoPlay: true,
          maintenanceAlerts: true,
          liveFareAudit: true,
          problemJourneyPublic: true,
          systemNotice: "DixNova Telemetry Engine"
        },
        uploadLogs: []
      };
    }
  }

  private static writeDb(data: DbSchema) {
    try {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing db.json:', error);
    }
  }

  // --- TEAM MEMBERS (MongoDB + JSON Fallback) ---
  public static async getTeamAsync(): Promise<TeamMember[]> {
    try {
      const db = await connectToDatabase();
      if (db && Team) {
        const mongoMembers = await Team.find({}).sort({ createdAt: 1 }).lean();
        if (mongoMembers && mongoMembers.length > 0) {
          return mongoMembers.map((m: any) => ({
            id: m.memberId || m._id.toString(),
            name: m.name,
            role: m.role,
            bio: m.bio,
            photoUrl: m.photoUrl,
            skills: m.skills || []
          }));
        }
      }
    } catch (err) {
      console.warn('MongoDB query failed, falling back to db.json:', err);
    }
    return this.getTeam();
  }

  public static getTeam(): TeamMember[] {
    return this.readDb().team || [];
  }

  public static async addTeamMemberAsync(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    const newId = Date.now().toString();
    const newMember: TeamMember = { ...member, id: newId };
    
    // Always sync to JSON file as fallback
    const dbData = this.readDb();
    dbData.team.push(newMember);
    this.writeDb(dbData);

    try {
      const db = await connectToDatabase();
      if (db && Team) {
        await Team.create({
          memberId: newId,
          name: member.name,
          role: member.role,
          bio: member.bio || '',
          photoUrl: member.photoUrl,
          skills: member.skills || []
        });
      }
    } catch (err) {
      console.warn('MongoDB create failed:', err);
    }

    return newMember;
  }

  public static async updateTeamMemberAsync(id: string, updated: Partial<TeamMember>): Promise<TeamMember | null> {
    const fileResult = this.updateTeamMember(id, updated);

    try {
      const db = await connectToDatabase();
      if (db && Team) {
        await Team.findOneAndUpdate({ memberId: id }, { $set: updated });
      }
    } catch (err) {
      console.warn('MongoDB update failed:', err);
    }

    return fileResult;
  }

  public static updateTeamMember(id: string, updated: Partial<TeamMember>): TeamMember | null {
    const db = this.readDb();
    const index = db.team.findIndex(m => m.id === id);
    if (index === -1) return null;
    db.team[index] = { ...db.team[index], ...updated };
    this.writeDb(db);
    return db.team[index];
  }

  public static async deleteTeamMemberAsync(id: string): Promise<boolean> {
    const fileResult = this.deleteTeamMember(id);

    try {
      const db = await connectToDatabase();
      if (db && Team) {
        await Team.deleteOne({ memberId: id });
      }
    } catch (err) {
      console.warn('MongoDB delete failed:', err);
    }

    return fileResult;
  }

  public static deleteTeamMember(id: string): boolean {
    const db = this.readDb();
    const initialLength = db.team.length;
    db.team = db.team.filter(m => m.id !== id);
    if (db.team.length !== initialLength) {
      this.writeDb(db);
      return true;
    }
    return false;
  }

  // --- PROBLEM STEPS ---
  public static async getProblemsAsync(): Promise<ProblemStep[]> {
    try {
      const db = await connectToDatabase();
      if (db && Problem) {
        const mongoProblems = await Problem.find({}).sort({ stepId: 1 }).lean();
        if (mongoProblems && mongoProblems.length > 0) {
          return mongoProblems.map((p: any) => ({
            id: p.stepId,
            title: p.title,
            category: p.category,
            description: p.description,
            details: p.details,
            iconName: p.iconName,
            color: p.color,
            badgeColor: p.badgeColor
          }));
        }
      }
    } catch (err) {
      console.warn('MongoDB query failed for problems:', err);
    }
    return this.getProblems();
  }

  public static getProblems(): ProblemStep[] {
    return this.readDb().problems || [];
  }

  public static async addProblemStepAsync(step: Omit<ProblemStep, 'id'>): Promise<ProblemStep> {
    const dbData = this.readDb();
    const newId = dbData.problems.length > 0 ? Math.max(...dbData.problems.map(p => p.id)) + 1 : 1;
    const newStep: ProblemStep = { ...step, id: newId };

    dbData.problems.push(newStep);
    this.writeDb(dbData);

    try {
      const db = await connectToDatabase();
      if (db && Problem) {
        await Problem.create({
          stepId: newId,
          title: step.title,
          category: step.category,
          description: step.description,
          details: step.details || [],
          iconName: step.iconName,
          color: step.color,
          badgeColor: step.badgeColor
        });
      }
    } catch (err) {
      console.warn('MongoDB create problem failed:', err);
    }

    return newStep;
  }

  public static async updateProblemStepAsync(id: number, updated: Partial<ProblemStep>): Promise<ProblemStep | null> {
    const fileResult = this.updateProblemStep(id, updated);

    try {
      const db = await connectToDatabase();
      if (db && Problem) {
        await Problem.findOneAndUpdate({ stepId: id }, { $set: updated });
      }
    } catch (err) {
      console.warn('MongoDB update problem failed:', err);
    }

    return fileResult;
  }

  public static updateProblemStep(id: number, updated: Partial<ProblemStep>): ProblemStep | null {
    const db = this.readDb();
    const index = db.problems.findIndex(p => p.id === id);
    if (index === -1) return null;
    db.problems[index] = { ...db.problems[index], ...updated };
    this.writeDb(db);
    return db.problems[index];
  }

  public static async deleteProblemStepAsync(id: number): Promise<boolean> {
    const fileResult = this.deleteProblemStep(id);

    try {
      const db = await connectToDatabase();
      if (db && Problem) {
        await Problem.deleteOne({ stepId: id });
      }
    } catch (err) {
      console.warn('MongoDB delete problem failed:', err);
    }

    return fileResult;
  }

  public static deleteProblemStep(id: number): boolean {
    const db = this.readDb();
    const initialLength = db.problems.length;
    db.problems = db.problems.filter(p => p.id !== id);
    if (db.problems.length !== initialLength) {
      this.writeDb(db);
      return true;
    }
    return false;
  }

  // --- ANALYSIS DATA ---
  public static async getCustomAnalysisDataAsync(): Promise<AnalysisRecord[]> {
    try {
      const db = await connectToDatabase();
      if (db && AnalysisData) {
        const mongoData = await AnalysisData.find({}).sort({ importedAt: -1 }).lean();
        if (mongoData && mongoData.length > 0) {
          return mongoData.map((d: any) => ({
            id: d.recordId || d._id.toString(),
            name: d.name,
            activeBuses: d.activeBuses,
            occupancyRate: d.occupancyRate,
            revenueToday: d.revenueToday,
            status: d.status,
            avgSpeedKmh: d.avgSpeedKmh,
            state: d.state,
            importedAt: d.importedAt ? new Date(d.importedAt).toISOString() : new Date().toISOString()
          }));
        }
      }
    } catch (err) {
      console.warn('MongoDB query analysis data failed:', err);
    }
    return this.getCustomAnalysisData();
  }

  public static getCustomAnalysisData(): AnalysisRecord[] {
    return this.readDb().customAnalysisData || [];
  }

  public static async addAnalysisDataAsync(records: Omit<AnalysisRecord, 'id' | 'importedAt'>[], filename: string): Promise<number> {
    const now = new Date().toISOString();
    const formattedRecords: AnalysisRecord[] = records.map((rec, i) => ({
      ...rec,
      id: `analysis-${Date.now()}-${i}`,
      importedAt: now
    }));

    // Update JSON file
    const dbData = this.readDb();
    dbData.customAnalysisData.push(...formattedRecords);
    dbData.uploadLogs.unshift({
      id: `log-${Date.now()}`,
      filename,
      uploadedBy: 'Admin User',
      timestamp: now,
      type: 'Corridor Analytics Batch',
      recordCount: records.length
    });
    this.writeDb(dbData);

    // Save to MongoDB
    try {
      const db = await connectToDatabase();
      if (db && AnalysisData && UploadLogModel) {
        const mongoDocs = formattedRecords.map(rec => ({
          recordId: rec.id,
          name: rec.name,
          activeBuses: rec.activeBuses,
          occupancyRate: rec.occupancyRate,
          revenueToday: rec.revenueToday,
          status: rec.status,
          avgSpeedKmh: rec.avgSpeedKmh,
          state: rec.state,
          importedAt: new Date(rec.importedAt)
        }));
        await AnalysisData.insertMany(mongoDocs);
        await UploadLogModel.create({
          logId: `log-${Date.now()}`,
          filename,
          uploadedBy: 'Admin User',
          timestamp: new Date(now),
          type: 'Corridor Analytics Batch',
          recordCount: records.length
        });
      }
    } catch (err) {
      console.warn('MongoDB insert analysis records failed:', err);
    }

    return records.length;
  }

  public static addAnalysisData(records: Omit<AnalysisRecord, 'id' | 'importedAt'>[], filename: string): number {
    const db = this.readDb();
    const now = new Date().toISOString();
    const formattedRecords: AnalysisRecord[] = records.map((rec, i) => ({
      ...rec,
      id: `analysis-${Date.now()}-${i}`,
      importedAt: now
    }));

    db.customAnalysisData.push(...formattedRecords);
    
    db.uploadLogs.unshift({
      id: `log-${Date.now()}`,
      filename,
      uploadedBy: 'Admin User',
      timestamp: now,
      type: 'Corridor Analytics Batch',
      recordCount: records.length
    });

    this.writeDb(db);
    return records.length;
  }

  public static async clearAnalysisDataAsync(): Promise<boolean> {
    this.clearAnalysisData();
    try {
      const db = await connectToDatabase();
      if (db && AnalysisData) {
        await AnalysisData.deleteMany({});
      }
    } catch (err) {
      console.warn('MongoDB clear analysis data failed:', err);
    }
    return true;
  }

  public static clearAnalysisData(): boolean {
    const db = this.readDb();
    db.customAnalysisData = [];
    this.writeDb(db);
    return true;
  }

  // --- SETTINGS & LOGS ---
  public static async getSettingsAsync(): Promise<SystemSettings> {
    try {
      const db = await connectToDatabase();
      if (db && Settings) {
        const mongoSettings = await Settings.findOne({ key: 'global' }).lean();
        if (mongoSettings) {
          return {
            telemetryEnabled: (mongoSettings as any).telemetryEnabled,
            teamAutoPlay: (mongoSettings as any).teamAutoPlay,
            maintenanceAlerts: (mongoSettings as any).maintenanceAlerts,
            liveFareAudit: (mongoSettings as any).liveFareAudit,
            problemJourneyPublic: (mongoSettings as any).problemJourneyPublic,
            systemNotice: (mongoSettings as any).systemNotice
          };
        }
      }
    } catch (err) {
      console.warn('MongoDB query settings failed:', err);
    }
    return this.getSettings();
  }

  public static getSettings(): SystemSettings {
    return this.readDb().settings;
  }

  public static async updateSettingsAsync(newSettings: Partial<SystemSettings>): Promise<SystemSettings> {
    const updated = this.updateSettings(newSettings);
    try {
      const db = await connectToDatabase();
      if (db && Settings) {
        await Settings.findOneAndUpdate(
          { key: 'global' },
          { $set: newSettings },
          { upsert: true, new: true }
        );
      }
    } catch (err) {
      console.warn('MongoDB update settings failed:', err);
    }
    return updated;
  }

  public static updateSettings(newSettings: Partial<SystemSettings>): SystemSettings {
    const db = this.readDb();
    db.settings = { ...db.settings, ...newSettings };
    this.writeDb(db);
    return db.settings;
  }

  public static async getUploadLogsAsync(): Promise<UploadLog[]> {
    try {
      const db = await connectToDatabase();
      if (db && UploadLogModel) {
        const mongoLogs = await UploadLogModel.find({}).sort({ timestamp: -1 }).lean();
        if (mongoLogs && mongoLogs.length > 0) {
          return mongoLogs.map((l: any) => ({
            id: l.logId || l._id.toString(),
            filename: l.filename,
            uploadedBy: l.uploadedBy,
            timestamp: l.timestamp ? new Date(l.timestamp).toISOString() : new Date().toISOString(),
            type: l.type,
            recordCount: l.recordCount
          }));
        }
      }
    } catch (err) {
      console.warn('MongoDB query upload logs failed:', err);
    }
    return this.getUploadLogs();
  }

  public static getUploadLogs(): UploadLog[] {
    return this.readDb().uploadLogs || [];
  }
}
