"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-950/80 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-xl shadow-black/20' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size="sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">Dix<span className="text-emerald-400">Nova</span></span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Enterprise</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider font-medium">Innovation driven by data</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link href="/team" className="hover:text-white transition-colors">Our Team</Link>
          <Link href="/problem-statement" className="hover:text-white transition-colors">Problem Journey</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Command Center</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="gradient" size="sm" className="gap-2">
              <BarChart3 size={15} />
              Open Command Center
              <ChevronRight size={14} />
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-slate-300 hover:text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
