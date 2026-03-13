import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Trophy, X, Calendar, CheckCircle2, FastForward, Flag, MapPin } from 'lucide-react';

// ==========================================
// ROADMAP DATA
// ==========================================
const timelineEvents = [
  { id: 1, title: 'Registration', date: 'Jan 15', description: 'Start your engines! Registration begins for all events. Secure your spot on the grid.', icon: '🚩', prize: 'Early Bird Swag' },
  { id: 2, title: 'Online Rounds', date: 'Feb 01', description: 'Preliminary simulator rounds to qualify for the finals. Show your speed.', icon: '🏎️', prize: 'Qualification' },
  { id: 3, title: 'Screening', date: 'Feb 20', description: 'The top 50 qualifiers are announced. Did you make the cut?', icon: '📊', prize: 'Finalist Badge' },
  { id: 4, title: 'Workshop Week', date: 'Mar 01', description: 'Tech sessions with industry experts to fine-tune your performance.', icon: '🛠️', prize: 'Certificates' },
  { id: 5, title: 'Grand Finale', date: 'Mar 15', description: 'Three days of intense competition, networking, and glory.', icon: '🏆', prize: '$10,000 Pool' },
];

export const EventsTimeline: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // We'll track which event is currently "active" based on scroll position
  const [activeEventIndex, setActiveEventIndex] = useState<number>(-1);

  // 1. Hook into the page scroll for this specific section over its native height
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 5%", "end 94%"] // Starts animating when top hits 80% screen, finishes when bottom hits 20%
  });

  // 2. Smooth the movement for a high-end feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // 3. Map scroll to car position (left: 4% to 90%)
  const carX = useTransform(smoothProgress, [0, 1], ["4%", "90%"]);

  // 4. Automatically trigger event popups as the car drives past them
  useEffect(() => {
    return smoothProgress.onChange((latest) => {
      // Define thresholds for each event
      let newIndex = -1;
      if (latest > 0.05 && latest < 0.2) newIndex = 0;
      else if (latest >= 0.25 && latest < 0.4) newIndex = 1;
      else if (latest >= 0.45 && latest < 0.6) newIndex = 2;
      else if (latest >= 0.65 && latest < 0.8) newIndex = 3;
      else if (latest >= 0.85 && latest <= 1.0) newIndex = 4;

      setActiveEventIndex(newIndex);
    });
  }, [smoothProgress]);

  const selectedEvent = activeEventIndex >= 0 ? timelineEvents[activeEventIndex] : null;

  return (
    <section ref={scrollRef} className="relative w-full bg-[#050505] text-white py-20 flex flex-col items-center justify-center overflow-hidden min-h-screen">

      {/* Header Area */}
      <div className="mb-12 md:mb-16 text-center z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
        >
          <Flag className="w-3 h-3" /> Solutions 2k26
        </motion.div>
        <h2 className="font-orbitron text-4xl md:text-6xl font-black italic tracking-tighter leading-none">
          CIRCUIT <span className="text-red-600">ROADMAP</span>
        </h2>
        <p className="text-zinc-500 text-xs md:text-sm mt-4 font-bold uppercase tracking-widest animate-pulse">
          Scroll to trace the timeline
        </p>
      </div>

      {/* THE TRACK AREA */}
      <div className="relative w-full h-[280px] flex items-center px-4 md:px-10 shrink-0">

        {/* Asphalt Track */}
        <div className="relative w-full h-44 bg-[#111112] border-y-[4px] border-zinc-800 flex items-center shadow-[0_30px_60px_rgba(0,0,0,1)]">

          {/* F1 Curbs (Red & White) */}
          <div className="absolute top-0 left-0 w-full h-2.5 bg-[repeating-linear-gradient(90deg,#fff,#fff_40px,#ef4444_40px,#ef4444_80px)] opacity-90" />
          <div className="absolute bottom-0 left-0 w-full h-2.5 bg-[repeating-linear-gradient(90deg,#fff,#fff_40px,#ef4444_40px,#ef4444_80px)] opacity-90" />

          {/* Lane Center Dash */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] border-t-2 border-dashed border-zinc-700/20 -translate-y-1/2" />

          {/* Interaction Layer: Checkpoints */}
          <div className="relative w-full max-w-7xl mx-auto flex justify-between items-center px-4 md:px-10 z-20">
            {timelineEvents.map((event, idx) => {
              const isActive = activeEventIndex === idx;
              const isPassed = activeEventIndex > idx;
              return (
                <div key={event.id} className="relative flex flex-col items-center">

                  {/* Checkpoint Node */}
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 border-4 rounded-2xl flex items-center justify-center z-30 transition-all duration-300 ${isActive ? 'bg-red-600 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.8)] scale-110' : isPassed ? 'bg-black border-red-900/50 text-zinc-600' : 'bg-black border-zinc-800 text-white'}`}
                  >
                    <span className="text-xl md:text-2xl transition-transform">
                      {isPassed ? <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-red-600/50" /> : event.icon}
                    </span>
                  </div>

                  {/* HIGH VISIBILITY LABELS BELOW TRACK */}
                  <div className="absolute -bottom-24 md:-bottom-[104px] whitespace-nowrap text-center pointer-events-none">
                    <p className={`font-orbitron text-[10px] md:text-sm font-black uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-red-500 drop-shadow-[0_2px_10px_rgba(239,68,68,0.8)] scale-110' : 'text-zinc-400'}`}>
                      { }
                    </p>
                    <p className={`text-[9px] md:text-[10px] font-mono font-bold tracking-[0.2em] mt-1 transition-colors ${isActive ? 'text-white' : 'text-zinc-600'}`}>
                      {event.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* THE CAR (Highly Detailed F1 Top-Down View) */}
          <motion.div
            style={{ left: carX }}
            className="absolute z-40 pointer-events-none drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] -translate-x-1/2"
          >
            <svg viewBox="0 0 160 80" className="w-32 h-16 md:w-48 md:h-24">
              {/* Tires (Front & Rear) */}
              <rect x="25" y="8" width="24" height="16" rx="4" fill="#0c0c0c" />
              <rect x="25" y="56" width="24" height="16" rx="4" fill="#0c0c0c" />
              <rect x="115" y="10" width="20" height="14" rx="3" fill="#0c0c0c" />
              <rect x="115" y="56" width="20" height="14" rx="3" fill="#0c0c0c" />

              {/* Suspension Arms */}
              <path d="M49 16 L65 25 M49 64 L65 55 M100 25 L115 17 M100 55 L115 63" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />

              {/* Floor / Underbody (Carbon Fiber Look) */}
              <path d="M30 20 L130 24 L130 56 L30 60 Z" fill="#151515" />

              {/* Rear Wing */}
              <path d="M10 16 L25 16 L25 64 L10 64 Z" fill="#ef4444" />
              <rect x="14" y="18" width="5" height="44" fill="#fff" opacity="0.9" />
              {/* Rear Wing Endplates */}
              <rect x="8" y="14" width="20" height="4" fill="#991b1b" />
              <rect x="8" y="62" width="20" height="4" fill="#991b1b" />

              {/* Engine Cover / Main Body */}
              <path d="M25 35 L50 22 L90 22 L115 30 L135 34 L135 46 L115 50 L90 58 L50 58 L25 45 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.5" />

              {/* Cockpit & Halo area */}
              <rect x="52" y="32" width="24" height="16" rx="8" fill="#000" />

              {/* Driver Helmet */}
              <circle cx="68" cy="40" r="5.5" fill="#fff" stroke="#000" strokeWidth="1" />

              {/* Halo Framework */}
              <path d="M78 40 L60 30 M78 40 L60 50 M78 40 L88 40" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />

              {/* Sidepods Detail */}
              <path d="M50 20 L80 20 L75 25 L50 25 Z" fill="#111" />
              <path d="M50 60 L80 60 L75 55 L50 55 Z" fill="#111" />

              {/* Front Wing */}
              <path d="M135 20 L155 24 L155 56 L135 60 Z" fill="#ef4444" />
              <rect x="140" y="24" width="4" height="32" fill="#fff" opacity="0.9" />
              {/* Front Wing Endplates */}
              <rect x="132" y="18" width="25" height="4" fill="#991b1b" />
              <rect x="132" y="58" width="25" height="4" fill="#991b1b" />

              {/* Little nose cone detail */}
              <path d="M115 35 L145 38 L145 42 L115 45 Z" fill="#000" opacity="0.2" />
            </svg>
          </motion.div>

        </div>
      </div>

      {/* DYNAMIC CARD DISPLAY: Shows up when car passes an event node */}
      <div className="h-[200px] w-full max-w-3xl mx-auto px-4 mt-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedEvent ? (
            <motion.div
              key={selectedEvent.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full bg-[#0d0d0e] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative"
            >
              {/* Accent Line */}
              <div className="absolute top-0 left-0 w-1/3 h-1 bg-red-600 rounded-r-full" />

              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                {/* Icon */}
                <div className="w-16 h-16 shrink-0 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                  {selectedEvent.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white leading-none">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-2 flex items-center justify-center md:justify-start gap-1.5 whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5" /> {selectedEvent.date}, 2026
                  </p>
                  <p className="text-zinc-400 text-sm mt-3 font-medium leading-relaxed max-w-xl">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Prize / Action */}
                <div className="shrink-0 w-full md:w-auto bg-black/40 border border-zinc-800 rounded-xl p-4 flex flex-row md:flex-col items-center justify-between md:justify-center gap-3">
                  <div className="flex items-center gap-2 md:flex-col">
                    <Trophy className="w-5 h-5 text-red-600" />
                    <p className="text-[9px] font-black uppercase text-zinc-500 tracking-wider">Reward</p>
                  </div>
                  <p className="text-sm font-black uppercase text-white tracking-tight">{selectedEvent.prize}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="empty-state"
              className="flex flex-col items-center justify-center text-zinc-600 gap-3"
            >
              <MapPin className="w-8 h-8 opacity-50 animate-bounce" />
              <p className="font-orbitron font-bold uppercase tracking-widest text-xs">Scroll to drive to a checkpoint</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};