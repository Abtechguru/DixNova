"use client"
import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Check, 
  Loader2, 
  ShieldAlert, 
  Bell, 
  Zap, 
  Play, 
  Lock,
  Save
} from 'lucide-react';

interface SystemSettings {
  telemetryEnabled: boolean;
  teamAutoPlay: boolean;
  maintenanceAlerts: boolean;
  liveFareAudit: boolean;
  problemJourneyPublic: boolean;
  systemNotice: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    telemetryEnabled: true,
    teamAutoPlay: true,
    maintenanceAlerts: true,
    liveFareAudit: true,
    problemJourneyPublic: true,
    systemNotice: 'DixNova Telemetry Realtime Engine Active'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key: keyof SystemSettings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
          <Sliders className="text-amber-400" />
          <span>General Controls & Platform Settings</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure feature flags, toggle operational modules, and update system notices.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 space-y-3">
          <Loader2 size={32} className="animate-spin mx-auto text-amber-400" />
          <p className="text-xs">Loading platform settings...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Feature Toggles Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white tracking-tight">Feature Flags & Module Switches</h3>

            <div className="space-y-4 divide-y divide-slate-800/60">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between pt-4 first:pt-0">
                <div className="space-y-0.5 max-w-lg">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-emerald-400" />
                    <span className="text-sm font-bold text-white">Realtime Telemetry Simulation</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Generates dynamic bus speed and passenger occupancy fluctuations across corridors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('telemetryEnabled')}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center cursor-pointer ${
                    settings.telemetryEnabled ? 'bg-emerald-500 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5 max-w-lg">
                  <div className="flex items-center gap-2">
                    <Play size={16} className="text-blue-400" />
                    <span className="text-sm font-bold text-white">Team Member Auto-Play Slideshow</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Automatically transitions through team profiles every 3.5 seconds on `/team`.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('teamAutoPlay')}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center cursor-pointer ${
                    settings.teamAutoPlay ? 'bg-emerald-500 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5 max-w-lg">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-amber-400" />
                    <span className="text-sm font-bold text-white">Preventive Maintenance Alerts</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Shows predictive engine thermal warnings in executive command center insights.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('maintenanceAlerts')}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center cursor-pointer ${
                    settings.maintenanceAlerts ? 'bg-emerald-500 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {/* Toggle 4 */}
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5 max-w-lg">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={16} className="text-purple-400" />
                    <span className="text-sm font-bold text-white">Automated Live Fare Audit</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Monitors digital ticketing vs cash collection discrepancies on Lagos BRT lines.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('liveFareAudit')}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center cursor-pointer ${
                    settings.liveFareAudit ? 'bg-emerald-500 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>
            </div>
          </div>

          {/* System Notice Banner Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white tracking-tight">System Notice Banner</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Global Admin Notice</label>
              <input
                type="text"
                value={settings.systemNotice}
                onChange={(e) => setSettings(prev => ({ ...prev, systemNotice: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                <Check size={16} />
                <span>Settings saved successfully!</span>
              </span>
            ) : <span />}

            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 text-white font-bold text-xs flex items-center gap-2.5 shadow-xl shadow-amber-500/20 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
