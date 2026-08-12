import React, { useState, useEffect, useRef } from 'react';
import { Layers, Factory, Zap, LineChart, Settings, Package, PieChart } from 'lucide-react';

export default function AboutProject() {
  const [scrollY, setScrollY] = useState(0);
  const [scale, setScale] = useState(0.95);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setScrollY(window.scrollY);
        
        if (imageRef.current) {
          const rect = imageRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Calculate progress from 0 (just entering bottom) to 1 (center of screen)
          const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight * 0.8), 0), 1);
          // Scale from 1.01 up to 1.05 (subtle slow zoom, bleeds edges slightly to prevent tearing)
          setScale(1.01 + (progress * 0.04));
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle parallax effect
  const imageTranslateY = (scrollY - 1200) * 0.04;

  return (
    <>
      <section id="overview" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header & Copy — Two-column editorial layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-0">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              The Thinking Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 italic">Hispan</span>
            </h2>
          </div>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            <p>
              At its core, Hispan is about bringing every moving part of manufacturing into one place. From production and inventory to utilities, machine complaints, wastage, and reporting, the platform connects essential operations into a seamless experience—making complex processes easier to manage and giving teams a clearer picture of the bigger operation.
            </p>
          </div>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="mt-24 md:mt-32 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 lg:gap-x-20 text-left">
          
          {/* Card 01 */}
          <div className="flex flex-col items-start group cursor-default hover:-translate-y-2 transition-all duration-300">
            <Factory className="w-6 h-6 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <h3 className="text-[15px] lg:text-base font-bold text-slate-900 mb-4 tracking-tight uppercase">MULTI-FACTORY OPERATIONS</h3>
            <p className="text-[14px] lg:text-[15px] text-slate-500 leading-relaxed font-normal">
              Centralized management of multiple manufacturing facilities with clear visibility into factory-specific operations, costs, and performance.
            </p>
          </div>

          {/* Card 02 */}
          <div className="flex flex-col items-start group cursor-default hover:-translate-y-2 transition-all duration-300">
            <Zap className="w-6 h-6 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <h3 className="text-[15px] lg:text-base font-bold text-slate-900 mb-4 tracking-tight uppercase">UTILITY MONITORING</h3>
            <p className="text-[14px] lg:text-[15px] text-slate-500 leading-relaxed font-normal">
              Detailed monitoring of electricity, diesel, water, gas, and solar consumption across factory operations.
            </p>
          </div>

          {/* Card 03 */}
          <div className="flex flex-col items-start group cursor-default hover:-translate-y-2 transition-all duration-300">
            <LineChart className="w-6 h-6 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <h3 className="text-[15px] lg:text-base font-bold text-slate-900 mb-4 tracking-tight uppercase">PRODUCTION & WASTAGE</h3>
            <p className="text-[14px] lg:text-[15px] text-slate-500 leading-relaxed font-normal">
              Better visibility into mix production and product wastage through production tracking, performance monitoring, and threshold-based alerts.
            </p>
          </div>

          {/* Card 04 */}
          <div className="flex flex-col items-start group cursor-default hover:-translate-y-2 transition-all duration-300">
            <Settings className="w-6 h-6 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <h3 className="text-[15px] lg:text-base font-bold text-slate-900 mb-4 tracking-tight uppercase">MACHINE COMPLAINTS</h3>
            <p className="text-[14px] lg:text-[15px] text-slate-500 leading-relaxed font-normal">
              A structured process for raising, assigning, tracking, and resolving machine-related complaints across factory operations.
            </p>
          </div>

          {/* Card 05 */}
          <div className="flex flex-col items-start group cursor-default hover:-translate-y-2 transition-all duration-300">
            <Package className="w-6 h-6 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <h3 className="text-[15px] lg:text-base font-bold text-slate-900 mb-4 tracking-tight uppercase">INVENTORY & SPARES</h3>
            <p className="text-[14px] lg:text-[15px] text-slate-500 leading-relaxed font-normal">
              Centralized management of spare parts, purchase orders, stock availability, and inventory movement throughout the spares lifecycle.
            </p>
          </div>

          {/* Card 06 */}
          <div className="flex flex-col items-start group cursor-default hover:-translate-y-2 transition-all duration-300">
            <PieChart className="w-6 h-6 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <h3 className="text-[15px] lg:text-base font-bold text-slate-900 mb-4 tracking-tight uppercase">OPERATIONAL INSIGHTS</h3>
            <p className="text-[14px] lg:text-[15px] text-slate-500 leading-relaxed font-normal">
              Role-specific dashboards, reports, and AI-powered analytics that turn factory data into clear and actionable operational insights.
            </p>
          </div>

        </div>
        </div>
      </section>

      <section className="py-16 bg-[#FAFAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Full-width Screenshot - Static */}
        <div className="max-w-6xl mx-auto relative" ref={imageRef}>
          <div className="relative overflow-hidden bg-white">
            <div>
              <img 
                src="/factory_management.png" 
                alt="HISPAN Multi-Factory Management View" 
                className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover object-[center_38%] contrast-110 saturate-75"
                loading="lazy"
              />
            </div>
            {/* Sky Bleach Overlay - Extended 2px upwards to prevent sub-pixel tearing during scroll */}
            <div className="absolute inset-x-0 -top-[2px] h-[calc(4rem+2px)] bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>

          </div>
        </div>

      </div>
    </section>
    </>
  );
}
