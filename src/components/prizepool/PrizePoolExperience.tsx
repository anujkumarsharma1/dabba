import { motion } from "framer-motion";
import PrizePodium from "./PrizePodium";
import SponsorGarage from "./SponsorGarage";

export default function PrizePoolExperience() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#030304_0%,#07090d_40%,#06070a_100%)]">
      {/* Decorative overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,35,45,0.2),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:46px_46px]" />

      {/* Hero — compact with visual flair */}
      <div className="relative flex items-center justify-center py-16 sm:py-20 lg:py-24">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Decorative lines flanking the label */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-red-500 sm:w-16" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-400 sm:text-xs">
              Total Prize Pool
            </p>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-red-500 sm:w-16" />
          </div>

          {/* Main value — animated glow pulse */}
          <motion.h2
            className="mt-4 font-rajdhani text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-red-200 to-red-500 sm:text-8xl lg:text-9xl"
            style={{
              filter: "drop-shadow(0 0 25px rgba(239,68,68,0.35))",
            }}
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(239,68,68,0.25))",
                "drop-shadow(0 0 40px rgba(239,68,68,0.5))",
                "drop-shadow(0 0 20px rgba(239,68,68,0.25))",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ₹8L+
          </motion.h2>

          <p className="mt-3 text-sm text-zinc-500 sm:text-base">
            Distributed across all events
          </p>

          {/* Decorative skewed bar */}
          <div className="mx-auto mt-4 h-1 w-20 bg-red-600 skew-x-[-20deg]" />
        </motion.header>
      </div>

      {/* Prize sections */}
      <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
        <PrizePodium raceFinished={true} />
        <SponsorGarage raceFinished={true} />
      </div>
    </section>
  );
}
