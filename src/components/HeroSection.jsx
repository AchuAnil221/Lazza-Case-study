import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    // Load-in animation trigger
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Parallax scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPos(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Parallax Calculations ---
  // Background moves slowly downwards
  const bgTransform = `translate3d(0, ${scrollPos * 0.35}px, 0)`;
  
  // Subtle parallax translation without scale shrink
  const imageTransform = `translate3d(0, ${scrollPos * 0.05}px, 0)`;
  
  // Text content moves upwards and fades out relatively quickly
  const contentTransform = `translate3d(0, -${scrollPos * 0.25}px, 0)`;
  const contentOpacity = Math.max(0, 1 - scrollPos / 400);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-start overflow-hidden bg-slate-900">
      
      {/* Parallax Background Container */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
        style={{ transform: bgTransform }}
      >
        {/* Actual Image Layer without heavy scaling */}
        <div 
          className="absolute inset-[-2%] z-0 bg-cover bg-center bg-no-repeat will-change-transform origin-top brightness-125"
          style={{ 
            backgroundImage: "url('/custom-hero.png')",
            transform: imageTransform
          }}
        />
        {/* Dark overlays to ensure text contrast and add depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-bl from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20 will-change-transform"
        style={{ 
          transform: contentTransform, 
          opacity: contentOpacity 
        }}
      >
        
        <div className="max-w-4xl">
          {/* Main Title */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-medium tracking-tight text-white leading-[1.05] transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Enterprise Platform to Streamline Lazza's Factory Operations
          </h1>

          {/* Subtitle / Industry */}
          <div className={`mt-16 sm:mt-24 transition-all duration-1000 delay-300 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-widest block mb-2">
              Industry
            </span>
            <span className="text-lg sm:text-xl text-white font-medium">
              Manufacturing & Logistics
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
