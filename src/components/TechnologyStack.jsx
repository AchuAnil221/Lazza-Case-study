import React, { useState, useEffect, useRef } from 'react';

export default function TechnologyStack() {
  const stack = [
    {
      layer: 'UI/UX Design',
      techs: ['Figma', 'Interactive Prototypes', 'Design System']
    },
    {
      layer: 'Frontend',
      techs: ['React 18', 'Vite', 'Tailwind CSS', 'Ant Design', 'Chart.js']
    },
    {
      layer: 'Backend',
      techs: ['Django REST', 'PostgreSQL', 'Celery', 'Redis Queue', 'WebSockets']
    },
    {
      layer: 'AI Integration',
      techs: ['OpenAI GPT-4 API', 'LangChain', 'Vector Indexing', 'Prompt Guard']
    },
    {
      layer: 'Cloud & Infrastructure',
      techs: ['AWS ECS', 'S3 Storage', 'CloudFront CDN', 'Firebase Cloud']
    }
  ];

  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { offsetTop, scrollHeight } = containerRef.current;
      const windowHeight = window.innerHeight;
      
      const scrollY = window.scrollY;
      const maxScroll = scrollHeight - windowHeight;
      const currentScroll = scrollY - offsetTop;
      
      let progress = currentScroll / maxScroll;
      // Allow progress to go from -0.25 (entering) to 1.25 (exiting)
      // This lets the first item animate in, and the last item animate out, outside the sticky bounds!
      progress = Math.max(-0.25, Math.min(1.25, progress));
      
      setScrollProgress(progress);
      
      // Map scrollProgress to stack indices
      const localValue = scrollProgress * (stack.length - 1);
      
      // Dispatch custom event to tell the StickyHeader to turn dark
      // Trigger slightly before it locks (progress > -0.05) rather than after
      const isDark = progress > -0.05 && progress < 1.05;
      window.dispatchEvent(new CustomEvent('sync-header-theme', { detail: { isDark } }));
      
      // Dynamically adapt the browser's native scrollbar theme so it doesn't look jarringly white against this dark section!
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      // Reset scrollbar to light mode when leaving/unmounting
      document.documentElement.style.colorScheme = 'light';
    };
  }, []);

  // Background text animations:
  // - Fade in gradually over the first 35% of scroll
  // - Stay visible and sharp from 35% to 65%
  // - Fade and blur out gradually from 65% to 100%
  let bgOpacity = 0;
  const maxBgOpacity = 0.04; // Reduced further for an extremely subtle ghost-like presence
  if (scrollProgress <= 0.35) bgOpacity = Math.max(0, (scrollProgress / 0.35) * maxBgOpacity);
  else if (scrollProgress <= 0.65) bgOpacity = maxBgOpacity;
  else bgOpacity = Math.max(0, maxBgOpacity * (1 - (scrollProgress - 0.65) / 0.35));
  
  let bgBlur = 5;
  if (scrollProgress > 0.65) bgBlur = 5 + ((scrollProgress - 0.65) / 0.35) * 20;

  // Spotlight opacity hits a very subtle maximum (15% opacity)
  const spotlightOpacity = (bgOpacity / maxBgOpacity) * 0.15;
  // Keep the spotlight slightly blurred (not 0px) so it doesn't look too harsh
  const spotlightBlur = Math.max(2, bgBlur - 3);

  // Calculate translation for SERVICES and DELIVERED
  // Continuous smooth slide without pausing at the center
  const servicesTranslate = -100 + scrollProgress * 200;
  const deliveredTranslate = 100 - scrollProgress * 200;

  return (
    <div id="technology" className="relative h-[500vh] bg-emerald-950" ref={containerRef}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-emerald-950">
        {/* Centered container for perfect alignment */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none">
          <div className="relative w-full h-full">
            
            {/* Base Layer: Dim and Blurred */}
            <div className="absolute inset-0 w-full h-full flex flex-col justify-between pt-[5vh] pb-0">
              <h2 
                className="text-[24vw] md:text-[18vw] lg:text-[14vw] font-black tracking-widest uppercase text-white m-0 p-0 leading-none whitespace-nowrap text-center w-full"
                style={{ 
                  opacity: bgOpacity,
                  filter: `blur(${bgBlur}px)`,
                  transform: `translate3d(${servicesTranslate}%, 0, 0) scale(${1 + scrollProgress * 0.1})`,
                  transformOrigin: 'center center'
                }}
              >
                SERVICES
              </h2>
              <h2 
                className="text-[24vw] md:text-[18vw] lg:text-[14vw] font-black tracking-widest uppercase text-white m-0 p-0 leading-none whitespace-nowrap text-center w-full"
                style={{ 
                  opacity: bgOpacity,
                  filter: `blur(${bgBlur}px)`,
                  transform: `translate3d(${deliveredTranslate}%, 0, 0) scale(${1 + scrollProgress * 0.1})`,
                  transformOrigin: 'center center'
                }}
              >
                DELIVERED
              </h2>
            </div>

            {/* Spotlight Layer: Bright and Sharp, Masked to the Center */}
            <div 
              className="absolute inset-0 w-full h-full flex flex-col justify-between pt-[5vh] pb-0"
              style={{
                maskImage: 'linear-gradient(to right, transparent 35%, black 50%, transparent 65%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 35%, black 50%, transparent 65%)'
              }}
            >
              <h2 
                className="text-[24vw] md:text-[18vw] lg:text-[14vw] font-black tracking-widest uppercase text-white m-0 p-0 leading-none whitespace-nowrap text-center w-full"
                style={{ 
                  opacity: spotlightOpacity,
                  filter: `blur(${spotlightBlur}px)`,
                  transform: `translate3d(${servicesTranslate}%, 0, 0) scale(${1 + scrollProgress * 0.1})`,
                  transformOrigin: 'center center'
                }}
              >
                SERVICES
              </h2>
              <h2 
                className="text-[24vw] md:text-[18vw] lg:text-[14vw] font-black tracking-widest uppercase text-white m-0 p-0 leading-none whitespace-nowrap text-center w-full"
                style={{ 
                  opacity: spotlightOpacity,
                  filter: `blur(${spotlightBlur}px)`,
                  transform: `translate3d(${deliveredTranslate}%, 0, 0) scale(${1 + scrollProgress * 0.1})`,
                  transformOrigin: 'center center'
                }}
              >
                DELIVERED
              </h2>
            </div>

            {/* Scrolling Tech Stack */}
            <div className="absolute inset-0 z-10 pointer-events-auto">
              <div className="relative w-full h-full">
                {stack.map((group, idx) => {
                  // Map scrollProgress directly to the stack indices (0 to 4)
                  // Because progress now goes from -0.25 to 1.25, localValue naturally sweeps from -1 (entry scatter) to 5 (exit scatter)!
                  const localValue = scrollProgress * (stack.length - 1);
                  const dist = Math.abs(localValue - idx);
                  
                  // Heading movement: Starts moving extremely early at dist 1.1, reaches center exactly at 0.15 (pauses longer)
                  let headingProgress = 0;
                  if (dist <= 0.15) headingProgress = 1;
                  else if (dist <= 1.1) headingProgress = 1 - (dist - 0.15) / 0.95;
                  
                  // List visibility: Starts opening just before the heading reaches center (dist 0.35), fully open at 0.15
                  let listProgress = 0;
                  if (dist <= 0.15) listProgress = 1;
                  else if (dist <= 0.35) listProgress = 1 - (dist - 0.15) / 0.20;
                  
                  // Easing function for smoother movement
                  const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                  const slideProgress = easeInOut(headingProgress);
                  const listFade = easeInOut(listProgress);
                  
                  const isActive = headingProgress > 0.5;

                  // Scattered coordinates (X: vw, Y: vh relative to center)
                  const scatteredPositions = [
                    { x: -35, y: -10 }, // Top/Far Left
                    { x: 35, y: -10 },  // Top/Far Right
                    { x: 15, y: -25 },  // Top Right-ish (Backend)
                    { x: -25, y: 25 },  // Bottom Left
                    { x: 25, y: 25 }    // Bottom Right
                  ];
                  
                  const pos = scatteredPositions[idx] || { x: 0, y: 0 };
                  
                  const translateX = pos.x * (1 - slideProgress); 
                  const translateY = pos.y * (1 - slideProgress); 
                  const scale = 0.7 + (slideProgress * 0.6); // Starts at 0.7x (smaller), scales up to 1.3x when active
                  
                  return (
                    <div 
                      key={idx}
                      className="absolute top-1/2 left-1/2 flex flex-col items-center text-center gap-6 will-change-transform"
                      style={{ 
                        transform: `translate3d(calc(-50% + ${translateX}vw), calc(-50% + ${translateY}vh), 0) scale(${scale})`, 
                        transformOrigin: 'center center',
                        zIndex: isActive ? 20 : 10 
                      }}
                    >
                      <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-500 ${isActive ? 'text-white drop-shadow-xl opacity-100' : 'text-slate-500 opacity-10 cursor-default'}`}>
                        {group.layer}
                      </h3>
                      
                      <div 
                        className="flex flex-col items-start text-left gap-y-2 lg:gap-y-3 text-slate-400 text-base md:text-lg lg:text-xl font-normal max-w-md leading-relaxed p-4 -m-4"
                        style={{ 
                          opacity: listFade, 
                          transform: `translate3d(0, ${(1 - listFade) * 20}px, 0)`,
                          transition: 'opacity 0.2s ease-out, transform 0.3s ease-out',
                          pointerEvents: isActive ? 'auto' : 'none',
                          maxHeight: `${listFade * 300}px`,
                          overflow: 'hidden'
                        }}
                      >
                        {group.techs.map((t, tIdx) => (
                          <span key={tIdx} className="text-slate-300 font-medium flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
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
        </div>

      </div>
    </div>
  );
}
