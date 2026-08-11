import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone} from 'lucide-react';

export default function DashboardShowcase() {
  const [device, setDevice] = useState('desktop');

  return (
    <section id="showcase-device" className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          DASHBOARD SHOWCASE
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          HISPAN adapts dynamically to enterprise workstations, field tablets, and mobile manager screens.
        </p>

        {/* Device Mode Switcher Buttons */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-slate-100 border border-slate-200 mb-12">
          <button
            onClick={() => setDevice('desktop')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              device === 'desktop'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Desktop Workstation</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              device === 'tablet'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span>Plant Tablet</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              device === 'mobile'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Manager Mobile</span>
          </button>
        </div>

        {/* Device Frame Display Container */}
        <div className="flex justify-center items-center min-h-[500px]">
          {device === 'desktop' && (
            <div 
              className="w-full max-w-5xl bg-white p-3 rounded-2xl border border-slate-300 transition-all"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-t-xl mb-2">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="text-[11px] font-mono text-slate-400 ml-4">HISPAN Enterprise Desktop // 2560x1440</span>
              </div>
              <img src="/assets/hero_dashboard.png" alt="Desktop View" className="w-full h-auto rounded-lg" />
            </div>
          )}

          {device === 'tablet' && (
            <div 
              className="w-[720px] bg-slate-900 p-4 rounded-[32px] border-4 border-slate-800 transition-all"
            >
              <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-3"></div>
              <img src="/assets/hero_dashboard.png" alt="Tablet View" className="w-full h-auto rounded-2xl" />
            </div>
          )}

          {device === 'mobile' && (
            <div 
              className="w-[340px] bg-slate-900 p-3 rounded-[40px] border-4 border-slate-800 transition-all"
            >
              <div className="w-16 h-4 bg-black rounded-b-xl mx-auto mb-2"></div>
              <img src="/assets/utility_monitoring.png" alt="Mobile View" className="w-full h-auto rounded-[28px]" />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
