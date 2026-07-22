"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Layers, 
  Menu, 
  X, 
  CheckCircle2, 
  Star, 
  Home, 
  Users, 
  Building2, 
  FileText, 
  Target, 
  Database, 
  Eraser, 
  BarChart3, 
  TrendingUp, 
  CheckCheck, 
  Rocket, 
  Send
} from 'lucide-react';

export interface EvaluationStep {
  id: number;
  title: string;
  href: string;
  icon: any;
  star?: boolean;
  category: 'Strategic Alignment' | 'Technical Deep Dive';
}

export const EVALUATION_STEPS: EvaluationStep[] = [
  { id: 1, title: 'Landing Page', href: '/', icon: Home, category: 'Strategic Alignment' },
  { id: 2, title: 'Team (DixNova)', href: '/team', icon: Users, category: 'Strategic Alignment' },
  { id: 3, title: 'About SmartMove Nigeria', href: '/about-smartmove', icon: Building2, category: 'Strategic Alignment' },
  { id: 4, title: 'Problem Statement', href: '/problem-statement', icon: FileText, category: 'Strategic Alignment' },
  { id: 5, title: 'Executive Summary ⭐', href: '/executive-summary', icon: Star, star: true, category: 'Strategic Alignment' },
  { id: 6, title: 'Project Objectives', href: '/objectives', icon: Target, category: 'Strategic Alignment' },
  { id: 7, title: 'Our Solution', href: '/solution', icon: Layers, category: 'Strategic Alignment' },
  
  { id: 8, title: 'Dataset Overview', href: '/dataset-overview', icon: Database, category: 'Technical Deep Dive' },
  { id: 9, title: 'Data Preparation', href: '/data-preparation', icon: Eraser, category: 'Technical Deep Dive' },
  { id: 10, title: 'Data Modeling', href: '/data-modeling', icon: Layers, category: 'Technical Deep Dive' },
  { id: 11, title: 'KPI Framework', href: '/kpi-framework', icon: BarChart3, category: 'Technical Deep Dive' },
  { id: 12, title: 'Dashboard Walkthrough', href: '/dashboard', icon: BarChart3, category: 'Technical Deep Dive' },
  { id: 13, title: 'Insights', href: '/dashboard/insights', icon: TrendingUp, category: 'Technical Deep Dive' },
  { id: 14, title: 'Recommendations', href: '/recommendations', icon: CheckCheck, category: 'Technical Deep Dive' },
  { id: 15, title: 'Business Impact', href: '/business-impact', icon: TrendingUp, category: 'Technical Deep Dive' },
  { id: 16, title: 'Future Roadmap', href: '/roadmap', icon: Rocket, category: 'Technical Deep Dive' },
  { id: 17, title: 'Contact / Thank You', href: '/contact', icon: Send, category: 'Technical Deep Dive' },
];

export function JudgesNavigation() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentStepIndex = EVALUATION_STEPS.findIndex(step => {
    if (step.href === '/') return pathname === '/';
    return pathname.startsWith(step.href);
  });

  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;
  const currentStep = EVALUATION_STEPS[activeIndex];
  const prevStep = activeIndex > 0 ? EVALUATION_STEPS[activeIndex - 1] : null;
  const nextStep = activeIndex < EVALUATION_STEPS.length - 1 ? EVALUATION_STEPS[activeIndex + 1] : null;

  return (
    <>
      {/* Floating Top Judges Banner */}
      <div className="bg-slate-900/95 border-b border-amber-500/40 text-slate-100 px-4 py-2.5 sticky top-0 z-40 backdrop-blur-md font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Active Step Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span>JUDGES EVALUATION FLOW ({activeIndex + 1}/17)</span>
              <Menu size={14} className="ml-1" />
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="text-slate-400">Step {currentStep.id}:</span>
              <span className="font-black text-white flex items-center gap-1">
                {currentStep.title}
                {currentStep.star && <Star size={14} className="text-amber-400 fill-amber-400" />}
              </span>
            </div>
          </div>

          {/* Stepper Controls: Previous / Next Step */}
          <div className="flex items-center gap-2">
            {prevStep ? (
              <Link href={prevStep.href}>
                <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1 border border-slate-700 transition-all cursor-pointer">
                  <ChevronLeft size={14} />
                  <span className="hidden sm:inline">Prev</span>
                </button>
              </Link>
            ) : null}

            {nextStep ? (
              <Link href={nextStep.href}>
                <button className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-amber-500/20 transition-all cursor-pointer">
                  <span>Next Step →</span>
                  <ChevronRight size={14} />
                </button>
              </Link>
            ) : (
              <Link href="/contact">
                <button className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg transition-all cursor-pointer">
                  <span>Final Step: Contact</span>
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${((activeIndex + 1) / EVALUATION_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Full 17-Step Evaluation Modal / Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex justify-end animate-in fade-in duration-300 font-sans">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  FULL EVALUATION MAP
                </span>
                <h3 className="text-lg font-black text-white">17-Step Evaluation Flow</h3>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Strategic Alignment Steps (1-7) */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                PART 1: STRATEGIC ALIGNMENT (STEPS 1 - 7)
              </span>
              <div className="space-y-1">
                {EVALUATION_STEPS.slice(0, 7).map((step) => {
                  const Icon = step.icon;
                  const isActive = step.id === currentStep.id;

                  return (
                    <Link key={step.id} href={step.href} onClick={() => setDrawerOpen(false)}>
                      <div className={`p-3 rounded-xl flex items-center justify-between text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold' 
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-slate-500 font-bold w-5">{step.id}.</span>
                          <Icon size={16} className={isActive ? 'text-amber-400' : 'text-slate-400'} />
                          <span>{step.title}</span>
                        </div>
                        {step.star && <Star size={14} className="text-amber-400 fill-amber-400 shrink-0" />}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Technical Deep Dive Steps (8-17) */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
                PART 2: TECHNICAL DEEP DIVE (STEPS 8 - 17)
              </span>
              <div className="space-y-1">
                {EVALUATION_STEPS.slice(7).map((step) => {
                  const Icon = step.icon;
                  const isActive = step.id === currentStep.id;

                  return (
                    <Link key={step.id} href={step.href} onClick={() => setDrawerOpen(false)}>
                      <div className={`p-3 rounded-xl flex items-center justify-between text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' 
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-slate-500 font-bold w-5">{step.id}.</span>
                          <Icon size={16} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
                          <span>{step.title}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
