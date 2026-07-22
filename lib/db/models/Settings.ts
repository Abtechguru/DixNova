let mongoose: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  mongoose = require('mongoose');
} catch (e) {
  // mongoose package not installed in node_modules yet
}

export interface ISettings {
  key: string;
  telemetryEnabled: boolean;
  teamAutoPlay: boolean;
  maintenanceAlerts: boolean;
  liveFareAudit: boolean;
  problemJourneyPublic: boolean;
  systemNotice: string;
}

let SettingsModel: any = null;

if (mongoose) {
  const SettingsSchema = new mongoose.Schema(
    {
      key: { type: String, default: 'global', unique: true },
      telemetryEnabled: { type: Boolean, default: true },
      teamAutoPlay: { type: Boolean, default: true },
      maintenanceAlerts: { type: Boolean, default: true },
      liveFareAudit: { type: Boolean, default: true },
      problemJourneyPublic: { type: Boolean, default: true },
      systemNotice: { type: String, default: 'DixNova Telemetry Realtime Engine Active' }
    },
    { timestamps: true }
  );

  SettingsModel = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
}

export default SettingsModel;
