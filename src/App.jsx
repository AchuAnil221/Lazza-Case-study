import React, { useState, useEffect } from 'react';
import StickyHeader from './components/StickyHeader';
import HeroSection from './components/HeroSection';
import AboutProject from './components/AboutProject';
import BusinessChallenge from './components/BusinessChallenge';
import OurSolution from './components/OurSolution';
import PlatformFeatures from './components/PlatformFeatures';
import FeatureShowcase from './components/FeatureShowcase';

import TechnologyStack from './components/TechnologyStack';
import BusinessImpact from './components/BusinessImpact';
import FinalOutcome from './components/FinalOutcome';
import TheShift from './components/TheShift';
import HorizontalShowcase from './components/HorizontalShowcase';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  // IntersectionObserver to observe scroll sections and highlight navigation
  useEffect(() => {
    const sectionIds = ['overview', 'challenge', 'technology', 'solution', 'showcase', 'impact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0, rootMargin: "-40% 0px -40% 0px" }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] selection:bg-sky-100 selection:text-sky-900 relative">
      
      {/* Sticky Header Navigation */}
      <StickyHeader activeSection={activeSection} />

      {/* Main Narrative Content Sections */}
      <main>
        <HeroSection />
        <AboutProject />
        <BusinessChallenge />
        <TechnologyStack />
        <OurSolution />
        <TheShift />
        <FeatureShowcase />
        <BusinessImpact />
        <HorizontalShowcase />
        <FinalOutcome />
      </main>

    </div>
  );
}
