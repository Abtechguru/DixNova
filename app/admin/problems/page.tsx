"use client"
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
  Loader2, 
  Users, 
  DollarSign, 
  Clock, 
  Bus, 
  Database, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface ProblemStep {
  id: number;
  title: string;
  category: string;
  description: string;
  details?: string[];
  iconName: string;
  color: string;
  badgeColor: string;
}

const AVAILABLE_ICONS = ['Users', 'DollarSign', 'Clock', 'Bus', 'Database', 'CheckCircle2', 'AlertTriangle'];

export default function AdminProblemsPage() {
  const [problems, setProblems] = useState<ProblemStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [detailsInput, setDetailsInput] = useState('');
  const [iconName, setIconName] = useState('AlertTriangle');
  const [color, setColor] = useState('from-blue-500 to-indigo-600');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/problems');
      const data = await res.json();
      if (data.success) {
        setProblems(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setCategory('');
    setDescription('');
    setDetailsInput('');
    setIconName('AlertTriangle');
    setColor('from-blue-500 to-indigo-600');
    setIsModalOpen(true);
  };

  const openEditModal = (problem: ProblemStep) => {
    setEditingId(problem.id);
    setTitle(problem.title);
    setCategory(problem.category);
    setDescription(problem.description);
    setDetailsInput(problem.details ? problem.details.join('\n') : '');
    setIconName(problem.iconName || 'AlertTriangle');
    setColor(problem.color || 'from-blue-500 to-indigo-600');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !description.trim()) {
      alert('Title, category, and description are required.');
      return;
    }

    const detailsArray = detailsInput
      .split('\n')
      .map(d => d.trim())
      .filter(Boolean);

    const payload = {
      title: title.toUpperCase(),
      category,
      description,
      details: detailsArray.length > 0 ? detailsArray : undefined,
      iconName,
      color,
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    };

    try {
      setSubmitting(true);
      let res;
      if (editingId !== null) {
        res = await fetch(`/api/admin/problems/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/admin/problems', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchProblems();
      } else {
        alert(data.error || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this problem section?')) return;
    try {
      const res = await fetch(`/api/admin/problems/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchProblems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <FileText className="text-purple-400" />
            <span>Problem Statement & Journey Sections</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, or reorganize problem challenges and solutions rendered on the public Problem Statement page.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-purple-600/20 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Problem Section</span>
        </button>
      </div>

      {/* Grid of Sections */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 space-y-3">
          <Loader2 size={32} className="animate-spin mx-auto text-purple-400" />
          <p className="text-xs">Loading problem statement sections...</p>
        </div>
      ) : problems.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-3xl space-y-3">
          <FileText size={36} className="mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-white">No Problem Sections Defined</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click "Add Problem Section" above to define challenges and solution milestones.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item, index) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between group hover:border-purple-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-purple-400">
                    Step {index + 1} • {item.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-purple-400 hover:bg-slate-700 transition-all"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-red-400 hover:bg-slate-700 transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-black text-white tracking-tight">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.description}</p>

                {item.details && item.details.length > 0 && (
                  <ul className="space-y-1 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                    {item.details.map((d, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles size={20} className="text-purple-400" />
                <span>{editingId ? 'Edit Section' : 'Add New Problem Section'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">Section Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. COMMUTER RUSH HOUR"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">Category Tag *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daily Origin"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize the bottleneck or solution step..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">
                  Bullet Points (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="No digital audit trail&#10;Cash handling vulnerability&#10;Underfunded transit budget"
                  value={detailsInput}
                  onChange={(e) => setDetailsInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">Icon Symbol</label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {AVAILABLE_ICONS.map((ic) => (
                      <option key={ic} value={ic}>{ic}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">Gradient Accent</label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="from-blue-500 to-indigo-600">Blue-Indigo</option>
                    <option value="from-red-500 to-amber-600">Red-Amber</option>
                    <option value="from-amber-500 to-orange-600">Amber-Orange</option>
                    <option value="from-purple-500 to-rose-600">Purple-Rose</option>
                    <option value="from-emerald-500 to-teal-600">Emerald-Teal</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{editingId ? 'Save Section' : 'Create Section'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
