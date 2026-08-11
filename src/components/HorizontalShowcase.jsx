import React, { useRef, useState, useEffect } from 'react';

const FEATURES = [
  {
    id: '01',
    label: 'Centralized Visibility',
    title: <>Home <span className="text-emerald-600 italic">Dashboard</span></>,
    bg: '#FFFFFF',
    image: '/assets/1%20MOCK.png'
  },
  {
    id: '02',
    label: 'Production Monitoring',
    title: <>Mix <span className="text-emerald-600 italic">Production</span></>,
    bg: '#FFFFFF',
    image: '/assets/2%20MOCK.png'
  },
  {
    id: '03',
    label: 'Machine Monitoring',
    title: <>Complaint <span className="text-emerald-600 italic">Tracking</span></>,
    bg: '#FFFFFF',
    image: '/assets/3%20MOCK.png'
  }
];

export default function HorizontalShowcase() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportH = window.innerHeight;
      const scrolled = -rect.top;
      const scrollable = sectionHeight - viewportH;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = dimensions.w < 768;
  const totalFeatures = FEATURES.length;

  // Card sizing
  const cardGap = isMobile ? 16 : 32;
  const activeCardWidth = isMobile ? dimensions.w - 48 : Math.min(dimensions.w * 0.75, 1100);
  const cardHeight = isMobile ? dimensions.h * 0.6 : Math.min(dimensions.h * 0.75, 640);

  // Total track width
  const totalTrackWidth = totalFeatures * (activeCardWidth + cardGap);

  // How far the track needs to translate to show the last card at the exact starting position of the first card
  const maxTranslate = (totalFeatures - 1) * (activeCardWidth + cardGap);

  // Current translation based on scroll progress
  const translateX = scrollProgress * maxTranslate;

  return (
    <section
      id="horizontal-showcase"
      className="relative bg-white"
    >
      {/* Scroll runway: Increased distance to slow down the scroll speed */}
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: `${totalFeatures * 250}vh` }}
      >
        {/* Sticky viewport - pushed significantly upward using pb-[15vh] to close gap with previous section */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center pb-[15vh]">

          {/* Horizontal Track */}
          <div className="w-full relative overflow-visible" style={{ height: `${cardHeight}px` }}>
            <div
              className="absolute top-0 left-0 h-full flex items-stretch will-change-transform"
              style={{
                paddingLeft: isMobile ? '24px' : '48px',
                gap: `${cardGap}px`,
                transform: `translateX(-${translateX}px)`,
              }}
            >
              {FEATURES.map((feature, idx) => {
                return (
                  <div
                    key={feature.id}
                    className="flex-shrink-0 h-full rounded-[40px] overflow-hidden relative flex flex-col border border-slate-100"
                    style={{
                      width: `${activeCardWidth}px`,
                      backgroundColor: feature.bg,
                    }}
                  >
                    {/* The Visual (Mockup) - Left-aligned */}
                    <div className="absolute inset-y-0 left-0 w-full md:w-[65%] flex items-end justify-center group cursor-pointer z-20">
                      <div className="relative w-full h-full flex items-end justify-center">
                         <img 
                           src={feature.image} 
                           alt={feature.title} 
                           className="w-[40%] md:w-[45%] h-auto object-contain mix-blend-multiply transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[33%] group-hover:translate-y-0" 
                         />
                      </div>
                    </div>

                    {/* The Text (Bottom Right) */}
                    <div className="mt-auto ml-auto p-10 md:p-12 lg:p-16 max-w-md relative z-10 pointer-events-none">
                      <span className="text-sm md:text-base lg:text-lg font-normal text-slate-500 mb-3 block">
                        {feature.label}
                      </span>
                      <h3 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-slate-900 leading-[1.1] tracking-tight">
                        {feature.title}
                      </h3>
                    </div>

                  </div>
                );
              })}

              {/* Trailing spacer to allow the last card to reach the active position */}
              <div style={{ width: `${dimensions.w * 0.1}px`, flexShrink: 0 }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
