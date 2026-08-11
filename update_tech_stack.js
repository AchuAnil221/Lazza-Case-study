const fs = require('fs');

const content = `import React, { useState, useEffect, useRef } from 'react';
import { Code2, Server, Cloud, Bot, Figma } from 'lucide-react';

export default function TechnologyStack() {
  const stack = [
    {
      layer: 'UI/UX DESIGN',
      icon: Figma,
      color: 'bg-white/10 text-purple-400',
      techs: ['Figma', 'Interactive Prototypes', 'Design System']
    },
    {
      layer: 'FRONTEND',
      icon: Code2,
      color: 'bg-white/10 text-sky-400',
      techs: ['React 18', 'Vite', 'Tailwind CSS', 'Ant Design', 'Chart.js', 'Framer Motion']
    },
    {
      layer: 'BACKEND',
      icon: Server,
      color: 'bg-white/10 text-emerald-400',
      techs: ['Django REST', 'PostgreSQL', 'Celery', 'Redis Queue', 'WebSockets API']
    },
    {
      layer: 'CLOUD & INFRASTRUCTURE',
      icon: Cloud,
      color: 'bg-white/10 text-amber-400',
      techs: ['AWS ECS', 'S3 Storage', 'CloudFront CDN', 'Firebase Cloud Messaging']
    },
    {
      layer: 'AI INTEGRATION',
      icon: Bot,
      color: 'bg-white/10 text-indigo-400',
      techs: ['OpenAI GPT-4 API', 'LangChain', 'Vector Indexing', 'Custom Prompt Guard']
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Subtle parallax effect for the whole grid
  const parallaxY = sectionRef.current ? (scrollY - sectionRef.current.offsetTop) * 0.05 : 0;

  return (
    <div id="technology" className="bg-[#FAFAFC] pb-16 relative z-10" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-6 right-6 h-[1px] z-0 overflow-hidden hidden lg:block">
          <div 
            className="w-full h-full bg-gradient-to-r from-transparent via-slate-700 to-transparent transition-all duration-1500 ease-in-out"
            style={{
              transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
              transitionDelay: '400ms'
            }}
          />
        </div>

        {/* Architecture Flow Diagram */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10 will-change-transform"
          style={{ transform: \`translate3d(0, \${parallaxY}px, 0)\` }}
        >
          {stack.map((group, idx) => {
            return (
              <div 
                key={idx}
                className={\`px-6 py-12 rounded-none flex flex-col items-center text-center justify-start relative group bg-slate-900 border border-slate-800 h-full transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5 \${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}\`}
                style={{ transitionDelay: \`\${idx * 150}ms\` }}
              >
                <h3 
                  className={\`text-xl font-bold text-white/90 group-hover:text-white mb-6 transition-all duration-500 ease-out \${isVisible ? 'opacity-100' : 'opacity-0'}\`}
                  style={{ transitionDelay: \`\${idx * 150 + 300}ms\` }}
                >
                  {group.layer}
                </h3>

                <div className="flex flex-wrap justify-center gap-2">
                  {group.techs.map((t, tIdx) => (
                    <span 
                      key={tIdx} 
                      className={\`px-3 py-1.5 rounded-lg bg-white/5 text-white/50 group-hover:text-white/90 group-hover:bg-white/10 group-hover:border-white/20 text-[11px] font-medium border border-transparent transition-all duration-500 ease-out \${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}\`}
                      style={{ transitionDelay: \`\${idx * 150 + 500 + (tIdx * 100)}ms\` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
\`;

fs.writeFileSync('/Users/achuanil/Desktop/lazza/src/components/TechnologyStack.jsx', content);
console.log('updated');
