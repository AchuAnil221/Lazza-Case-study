import React from 'react';
import { Building2, Gauge, LineChart, AlertOctagon, Wrench, Package, Bot, BarChart3, ArrowUpRight } from 'lucide-react';

export default function CorePlatformHighlights() {
  const platformFeatures = [
    {
      num: '01',
      title: 'Multi-Factory Management',
      desc: 'Manage multiple manufacturing facilities from one centralized platform while maintaining complete visibility into each factory’s operational data.',
      icon: Building2,
      tag: 'Multi-Site Stream',
      img: '/assets/hero_dashboard.png'
    },
    {
      num: '02',
      title: 'Utility Monitoring',
      desc: 'Monitor electricity, diesel, gas, water, and solar consumption using detailed meter-based tracking.',
      icon: Gauge,
      tag: 'Real-Time Meters',
      img: '/assets/utility_monitoring.png'
    },
    {
      num: '03',
      title: 'Production Monitoring',
      desc: 'Track production output, daily operations, and manufacturing performance through interactive dashboards.',
      icon: LineChart,
      tag: 'Batch Analytics',
      img: '/assets/production_monitoring.png'
    },
    {
      num: '04',
      title: 'Wastage Analysis',
      desc: 'Identify production wastage through automated monitoring and threshold-based alerts.',
      icon: AlertOctagon,
      tag: 'Automated Thresholds',
      img: '/assets/wastage_monitoring.png'
    },
    {
      num: '05',
      title: 'Machine Complaints',
      desc: 'Manage equipment issues through structured complaint registration, assignment, and resolution workflows.',
      icon: Wrench,
      tag: 'Maintenance Dispatch',
      img: '/assets/machine_complaints.png'
    },
    {
      num: '06',
      title: 'Inventory & Store',
      desc: 'Handle spare parts, purchase orders, inventory management, and stock movements within one integrated system.',
      icon: Package,
      tag: 'Spare Parts Reorder',
      img: '/assets/inventory_store.png'
    },
    {
      num: '07',
      title: 'AI Assistant',
      desc: 'Use natural language queries to retrieve operational insights and manufacturing analytics instantly.',
      icon: Bot,
      tag: 'NLP Query Engine',
      img: '/assets/ai_assistant.png'
    },
    {
      num: '08',
      title: 'Analytics Dashboard',
      desc: 'Monitor factory performance using interactive reports, charts, and operational KPIs.',
      icon: BarChart3,
      tag: 'Executive Reporting',
      img: '/assets/reports_analytics.png'
    },
  ];

  return (
    <section id="features" className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          CORE PLATFORM HIGHLIGHTS
        </h2>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="card-elevated p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-mono font-extrabold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200/60">
                      {item.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-sky-600 group-hover:text-white transition-all flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.tag}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
