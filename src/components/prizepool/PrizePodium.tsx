import { motion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";

type PrizePodiumProps = {
  raceFinished: boolean;
};

const podium = [
  {
    title: "Runner Up",
    amount: "$25,000",
    height: "h-44",
    icon: Medal,
  },
  {
    title: "Champion",
    amount: "$50,000",
    height: "h-56",
    icon: Crown,
  },
  {
    title: "Third Place",
    amount: "$10,000",
    height: "h-36",
    icon: Trophy,
  },
];

export default function PrizePodium({ raceFinished }: PrizePodiumProps) {
  return (
    <motion.section
      className="mt-20"
      initial={{ opacity: 0, y: 30 }}
      animate={raceFinished ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 20 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#101218,#0b0c10,#141720)] p-8 shadow-[0_0_40px_rgba(255,30,45,0.16)]"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
          Final Standings
        </p>
        <h3 className="mt-3 text-center text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
          Prize Podium
        </h3>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
          {podium.map((slot, index) => {
            const Icon = slot.icon;
            return (
              <motion.article
                key={slot.title}
                className={`relative overflow-hidden rounded-2xl border border-zinc-700/70 bg-[linear-gradient(180deg,#1f232c_0%,#101218_100%)] p-4 ${slot.height}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.4 }}
                animate={
                  raceFinished
                    ? { boxShadow: "0 0 30px rgba(239,68,68,0.25)" }
                    : {}
                }
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
                <Icon className="h-6 w-6 text-red-400" />
                <p className="mt-4 text-xs uppercase tracking-wide text-zinc-400">
                  {slot.title}
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {slot.amount}
                </p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
