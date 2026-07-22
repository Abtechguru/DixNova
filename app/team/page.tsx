"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ArrowRight
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Vanessa Kirby',
    role: 'Lead Data Scientist & DAX Architect',
    bio: 'Architect of DixNova GTFS data modeling, Power Query transformations, and predictive passenger demand forecasting.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    skills: ['Power BI', 'DAX', 'Python', 'SQL Server']
  },
  {
    id: '2',
    name: 'Olumide Adebayo',
    role: 'Senior Frontend & Telemetry Architect',
    bio: 'Enterprise Data Visualizations & Realtime Systems Specialist driving front-end UI excellence.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript']
  },
  {
    id: '3',
    name: 'Chidi Okafor',
    role: 'Transport Operations Lead',
    bio: 'Municipal Transit Analytics & Corridor Optimization Director focusing on Lagos BRT efficiency.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    skills: ['Transit Analytics', 'Fleet Telemetry', 'LAMATA Systems']
  },
  {
    id: '4',
    name: 'Fatima Bello',
    role: 'Product Strategy & UX Lead',
    bio: 'Public Transportation Design Systems & User Experience Architect creating accessible command centers.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    skills: ['Figma', 'UX Research', 'Design Systems']
  },
  {
    id: '5',
    name: 'Dr. Amina Yusuf',
    role: 'Senior Transit Policy Advisor',
    bio: 'Federal Ministry Transport Policy & Smart City Infrastructure Advisor overseeing national corridors.',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80',
    skills: ['Policy Strategy', 'Municipal Transit', 'Federal Standards']
  },
  {
    id: '6',
    name: 'Prof. Tunde Bakare',
    role: 'Data Infrastructure Advisor',
    bio: 'Big Data Architecture & Azure Cloud Integration Specialist providing high-capacity data lake frameworks.',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
    skills: ['Azure Data Lake', 'Fabric BI', 'Big Data']
  },
  {
    id: '7',
    name: 'Kemi Balogun',
    role: 'Financial Systems Advisor',
    bio: 'Automated Fare Collection & Revenue Audit Compliance Expert for digital ticketing systems.',
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&auto=format&fit=crop&q=80',
    skills: ['Fare Auditing', 'Digital Payments', 'Financial Control']
  }
];

export default function TeamPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    fetch('/api/admin/team')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setMembers(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const currentMember = members[currentIndex] || members[0] || teamMembers[0];
  const isLastMember = currentIndex === members.length - 1;

  const handleNext = () => {
    if (isLastMember) {
      router.push('/dashboard');
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      router.push('/problem-statement');
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= members.length - 1) {
          setIsPlaying(false);
          router.push('/dashboard');
          return prev;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlaying, router, members.length]);

  return (
    <div className="min-h-screen w-full bg-navy-950 text-slate-100 flex flex-col justify-between overflow-y-auto relative selection:bg-primary selection:text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_40%,rgba(16,185,129,0.12),transparent_100%)] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-30 px-8 py-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3">
          <Logo size="sm" />
          <div>
            <span className="text-2xl font-black tracking-tight text-white">Dix<span className="text-emerald-400">Nova</span></span>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Innovation driven by data</p>
          </div>
        </Link>

        {/* Play/Pause Auto Toggle & Counter */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            {isPlaying ? <Pause size={14} className="text-emerald-400" /> : <Play size={14} />}
            <span>{isPlaying ? 'Auto-Playing' : 'Paused'}</span>
          </button>
          
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-emerald-400">
            {currentIndex + 1} / {members.length}
          </span>
        </div>
      </header>

      {/* Main Big Photo & Details Center View */}
      <main className="relative z-20 flex-1 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full">
        
        {/* BIG Photo Display */}
        <div className="relative group shrink-0">
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] rounded-3xl overflow-hidden border-4 border-emerald-400/90 shadow-2xl shadow-emerald-500/25 group-hover:scale-[1.02] transition-transform duration-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={currentMember.photoUrl} 
              alt={currentMember.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Member Info */}
        <div className="space-y-6 max-w-lg text-center md:text-left">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest inline-block">
              DixNova Team
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {currentMember.name}
            </h2>
            <p className="text-lg font-bold text-emerald-400">
              {currentMember.role}
            </p>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            "{currentMember.bio}"
          </p>

          {/* Skills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
            {currentMember.skills.map((skill, idx) => (
              <span 
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-slate-300 shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* TWO MAIN CONTROL BUTTONS: GO BACK & NEXT */}
          <div className="flex items-center justify-center md:justify-start gap-4 pt-6">
            <button
              onClick={handlePrev}
              className="px-7 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 transition-all font-semibold text-sm flex items-center gap-2 shadow-xl active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
              <span>Go Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-500/60 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <span>{isLastMember ? "Launch Command Center" : "Next Member"}</span>
              {isLastMember ? <ArrowRight size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>

      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/40">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-emerald-400 font-semibold tracking-wide">Innovation driven by data</span>
      </footer>
    </div>
  );
}
