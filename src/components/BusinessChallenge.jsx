import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const challenges = [
  {
    num: "01",
    title: "DISCONNECTED FACTORY OPERATIONS",
    desc: "Managing multiple facilities through separate processes made it difficult to maintain a consistent view of overall operations."
  },
  {
    num: "02",
    title: "LIMITED PRODUCTION VISIBILITY",
    desc: "Teams lacked a centralized way to monitor production activity, identify bottlenecks, and track performance across facilities."
  },
  {
    num: "03",
    title: "MANUAL OPERATIONAL REPORTING",
    desc: "Information had to be gathered and compiled manually, making reporting time-consuming and delaying access to important insights."
  },
  {
    num: "04",
    title: "COMPLEX MAINTENANCE & INVENTORY WORKFLOWS",
    desc: "Machine complaints, spare parts, and inventory activities required better coordination to avoid delays and operational disruptions."
  }
];

export default function BusinessChallenge() {
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
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const getAnimClass = (delayMs) => 
    `transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${delayMs}`;

  return (
    <section id="challenge" ref={sectionRef} className="pt-24 pb-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Header */}
        <div className="mb-20 w-full text-center flex flex-col items-center">
          
          <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug mb-8 ${getAnimClass('delay-[100ms]')}`}>
            When the Factory Grows,<br />
            <span className="text-sky-500 italic">So Does the Complexity.</span>
          </h3>

          <div className={`max-w-4xl space-y-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal ${getAnimClass('delay-[200ms]')}`}>
            <p>
              As Lazza’s manufacturing operations expanded across multiple facilities, managing day-to-day activities became increasingly complex. Teams needed better visibility across factories, while critical operational information remained spread across different processes.
            </p>
          </div>
        </div>

        {/* CHALLENGE GRID */}
        <div className={`relative pt-12 pb-12 border-t border-b border-slate-200/80 transition-all duration-1000 ease-out delay-[300ms] ${isVisible ? 'border-opacity-100' : 'border-opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            {challenges.map((item, idx) => {
              const delayMs = `delay-[${(idx + 4) * 100}ms]`;

              return (
                <div 
                  key={idx}
                  className={`flex flex-col group cursor-default hover:-translate-y-1.5 hover:opacity-90 ${getAnimClass(delayMs)}`}
                >
                  <div className="mb-6">
                    <span className="text-[15px] font-extrabold text-sky-500 transition-colors duration-300">
                      {item.num}
                    </span>
                  </div>
                  
                  <h4 className="text-[15px] lg:text-base tracking-tight font-extrabold text-slate-900 mb-4 leading-snug transition-colors duration-300 pr-2">
                    {item.title}
                  </h4>
                  <p className="text-[14px] text-slate-500 leading-relaxed transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
