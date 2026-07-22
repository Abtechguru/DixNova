"use client"
import React from 'react';
import { CollapsibleSidebar } from './CollapsibleSidebar';

interface PresentationLayoutProps {
  children: React.ReactNode;
}

export function PresentationLayout({ children }: PresentationLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-navy-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Collapsible / Expandable Sidebar */}
      <CollapsibleSidebar />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
