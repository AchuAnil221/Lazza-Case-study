import React from 'react';
import { TrendingUp, ShieldCheck, Zap, Cpu, Package, Wrench, Lock, Bot, LineChart } from 'lucide-react';

export default function BusinessImpact() {
  const outcomes = [
    { title: 'Centralized Factory Operations', desc: 'Unified multi-plant governance across Kochi, Calicut, and Trivandrum.', icon: ShieldCheck },
    { title: 'Improved Operational Visibility', desc: '100% real-time operational status transparency for plant directors.', icon: TrendingUp },
    { title: 'Unified Utility Monitoring', desc: 'Continuous tracking of electricity, diesel fuel, gas, water, and solar.', icon: Zap },
    { title: 'Streamlined Production Tracking', desc: 'Live line-level UPH gauges and automated filler speed optimization.', icon: Cpu },
    { title: 'Intelligent Inventory Management', desc: 'Spare part reorder triggers linked directly to plant maintenance schedules.', icon: Package },
    { title: 'Efficient Complaint Resolution', desc: 'Structured maintenance ticket lifecycle with automated technician routing.', icon: Wrench },
    { title: 'Secure Role-Based Access', desc: 'Granular permissions safeguarding operational and financial data.', icon: Lock },
    { title: 'AI-powered Operational Insights', desc: 'Natural language diagnostic queries reducing analysis time from hours to seconds.', icon: Bot },
    { title: 'Data-driven Decision Making', desc: 'Executive cross-factory yield metrics and automated compliance reporting.', icon: LineChart },
  ];

  return (
    <section id="impact" className="pt-24 lg:pt-32 pb-0 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header and Statements - Two-column editorial layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              The <span className="text-emerald-500 italic">Impact</span>
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              Hispan gave Lazza a stronger operational foundation for managing a growing manufacturing network.
            </p>
          </div>
          <div className="lg:pt-2">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We brought greater structure and visibility to everyday factory operations, helping teams work more consistently across facilities, respond to issues faster, and make decisions with a clearer understanding of overall performance. We also introduced AI-powered insights and centralized analytics to turn operational data into actionable intelligence, helping improve efficiency while maintaining complete visibility across production facilities. Together, these capabilities created a more connected and scalable way of working, giving Lazza the foundation to manage its growing manufacturing operations with greater confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
