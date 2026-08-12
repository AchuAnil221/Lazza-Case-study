import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ShieldCheck, Zap, Activity, Cpu, Bot, FileSpreadsheet, Bell, Lock, Maximize2 } from 'lucide-react';

export default function OurSolution() {
  const [expandProgress, setExpandProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress from bottom of screen to center
        const visibleAmount = windowHeight - rect.top;
        const totalDistance = windowHeight / 1.2; 
        
        let progress = 0;
        if (visibleAmount > 0) {
          progress = Math.min(visibleAmount / totalDistance, 1);
        }

        // Smooth easing for natural expansion
        const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        setExpandProgress(easeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="solution" className="pt-20 lg:pt-24 pb-12 bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 lg:mb-24">
        
        {/* Header and Statements Center Aligned */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            The <span className="text-sky-500 italic">Making</span>
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            Hispan delivers a unified enterprise platform that centralizes every critical manufacturing operation into <span className="text-sky-500 italic">a single intelligent dashboard</span>.
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            The platform combines operational monitoring, inventory workflows, analytics, reporting, secure role management, and AI-powered insights to help organizations improve operational efficiency and maintain complete visibility across all production facilities.
          </p>
        </div>
      </div>

      {/* Horizontal Expansion Animation */}
      <div ref={sectionRef} className="w-full flex justify-center">
        <div 
          className="w-full overflow-hidden will-change-transform bg-slate-900"
          style={{
            // Crops the left and right sides, expanding outward as you scroll
            clipPath: `inset(0% ${(1 - expandProgress) * 25}% 0% ${(1 - expandProgress) * 25}%)`,
            WebkitClipPath: `inset(0% ${(1 - expandProgress) * 25}% 0% ${(1 - expandProgress) * 25}%)`,
            // Slight scale pop to make the expansion feel physical
            transform: `scale(${0.9 + (expandProgress * 0.1)}) translateZ(0)`,
            WebkitTransform: `scale(${0.9 + (expandProgress * 0.1)}) translateZ(0)`
          }}
        >
          <img 
            src="/assets/laptop_mockup.png" 
            alt="Hispan Dashboard on Laptop" 
            className="w-full h-auto object-cover drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
