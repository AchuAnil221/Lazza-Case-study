import React, { useState, useEffect, useRef } from 'react';
import { Factory, Zap, TrendingUp, Settings, Package, PieChart } from 'lucide-react';

const features = [
  {
    icon: Factory,
    title: "MULTI-FACTORY OPERATIONS",
    desc: "Centralized management of multiple manufacturing facilities with clear visibility into factory-specific operations, costs, and performance."
  },
  {
    icon: Zap,
    title: "UTILITY MONITORING",
    desc: "Detailed monitoring of electricity, diesel, water, gas, and solar consumption across factory operations."
  },
  {
    icon: TrendingUp,
    title: "PRODUCTION & WASTAGE",
    desc: "Better visibility into mix production and product wastage through production tracking, performance monitoring, and threshold-based alerts."
  },
  {
    icon: Settings,
    title: "MACHINE COMPLAINTS",
    desc: "A structured process for raising, assigning, tracking, and resolving machine-related complaints across factory operations."
  },
  {
    icon: Package,
    title: "INVENTORY & SPARES",
    desc: "Centralized management of spare parts, purchase orders, stock availability, and inventory movement throughout the spares lifecycle."
  },
  {
    icon: PieChart,
    title: "OPERATIONAL INSIGHTS",
    desc: "Role-specific dashboards, reports, and AI-powered analytics that turn factory data into clear and actionable operational insights."
  }
];

export default function PlatformFeatures() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const getAnimClass = (delayMs) => 
    `transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${delayMs}`;

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((item, idx) => {
            const Icon = item.icon;
            const delayMs = `delay-[${(idx + 1) * 100}ms]`;

            return (
              <div 
                key={idx}
                className={`flex flex-col group cursor-default ${getAnimClass(delayMs)}`}
              >
                <div className="mb-6 text-blue-600 transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-500 origin-left">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                
                {/* Applied the thick, tight-tracking style here as requested */}
                <h4 className="text-[13px] lg:text-[14px] font-extrabold text-slate-900 tracking-tight leading-snug mb-4 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-[12px] text-slate-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
