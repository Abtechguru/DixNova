import * as React from "react"
import Link from "next/link"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/lib/utils/icons"

export default function ExecutiveSummaryStoryPage() {
  return (
    <PublicLayout>
      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-8 flex-1 flex flex-col justify-between">
        
        {/* TOP HERO HEADER WITH DIX0.JPEG BACKGROUND */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-surface shadow-2xl p-6 md:p-10 flex flex-col justify-end min-h-[220px] md:min-h-[280px]">
          <img
            src="/dix0.jpeg"
            alt="DixNova Executive Summary Backdrop"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.3] scale-105 transform-gpu -z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/60 to-transparent -z-10" />

          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider">
                Group 10 Hackathon Submission
              </Badge>
              <Badge variant="outline" className="bg-black/60 backdrop-blur-md text-white border-white/30 text-xs font-mono">
                Data Coverage: January 2022 – December 2024
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight drop-shadow-md">
              DIXNOVA Executive Summary
            </h1>
            <p className="text-sm md:text-base text-gray-200 max-w-3xl font-sans drop-shadow">
              Unified Decision Intelligence & Operational Analytics Platform for Lagos State Transport Authorities
            </p>
          </div>
        </div>

        {/* MAIN EXECUTIVE SUMMARY TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: AT A GLANCE & KEY METRICS (Inspired by reference sheet) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* KEY METRICS CARD */}
            <div className="rounded-2xl border border-primary/30 bg-card p-6 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 border-b border-surface pb-3">
                <Icons.dashboard className="h-5 w-5 text-primary" />
                <h3 className="font-display font-extrabold text-base text-foreground uppercase tracking-wider">
                  AT A GLANCE
                </h3>
              </div>

              <div className="space-y-5">
                <div className="border-b border-surface/50 pb-3">
                  <span className="text-2xl md:text-3xl font-display font-black text-primary block">
                    3 YEARS
                  </span>
                  <span className="text-xs font-semibold text-foreground">Historical Data Analysis</span>
                  <p className="text-[11px] text-foreground-secondary pt-0.5">Jan 2022 – Dec 2024 continuous records</p>
                </div>

                <div className="border-b border-surface/50 pb-3">
                  <span className="text-2xl md:text-3xl font-display font-black text-primary block">
                    5 DATASETS
                  </span>
                  <span className="text-xs font-semibold text-foreground">Integrated Transit Tables</span>
                  <p className="text-[11px] text-foreground-secondary pt-0.5">Trips, Maintenance, Tickets, Routes & Fleet</p>
                </div>

                <div className="border-b border-surface/50 pb-3">
                  <span className="text-2xl md:text-3xl font-display font-black text-primary block">
                    11,500+
                  </span>
                  <span className="text-xs font-semibold text-foreground">Records Profiled & Cleansed</span>
                  <p className="text-[11px] text-foreground-secondary pt-0.5">Automated 6-dimension quality validation</p>
                </div>

                <div>
                  <span className="text-2xl md:text-3xl font-display font-black text-primary block flex items-center gap-2">
                    <Icons.powerbi className="h-6 w-6 text-amber-500 inline" /> Power BI
                  </span>
                  <span className="text-xs font-semibold text-foreground">DAX Analytics Engine</span>
                  <p className="text-[11px] text-foreground-secondary pt-0.5">Star-schema modeling & interactive dashboards</p>
                </div>
              </div>
            </div>

            {/* STAKEHOLDERS & SCOPE CARD */}
            <div className="rounded-2xl border border-surface bg-card p-6 space-y-4 shadow-md">
              <div className="flex items-center gap-2 border-b border-surface pb-3">
                <Icons.users className="h-4 w-4 text-primary" />
                <h4 className="font-display font-bold text-xs uppercase text-foreground">
                  Key Stakeholders
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-foreground-secondary">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span><strong>Primary Sponsor:</strong> Lagos State Ministry of Transport</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span><strong>Target Operators:</strong> BRT & Interstate Bus Regulators</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span><strong>Hackathon Lead:</strong> Team DixNova (Group 10)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: EXECUTIVE SUMMARY SECTIONS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. PROJECT OVERVIEW */}
            <div className="rounded-2xl border border-surface bg-card p-6 md:p-8 space-y-3 shadow-soft hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                  01
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
                  Project Overview
                </h3>
              </div>
              <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed pl-11">
                This project analyzes three years of operational data across five linked datasets — daily trips, maintenance records, ticket transactions, bus routes and fleet — to give transport authorities a single, unified view of service performance. The project cleans and validates over 11,500 operational records, then models and visualizes them in Power BI to surface actionable insights across passenger demand, fleet utilization, revenue performance, maintenance trends, and route efficiency.
              </p>
            </div>

            {/* 2. BUSINESS CHALLENGE */}
            <div className="rounded-2xl border border-surface bg-card p-6 md:p-8 space-y-3 shadow-soft border-l-4 border-l-rose-500 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold text-xs">
                  02
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
                  Business Challenge
                </h3>
              </div>
              <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed pl-11">
                The transport information remains fragmented across separate systems. Planners lack visibility into overall service performance and cannot optimize fleet deployment or reduce operating costs effectively. Traffic congestion, inconsistent demand, and vehicle breakdowns compound the problem, contributing to service delays, higher operating expenses, and declining passenger satisfaction.
              </p>
            </div>

            {/* 3. SOLUTION SUMMARY */}
            <div className="rounded-2xl border border-surface bg-card p-6 md:p-8 space-y-3 shadow-soft border-l-4 border-l-emerald-500 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold text-xs">
                  03
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
                  Solution Summary
                </h3>
              </div>
              <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed pl-11">
                The project delivers an end-to-end analytics solution. Source data is profiled and cleaned, then modeled in Power BI. DAX measures translate the raw records into KPIs of revenue, on-time rate, fleet utilization, maintenance cost, etc — which power our interactive dashboard followed by recommendations for transport authority decision-making.
              </p>
            </div>

            {/* 4. WORKFLOW DIAGRAM */}
            <div className="rounded-2xl border border-surface bg-card p-6 md:p-8 space-y-4 shadow-soft">
              <div className="flex items-center justify-between border-b border-surface pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                    04
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
                    Workflow Diagram
                  </h3>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">PIPELINE STEPS</Badge>
              </div>

              {/* Step Pipeline Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                {[
                  { step: "STEP 1", title: "Source Data Ingestion", desc: "Trips, Tickets, Maintenance, Routes, Fleet" },
                  { step: "STEP 2", title: "Profile & Clean", desc: "11,500+ records validated & deduplicated" },
                  { step: "STEP 3", title: "Power BI & DAX", desc: "Star-schema model & calculated KPI measures" },
                  { step: "STEP 4", title: "Interactive Control", desc: "Dashboard insights & decision proposals" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-surface bg-surface/30 space-y-1.5 relative group hover:border-primary/50 transition-all">
                    <span className="text-[10px] font-mono font-bold text-primary">{item.step}</span>
                    <h4 className="text-xs font-bold text-foreground font-display">{item.title}</h4>
                    <p className="text-[11px] text-foreground-secondary leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. CALL TO ACTION */}
            <div className="rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/10 via-card to-card p-6 md:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-md">
                  ★
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
                  Call to Action
                </h3>
              </div>
              <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed pl-11">
                We invite transport authorities and hackathon partners to review the accompanying dashboard and detailed insights report, and to support a pilot rollout of this analytics framework across a subset of high-value corridors (starting with Express routes and Lagos Mainland LGA).
              </p>
              
              <div className="pl-11 pt-2 flex flex-wrap items-center gap-3">
                <Button size="sm" asChild className="text-xs font-bold">
                  <Link href="/p/powerbi-dashboards">
                    <Icons.powerbi className="mr-1.5 h-3.5 w-3.5" /> Launch Power BI Control Room
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="text-xs">
                  <Link href="/p/problem-statement">
                    Next Chapter: Problem Statement ↗
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* PAGE NAVIGATION FOOTER */}
        <PageNavigationFooter 
          prevTitle="Opening Story"
          prevSlug="/p/bigger-reality"
          nextTitle="Problem Statement"
          nextSlug="/p/problem-statement"
        />
      </div>
    </PublicLayout>
  )
}
