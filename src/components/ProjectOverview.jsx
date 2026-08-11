import React from 'react';
import { Building2, User, Monitor, Layers, CheckCircle2 } from 'lucide-react';

export default function ProjectOverview() {
  const metadata = [
    { label: 'Industry', value: 'Manufacturing (Ice Cream Facilities)', icon: Building2 },
    { label: 'Client', value: 'Lazza Ice Cream', icon: User },
    { label: 'Platform', value: 'Enterprise Web Application', icon: Monitor },
    { label: 'Project Type', value: 'Multi-Factory Operations Platform', icon: Layers },
  ];

  const services = [
    'Enterprise UI/UX Design',
    'Dashboard Design',
    'Information Architecture',
    'User Experience Design',
    'User Interface Design',
    'Responsive Web Design',
    'Design System',
    'Frontend Development',
    'Backend Development',
    'API Integration',
    'Data Visualization',
    'AI Integration',
    'Analytics Dashboard',
    'Performance Optimization',
    'Quality Assurance'
  ];

  return (
    <section id="overview" className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-12">
          PROJECT OVERVIEW
        </h2>

        {/* Top Metadata Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metadata.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="card-elevated p-6 rounded-2xl flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold mb-1">
                    {item.label}
                  </div>
                  <div className="text-lg font-bold text-slate-900 leading-snug">
                    {item.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Services Provided Chips Section */}
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            Services & Deliverables Provided
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-sm hover:border-sky-300 hover:text-sky-800 transition-colors"
              >
                {service}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
