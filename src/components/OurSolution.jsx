import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ShieldCheck, Zap, Activity, Cpu, Bot, FileSpreadsheet, Bell, Lock, Maximize2 } from 'lucide-react';

export default function OurSolution() {
  const [expandProgress, setExpandProgress] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
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

        // Calculate Parallax Offset
        const centerOffset = (windowHeight / 2) - (rect.top + rect.height / 2);
        setParallaxOffset(centerOffset * 0.15); // Adjust multiplier for stronger/weaker effect
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="solution" className="pt-32 lg:pt-48 pb-12 bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 lg:mb-24">
        
        {/* Header and Statements - Two-column editorial layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              The <span className="text-emerald-500 italic">Making</span>
            </h2>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-4">
              Hispan delivers a unified enterprise platform that centralizes every critical manufacturing operation into <span className="text-emerald-500 italic">a single intelligent dashboard</span>.
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              The platform combines operational monitoring, inventory workflows, analytics, reporting, secure role management, and AI-powered insights to help organizations improve operational efficiency and maintain complete visibility across all production facilities.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Expansion Animation */}
      <div ref={sectionRef} className="w-full flex justify-center">
        <div 
          className="w-full overflow-hidden will-change-transform bg-emerald-950"
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
            className="w-full h-auto object-cover drop-shadow-2xl transition-transform duration-75 ease-linear will-change-transform"
            style={{
              // We scale it up slightly so when it moves up/down it doesn't reveal hard edges, 
              // creating a classic parallax window effect.
              transform: `scale(1.1) translateY(${parallaxOffset}px)`
            }}
          />
        </div>
      </div>
    </section>
  );
}
