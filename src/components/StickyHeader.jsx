import React, { useState, useEffect } from 'react';
import { Factory, ShieldCheck, Menu, Search, Bookmark } from 'lucide-react';

export default function StickyHeader({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'technology', label: 'Architecture' },
    { id: 'solution', label: 'The Making' },
    { id: 'showcase', label: 'Features' },
    { id: 'impact', label: 'The Impact' },
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [forceDarkTheme, setForceDarkTheme] = useState(false);

  useEffect(() => {
    const handleSync = (e) => setForceDarkTheme(e.detail.isDark);
    window.addEventListener('sync-header-theme', handleSync);
    return () => window.removeEventListener('sync-header-theme', handleSync);
  }, []);

  const isDarkSection = forceDarkTheme;
  const isDarkTheme = !scrolled || isDarkSection;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
      scrolled 
        ? (isDarkSection ? 'bg-emerald-950/95 backdrop-blur-md py-4 shadow-sm border-b border-emerald-900' : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-200 shadow-sm') 
        : 'bg-transparent py-6'
    }`}>
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Ghost Logo to maintain flex layout space */}
        <div className="flex items-center gap-2 opacity-0 pointer-events-none">
          <img src="/hispan-logo.png" alt="Hispan Logo" className="h-8 md:h-10 w-auto" />
        </div>

        {/* The Animated Absolute Logo */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out flex items-center gap-2 cursor-pointer z-50 ${
            isDarkSection 
              ? 'left-1/2 -translate-x-1/2 scale-125' 
              : `left-6 md:left-12 translate-x-0 scale-100`
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="/hispan-logo.png" 
            alt="Hispan Logo" 
            className={`h-8 md:h-10 w-auto transition-all duration-700 ${
              isDarkTheme ? 'drop-shadow-[0_0_4px_rgba(255,255,255,0.25)]' : ''
            }`} 
          />
          <span className="font-bold text-2xl tracking-tighter leading-none whitespace-nowrap flex items-center">
            <span className={`transition-all duration-700 ease-in-out overflow-hidden text-emerald-400 ${
              isDarkSection ? 'max-w-[300px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'
            }`}>
              Behind <span className="italic">the</span> Build
            </span>
          </span>
        </div>



        {/* Minimal Nav Links */}
        <nav className={`hidden lg:flex items-center gap-6 transition-all duration-700 ease-in-out ${
          isDarkSection ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
        }`}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-[15px] transition-colors duration-700 ease-in-out ${
                  isActive
                    ? (isDarkTheme ? 'text-sky-400 font-medium' : 'text-sky-600 font-medium')
                    : (isDarkTheme ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className={`flex items-center gap-5 transition-all duration-700 ease-in-out ${
          isDarkSection ? 'opacity-0 pointer-events-none translate-x-4' : 'opacity-100 translate-x-0'
        } ${isDarkTheme ? 'text-white/90' : 'text-slate-600'}`}>
           <Search className={`w-5 h-5 transition-colors duration-700 ease-in-out ${isDarkTheme ? 'hover:text-white' : 'hover:text-slate-900'} hidden sm:block`} />
           <Bookmark className={`w-5 h-5 transition-colors duration-700 ease-in-out ${isDarkTheme ? 'hover:text-white' : 'hover:text-slate-900'} hidden sm:block`} />
           <Menu className={`w-6 h-6 transition-colors duration-700 ease-in-out ${isDarkTheme ? 'hover:text-white' : 'hover:text-slate-900'}`} />
        </div>

      </div>
    </header>
  );
}
