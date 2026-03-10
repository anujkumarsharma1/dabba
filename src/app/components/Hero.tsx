import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-center items-center">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1707996631102-abbd259fe465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGb3JtdWxhJTIwMSUyMHJhY2luZyUyMGNhciUyMGFuZCUyMGRyaXZlciUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MTQxOTUxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
          alt="F1 Racing Car" 
          className="w-full h-full object-cover opacity-70 scale-105"
        />
      </motion.div>

      {/* Speed Lines Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="font-poppins font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
            Invite. Play. Earn
          </h1>
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-poppins text-gray-300 text-lg md:text-2xl max-w-2xl mb-12 font-light"
        >
          Get up to 200 USDT bonus when your friends join.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="#invite"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-red-600 rounded-2xl font-poppins font-medium text-lg text-white overflow-hidden transition-all hover:bg-red-700 hover:shadow-[0_0_40px_rgba(255,0,0,0.6)] shadow-[0_0_20px_rgba(255,0,0,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get your invite link
            </span>
          </a>
          
          <div className="text-gray-400 text-sm md:text-base font-poppins text-center">
            <p>Share your link to friend</p>
            <p>Get rewarded in <span className="text-red-500 cursor-pointer hover:underline">rewards hub</span></p>
          </div>
          
          <div className="mt-2 text-red-500 animate-pulse">
             ...
          </div>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-white/10 py-8 z-30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white mb-1">3 Ranks</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white mb-1">5,000+</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white mb-1">$1.2M USDT</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white mb-1">3,200+</span>
          </div>
        </div>
      </div>
    </section>
  );
};
