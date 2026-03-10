import { motion } from "framer-motion";
import PrizePodium from "./PrizePodium";
import EventPrizeGrid from "./EventPrizeGrid";
import SponsorGarage from "./SponsorGarage";

export default function PrizePoolExperience() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#030304_0%,#07090d_40%,#06070a_100%)]">
      {/* Decorative overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,35,45,0.2),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:46px_46px]" />

      {/* Hero – compacted to reduce extra empty space */}
      <div className="relative flex h-[38vh] min-h-[260px] items-center justify-center sm:h-[42vh] lg:h-[46vh]">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
            Total Prize Pool
          </p>
          <h2 className="mt-4 bg-gradient-to-b from-white via-red-200 to-red-500 bg-clip-text text-5xl font-black uppercase text-transparent drop-shadow-[0_0_25px_rgba(239,68,68,0.38)] sm:text-7xl">
            $100,000
          </h2>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base">
            Distributed across all events
          </p>
        </motion.header>
      </div>

      {/* Prize sections */}
      <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
        <PrizePodium raceFinished={true} />
        <EventPrizeGrid raceFinished={true} />
        <SponsorGarage raceFinished={true} />
      </div>
    </section>
  );
}
