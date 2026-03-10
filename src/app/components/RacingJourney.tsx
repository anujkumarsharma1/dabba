import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Flag, ShieldCheck, Trophy, Gauge } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Registration",
    description:
      "Sign up and build your driver profile. Secure your spot in the qualifiers.",
    icon: ShieldCheck,
    date: "Feb 01 - Feb 28",
  },
  {
    id: 2,
    title: "Qualifiers",
    description:
      "Time trials to determine the grid positions. Only the fastest proceed.",
    icon: Gauge,
    date: "Mar 05 - Mar 10",
  },
  {
    id: 3,
    title: "Semi-Finals",
    description:
      "Head-to-head races in groups. The top 3 from each group advance.",
    icon: Flag,
    date: "Mar 20 - Mar 25",
  },
  {
    id: 4,
    title: "Grand Final",
    description:
      "The ultimate showdown for the championship title and the prize pool.",
    icon: Trophy,
    date: "Apr 15",
  },
];

export const RacingJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6" ref={containerRef}>
        <div className="mb-14 text-center sm:mb-20">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 uppercase">
            The <span className="text-red-600">Journey</span> to Glory
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-poppins">
            From rookie to legend. Every champion starts somewhere. Here is your
            path to the podium.
          </p>
        </div>

        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-6 h-full w-1 rounded-full bg-zinc-800 md:left-1/2 md:-translate-x-1/2"></div>

          {/* Animated Progress Line */}
          <motion.div
            style={{ height: progressHeight }}
            className="absolute left-6 z-10 w-1 origin-top rounded-full bg-red-600 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="relative z-20 flex flex-col gap-10 sm:gap-14 md:gap-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ margin: "-100px" }}
                className={`flex items-center justify-between gap-4 pl-14 md:pl-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:gap-16`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-[45%] ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <div className="mb-2">
                    <span className="text-red-500 font-orbitron font-bold text-sm tracking-widest uppercase mb-1 block">
                      {step.date}
                    </span>
                    <h3 className="mb-2 text-xl font-orbitron font-bold text-white sm:text-2xl md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 font-poppins text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon Node */}
                <div className="absolute left-0 top-1/2 flex h-12 w-12 shrink-0 -translate-y-1/2 items-center justify-center md:static md:h-16 md:w-16 md:translate-y-0">
                  <div className="w-full h-full bg-zinc-900 border-2 border-zinc-700 rounded-full flex items-center justify-center z-20 group hover:border-red-500 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <step.icon className="w-5 h-5 md:w-8 md:h-8 text-white group-hover:text-red-500 transition-colors" />
                  </div>
                  <div className="absolute inset-0 bg-zinc-950 w-20 h-20 -z-10 rounded-full"></div>{" "}
                  {/* Mask line behind node */}
                </div>

                {/* Spacer for layout balance */}
                <div className="w-[45%] hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
