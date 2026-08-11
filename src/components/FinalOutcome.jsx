import React from 'react';
import { ArrowRight, Maximize2, Sparkles, Layers } from 'lucide-react';

export default function FinalOutcome() {
  return (
    <section className="py-24 bg-[#FAFAFC] border-b border-slate-200/80 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        






        {/* Understated Portfolio CTA */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">

            <div className="text-sm font-semibold text-slate-800">
              HISPAN Multi-Factory Operations Platform for Lazza
            </div>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-slate-900 text-sm font-bold hover:text-sky-600 transition-colors"
          >
            <span>Explore another project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>



    </section>
  );
}
