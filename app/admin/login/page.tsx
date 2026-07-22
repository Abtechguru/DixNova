"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  KeyRound, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import bgImg from '@/app/public/bg.jpg';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('dixnova@admin');
  const [password, setPassword] = useState('dixnova');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        // Store session flag
        localStorage.setItem('dixnova_admin_user', JSON.stringify(data.user));
        document.cookie = `dixnova_admin_session=authenticated; path=/; max-age=${60 * 60 * 24 * 7}`;
        
        setTimeout(() => {
          router.push('/admin');
        }, 800);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setUsername('dixnova@admin');
    setPassword('dixnova');
    setError('');
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src={bgImg}
          alt="DixNova Admin Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-xl group-hover:scale-105 transition-transform bg-slate-900">
              <Image
                src={bgImg}
                alt="DixNova Logo"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <span className="text-3xl font-black tracking-tight text-white">
                Dix<span className="text-emerald-400">Nova</span>
              </span>
              <p className="text-[10px] text-emerald-300 font-bold tracking-widest uppercase">
                Admin Control Portal
              </p>
            </div>
          </Link>

          <h1 className="text-2xl font-black text-white pt-2">
            Administrator Authentication
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to manage datasets, problem statements, team members, and telemetry settings.
          </p>
        </div>

        {/* Credentials Info Badge */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <KeyRound size={16} className="text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold">Default Admin Credentials</p>
              <p className="text-[11px] text-emerald-200 font-mono">User: dixnova@admin • Pass: dixnova</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillCredentials}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-400 transition-colors cursor-pointer shrink-0"
          >
            Auto Fill
          </button>
        </div>

        {/* Form Container */}
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
          
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              <span>Authentication successful! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                Admin Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="dixnova@admin"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Sign In to Admin Hub</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-slate-400 hover:text-emerald-400 transition-colors">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
