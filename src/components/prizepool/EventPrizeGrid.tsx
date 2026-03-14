import { motion } from "framer-motion";
import trophy from "../../public/images/trophy.jpg";
import track from "../../public/images/f1-track.jpg";
import garage from "../../public/images/garage.jpg";
import podium from "../../public/images/f1-podium.jpg";

type EventPrizeGridProps = {
  raceFinished: boolean;
};

const eventPrizes = [
  { name: "Gaming", amount: "₹130K", image: trophy },
  { name: "Tech Events", amount: "₹70K", image: track },
  { name: "Open Events", amount: "₹80K", image: garage },
  { name: "Robotics", amount: "₹80K", image: podium },
  { name: "EV Events", amount: "₹50K", image: trophy },
  { name: "Creative", amount: "₹40K", image: track },
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
            className="relative overflow-hidden rounded-2xl border border-zinc-700/70 bg-[linear-gradient(170deg,#13161d,#0a0b0f)] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            viewport={{ once: true, amount: 0.45 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <img
              src={event.image}
              className="absolute inset-0 h-full w-full object-cover opacity-10"
            />

            <p className="relative text-xs uppercase tracking-wide text-zinc-400">
              {event.name}
            </p>

            <p className="relative mt-3 text-2xl font-black text-white">
              {event.amount}
            </p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}