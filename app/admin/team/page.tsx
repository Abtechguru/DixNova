"use client"
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check, 
  Sparkles,
  ExternalLink,
  Loader2
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  skills: string[];
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [skillsInput, setSkillsInput] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/team');
      const data = await res.json();
      if (data.success) {
        setMembers(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setRole('');
    setBio('');
    setPhotoUrl('');
    setSkillsInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setBio(member.bio);
    setPhotoUrl(member.photoUrl);
    setSkillsInput(member.skills.join(', '));
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setPhotoUrl(data.url);
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      alert('Name and Role are required.');
      return;
    }

    const skillsArray = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      name,
      role,
      bio,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      skills: skillsArray
    };

    try {
      setSubmitting(true);
      let res;
      if (editingId) {
        res = await fetch(`/api/admin/team/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/admin/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchMembers();
      } else {
        alert(data.error || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving team member');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchMembers();
      } else {
        alert(data.error || 'Failed to delete');
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
            <Users className="text-emerald-400" />
            <span>Manage Team Members & Pictures</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add team profiles, upload headshots/pictures, and update roles displayed on the public website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Roster Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 space-y-3">
          <Loader2 size={32} className="animate-spin mx-auto text-emerald-400" />
          <p className="text-xs">Loading team roster...</p>
        </div>
      ) : members.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-3xl space-y-3">
          <Users size={36} className="mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-white">No Team Members Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click "Add Team Member" above to create your first team profile with custom picture upload.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shrink-0 bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-all"
                      title="Edit Member"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-red-400 hover:bg-slate-700 transition-all"
                      title="Delete Member"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{member.name}</h3>
                  <p className="text-xs font-semibold text-emerald-400">{member.role}</p>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  "{member.bio}"
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {member.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles size={20} className="text-emerald-400" />
                <span>{editingId ? 'Edit Team Member' : 'Add New Team Member'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Picture Upload Area */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300">
                  Profile Picture / Headshot
                </label>
                <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-400/80 shrink-0 bg-slate-900 flex items-center justify-center">
                    {photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={28} className="text-slate-600" />
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 cursor-pointer transition-all">
                      {uploadingImage ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Uploading Picture...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={14} />
                          <span>Upload Picture File</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>

                    <p className="text-[11px] text-slate-500">
                      Or paste an existing image URL below:
                    </p>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Vanessa Kirby"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">Role / Position *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Data Scientist"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">Short Bio</label>
                <textarea
                  rows={3}
                  placeholder="Describe key responsibilities and impact..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Power BI, DAX, Python, SQL Server"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{editingId ? 'Save Changes' : 'Create Member'}</span>
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
