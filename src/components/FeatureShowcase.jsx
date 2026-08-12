import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

// Math Helpers
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
const mapRange = (val, inMin, inMax, outMin, outMax) => {
  return outMin + (outMax - outMin) * clamp((val - inMin) / (inMax - inMin), 0, 1);
};
const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const THEME_COLORS = [
  {r: 16, g: 185, b: 129}    // Static Emerald Green (replaces Cyan)
];

const lerpColor = (c1, c2, t) => {
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return {r, g, b};
};

// Truncate cubic bezier (P0, P1, P2, P3) at parameter t (0 <= t <= 1)
const getSubBezierPath = (p0, p1, p2, p3, t) => {
  if (t <= 0) return `M ${p0.x} ${p0.y}`;
  const clampedT = Math.min(1, Math.max(0, t));
  const p01 = { x: (1 - clampedT) * p0.x + clampedT * p1.x, y: (1 - clampedT) * p0.y + clampedT * p1.y };
  const p12 = { x: (1 - clampedT) * p1.x + clampedT * p2.x, y: (1 - clampedT) * p1.y + clampedT * p2.y };
  const p23 = { x: (1 - clampedT) * p2.x + clampedT * p3.x, y: (1 - clampedT) * p2.y + clampedT * p3.y };

  const p012 = { x: (1 - clampedT) * p01.x + clampedT * p12.x, y: (1 - clampedT) * p01.y + clampedT * p12.y };
  const p123 = { x: (1 - clampedT) * p12.x + clampedT * p23.x, y: (1 - clampedT) * p12.y + clampedT * p23.y };

  const p0123 = { x: (1 - clampedT) * p012.x + clampedT * p123.x, y: (1 - clampedT) * p012.y + clampedT * p123.y };

  return `M ${p0.x} ${p0.y} C ${p01.x} ${p01.y}, ${p012.x} ${p012.y}, ${p0123.x} ${p0123.y}`;
};

const colorToStr = (c) => `rgb(${c.r}, ${c.g}, ${c.b})`;
const colorToRgba = (c, a) => `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;

export default function FeatureShowcase() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 1440, height: 1000 });
  const [isMobile, setIsMobile] = useState(false);
  const [cardW, setCardW] = useState(0);
  const [cardH, setCardH] = useState(480);
  const sectionRef = useRef(null);
  const measureRef = useRef(null);

  const showcaseItems = [
    {
      id: '01',
      title: 'FACTORY MANAGEMENT',
      desc: 'Command your industrial footprint from a single vantage point. Organize directories, allocate cost centers, and maintain real-time visibility over every operational asset.',
      image: '/assets/factory_management.png?v=2'
    },
    {
      id: '02',
      title: 'INVENTORY & STORE',
      desc: 'Track raw materials and finished goods in real-time. Automated reorder triggers and comprehensive logs work autonomously to eliminate production bottlenecks.',
      image: '/assets/inventory_store.png?v=2'
    },
    {
      id: '03',
      title: 'WASTAGE ANALYSIS',
      desc: 'Identify and eliminate production losses. Monitor damage percentages in real-time, pinpoint underperforming machines, and generate insights to maximize factory yield.',
      image: '/assets/wastage_monitoring.png?v=2'
    },
    {
      id: '04',
      title: 'UTILITY & CONSUMPTION',
      desc: 'Gain complete visibility into power, water, and diesel consumption. Advanced analytics identify inefficiencies instantly, empowering you to optimize cost-per-unit metrics.',
      image: '/assets/utility_monitoring.png?v=2'
    },
    {
      id: '05',
      title: 'MACHINE COMPLAINTS',
      desc: 'Modernize maintenance workflows with responsive ticketing. Instantly dispatch technicians and utilize analytics to shift from reactive repairs to predictive maintenance.',
      image: '/assets/machine_complaints.png?v=2'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 1024);
      if (measureRef.current) {
        setCardW(measureRef.current.offsetWidth);
        setCardH(measureRef.current.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        
        if (scrolled >= 0 && scrolled <= totalScrollable) {
          const rawProgress = (scrolled / totalScrollable) * (showcaseItems.length - 1);
          setScrollProgress(rawProgress);
        } else if (scrolled < 0) {
          setScrollProgress(0);
        } else if (scrolled > totalScrollable) {
          setScrollProgress(showcaseItems.length - 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showcaseItems.length]);

  // Derived animation states
  const activeIndex = Math.floor(scrollProgress);
  const localProgress = scrollProgress % 1;
  const isLast = activeIndex === showcaseItems.length - 1;

  // Physical vertical distance between the centers of each card
  const SPACING_Y = isMobile ? dimensions.height : Math.max(dimensions.height * 0.65, 600);

  // Camera Pan mapping (Delayed to create a 0.7-second pause while the frame is fully lit)
  const panProgress = mapRange(localProgress, 0.35, 0.85, 0, 1);
  const easedPan = easeInOutCubic(panProgress);
  const cameraY = (activeIndex + easedPan) * SPACING_Y;

  // Calculate exact responsive dimensions to guarantee PERFECT centering
  let textWidth = 400;
  let gap = 96;
  let shiftMag = (textWidth + gap) / 2; // 248px
  
  if (!isMobile && dimensions.width < 1280) {
    textWidth = 320;
    gap = 48;
    shiftMag = (textWidth + gap) / 2; // 184px
  }

  // Exact Coordinates for the Pulse
  const getCardCenterX = (idx) => {
    const isEven = idx % 2 === 0;
    const shift = isMobile ? 0 : (isEven ? -shiftMag : shiftMag);
    return (dimensions.width / 2) + shift;
  };

  const startX = getCardCenterX(activeIndex);
  const endX = getCardCenterX(activeIndex + 1);

  const borderHeight = cardH; 
  // Pulse travels from Bottom-Center to Top-Center
  // Pushed 2px outward so it perfectly aligns with the tip of the SVG stroke
  const startY = activeIndex * SPACING_Y + (dimensions.height / 2) + (borderHeight / 2) + 2;
  const endY = (activeIndex + 1) * SPACING_Y + (dimensions.height / 2) - (borderHeight / 2) - 2;

  // Global Travelling Pulse & Line Math
  let pDotX = startX;
  let pDotY = startY;
  let pDotOpacity = 0;
  let showPulse = false;
  let lineDrawProgress = 0;
  let lineOpacity = 0;
  let lineShrinkOffset = 0;
  
  let activeColorObj = THEME_COLORS[activeIndex % THEME_COLORS.length];
  
  const cy1 = startY + 100;
  const cy2 = endY - 100;

  if (!isLast) {
    if (localProgress >= 0.0 && localProgress <= 0.35) {
      // 0.7-SECOND PAUSE: The border is fully drawn, frame is perfectly still.
      // Pulse dot fades in instantly right at the very end so it never sits idle
      pDotOpacity = easeInOutCubic(mapRange(localProgress, 0.34, 0.35, 0, 1));
      pDotX = startX;
      pDotY = startY;
      showPulse = true;
      lineOpacity = 0;
      lineDrawProgress = 0;
      lineShrinkOffset = 0;
    } else if (localProgress > 0.35 && localProgress <= 0.85) {
      // Pulse travelling
      pDotOpacity = 1;
      const p = easeInOutCubic(mapRange(localProgress, 0.35, 0.85, 0, 1));
      lineDrawProgress = p;
      lineOpacity = 1;
      lineShrinkOffset = 0;
      
      activeColorObj = lerpColor(THEME_COLORS[activeIndex % THEME_COLORS.length], THEME_COLORS[(activeIndex + 1) % THEME_COLORS.length], p);
      
      const u = 1 - p;
      pDotX = u*u*u * startX + 3*u*u*p * startX + 3*u*p*p * endX + p*p*p * endX; 
      pDotY = u*u*u * startY + 3*u*u*p * cy1 + 3*u*p*p * cy2 + p*p*p * endY;
      showPulse = true;
    } else if (localProgress > 0.85 && localProgress <= 0.98) {
      // Arrived at next section! Dot disappears INSTANTLY.
      pDotOpacity = 0;
      pDotX = endX;
      pDotY = endY;
      showPulse = false;
      activeColorObj = THEME_COLORS[(activeIndex + 1) % THEME_COLORS.length];
      
      // Line remains fully drawn, but now shrinks from its tail
      lineOpacity = 1;
      lineDrawProgress = 1;
      const p = easeInOutCubic(mapRange(localProgress, 0.85, 0.98, 0, 1));
      lineShrinkOffset = p * -100;
    } else if (localProgress > 0.98) {
      lineOpacity = 0;
      showPulse = false;
    }
  }

  const globalColorStr = colorToStr(activeColorObj);

  // SVG Paths for the split border tracing
  const w = cardW;
  const h = cardH; 
  const r = 24; 
  
  // Traces from Top-Center to Bottom-Center
  const rightPath = `M ${w/2} 0 L ${w - r} 0 A ${r} ${r} 0 0 1 ${w} ${r} L ${w} ${h - r} A ${r} ${r} 0 0 1 ${w - r} ${h} L ${w/2} ${h}`;
  const leftPath = `M ${w/2} 0 L ${r} 0 A ${r} ${r} 0 0 0 0 ${r} L 0 ${h - r} A ${r} ${r} 0 0 0 ${r} ${h} L ${w/2} ${h}`;

  return (
    <section id="showcase" className="bg-[#FAFAFC]">
      
      {/* Scroll Jacking Wrapper (50vh of scrolling per transition for a 0.7-second pause) */}
      <div 
        ref={sectionRef} 
        className="relative w-full"
        style={{ height: `${(showcaseItems.length - 1) * 50 + 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#FAFAFC]">
          


          {/* The Massive Panning Canvas */}
          <div 
            className="absolute top-0 left-0 w-full will-change-transform"
            style={{ 
              height: `${(showcaseItems.length - 1) * SPACING_Y + dimensions.height}px`,
              transform: `translateY(-${cameraY}px)` 
            }}
          >

            {/* The Dynamic Travelling Neon Line (ONLY trails behind the pulse, never ahead of it) */}
            {!isLast && lineOpacity > 0 && (
              <svg 
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                style={{ opacity: lineOpacity }}
              >
                <path 
                  d={lineDrawProgress < 1 
                    ? getSubBezierPath({x: startX, y: startY}, {x: startX, y: cy1}, {x: endX, y: cy2}, {x: endX, y: endY}, lineDrawProgress)
                    : `M ${startX} ${startY} C ${startX} ${cy1}, ${endX} ${cy2}, ${endX} ${endY}`
                  }
                  fill="none"
                  stroke={globalColorStr}
                  strokeWidth="2.5"
                  pathLength={lineDrawProgress === 1 ? "100" : undefined}
                  strokeDasharray={lineDrawProgress === 1 ? "100 100" : "none"}
                  strokeDashoffset={lineDrawProgress === 1 ? lineShrinkOffset : 0}
                  strokeLinecap="butt"
                  style={{ filter: `drop-shadow(0px 0px 10px ${colorToRgba(activeColorObj, 0.8)})` }}
                />
              </svg>
            )}

            {/* The Global Glowing Light Source */}
            {showPulse && (
              <div 
                className="absolute z-0 pointer-events-none will-change-transform"
                style={{
                  width: '4px',
                  height: '4px',
                  left: `${pDotX}px`,
                  top: `${pDotY}px`,
                  opacity: pDotOpacity,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: colorToRgba(activeColorObj, 0.8),
                  boxShadow: `0 0 8px 2px ${colorToRgba(activeColorObj, 0.5)}, 0 0 15px 4px ${colorToRgba(activeColorObj, 0.3)}`
                }}
              />
            )}

            {/* The Spatial Features */}
            {showcaseItems.map((item, idx) => {
              const dist = scrollProgress - idx; 
              
              const cardColorObj = THEME_COLORS[idx % THEME_COLORS.length];
              const cardColorStr = colorToStr(cardColorObj);
              
              // Feature Visibility & Border Crop Logic
              let contentOpacity = 1;
              let borderOffset = 0;

              if (dist > 0) {
                // Exiting: Slower closing border (starts exactly as line starts traveling)
                // Content stays until border is halfway closed, then fades out quickly
                contentOpacity = easeInOutCubic(mapRange(dist, 0.50, 0.40, 0, 1));
                const border_p = easeInOutCubic(mapRange(dist, 0.35, 0.65, 0, 1));
                borderOffset = border_p * -100;
              } else if (dist < 0) {
                // Entering (Scrolling towards)
                contentOpacity = easeInOutCubic(mapRange(dist, -0.05, -0.15, 1, 0));
                const pulse_p = easeInOutCubic(mapRange(dist, -0.20, -0.02, 0, 1));
                borderOffset = (1 - pulse_p) * 100;
              } else {
                contentOpacity = 1;
                borderOffset = 0;
              }

              const isFullyCovered = Math.abs(borderOffset) < 0.1;
              const isCompletelyGone = Math.abs(borderOffset) > 99;
              const borderOpacity = isCompletelyGone ? 0 : (isFullyCovered ? 0.75 : 1);

              const isEven = idx % 2 === 0;
              const translateX = isMobile 
                ? '0px'
                : (isEven ? `-${shiftMag}px` : `${shiftMag}px`);

              return (
                <div 
                  key={item.id}
                  className="absolute w-full left-0 flex items-center justify-center pointer-events-none will-change-transform z-10"
                  style={{ 
                    top: `${idx * SPACING_Y}px`,
                    height: `${dimensions.height}px`
                  }}
                >
                  <div 
                    className="relative w-full max-w-4xl px-4 md:px-8 pointer-events-auto flex justify-center"
                    style={{ transform: `translateX(${translateX})` }}
                  >
                     
                     {/* The Glowing Neon Border Tracing SVG */}
                     {cardW > 0 && (
                       <svg 
                         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 overflow-visible"
                         width={w} height={h}
                         viewBox={`0 0 ${w} ${h}`}
                         style={{ 
                           opacity: borderOpacity,
                           transition: 'opacity 0.5s ease-in-out'
                         }}
                       >
                         {/* Right Half */}
                         <path 
                           d={rightPath}
                           fill="none" stroke={cardColorStr} strokeWidth="3"
                           pathLength="100"
                           strokeDasharray="100 100"
                           strokeDashoffset={borderOffset}
                           strokeLinecap="round"
                           style={{ filter: `drop-shadow(0px 0px 15px ${colorToRgba(cardColorObj, 0.8)})` }}
                         />
                         {/* Left Half */}
                         <path 
                           d={leftPath}
                           fill="none" stroke={cardColorStr} strokeWidth="3"
                           pathLength="100"
                           strokeDasharray="100 100"
                           strokeDashoffset={borderOffset}
                           strokeLinecap="round"
                           style={{ filter: `drop-shadow(0px 0px 15px ${colorToRgba(cardColorObj, 0.8)})` }}
                         />
                       </svg>
                     )}

                     {/* The Refined Framed Image Box */}
                     <div 
                        ref={idx === 0 ? measureRef : null}
                        className="w-[92vw] md:w-[680px] h-[280px] md:h-[420px] bg-white rounded-3xl p-4 relative z-10 flex items-center justify-center flex-shrink-0"
                        style={{ opacity: contentOpacity }}
                     >
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                        
                        {/* Text Box (Hanging OUTSIDE the frame) */}
                        <div 
                          className={`
                            absolute w-[90vw]
                            top-[100%] left-1/2 -translate-x-1/2 text-center 
                            md:top-1/2 md:-translate-y-1/2 
                            ${isEven 
                              ? 'md:left-full md:-translate-x-0 md:text-left' 
                              : 'md:right-full md:left-auto md:translate-x-0 md:text-right'
                            }
                          `}
                          style={{
                            maxWidth: isMobile ? '400px' : `${textWidth}px`,
                            marginTop: isMobile ? '32px' : '0px',
                            marginLeft: !isMobile && isEven ? `${gap}px` : '0px',
                            marginRight: !isMobile && !isEven ? `${gap}px` : '0px',
                          }}
                        >
                          <h3 className="text-2xl md:text-3xl font-medium text-slate-800 mb-3 leading-tight tracking-tight">
                            {item.title}
                          </h3>
                          <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium drop-shadow-sm opacity-80">
                            {item.desc}
                          </p>
                        </div>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

