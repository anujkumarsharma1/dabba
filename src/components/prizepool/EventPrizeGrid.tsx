import { motion } from "framer-motion";

type EventPrizeGridProps = {
  raceFinished: boolean;
};

const eventPrizes = [
  { name: "AI Challenge", amount: "$20,000" },
  { name: "Web Development", amount: "$15,000" },
  { name: "Blockchain Track", amount: "$12,500" },
  { name: "Robotics Event", amount: "$10,000" },
];

export default function EventPrizeGrid({ raceFinished }: EventPrizeGridProps) {
  return (
    <motion.section
      className="mt-16"
      initial={{ opacity: 0, y: 24 }}
      animate={raceFinished ? { opacity: 1, y: 0 } : { opacity: 0.16, y: 20 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
    >
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">
          Event Breakdown
        </p>
        <h3 className="mt-2 text-3xl font-black uppercase tracking-wide text-white">
          Event Prize Grid
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {eventPrizes.map((event, index) => (
          <motion.article
            key={event.name}
            className="rounded-2xl border border-zinc-700/70 bg-[linear-gradient(170deg,#13161d,#0a0b0f)] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            viewport={{ once: true, amount: 0.45 }}
            whileHover={{ y: -6, scale: 1.02 }}
            animate={
              raceFinished ? { borderColor: "rgba(239,68,68,0.45)" } : {}
            }
          >
            <p className="text-xs uppercase tracking-wide text-zinc-400">
              {event.name}
            </p>
            <p className="mt-3 text-2xl font-black text-white">
              {event.amount}
            </p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
