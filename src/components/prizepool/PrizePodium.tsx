import { motion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";
import podium from "../../public/images/f1-podium.jpg";

type PrizePodiumProps = {
  raceFinished: boolean;
};

const podiumSlots = [
  { title: "Runner Up", amount: "$25,000", height: "h-44", icon: Medal },
  { title: "Champion", amount: "$50,000", height: "h-56", icon: Crown },
  { title: "Third Place", amount: "$10,000", height: "h-36", icon: Trophy },
];

export default function PrizePodium({ raceFinished }: PrizePodiumProps) {
  return (
    <motion.section className="mt-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0c0e13] p-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
          Final Standings
        </p>

        <h3 className="mt-3 text-center text-3xl font-black uppercase text-white">
          Prize Podium
        </h3>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
          {podiumSlots.map((slot, index) => {
            const Icon = slot.icon;

            return (
              <motion.article
                key={slot.title}
                className={`relative overflow-hidden rounded-2xl border border-zinc-700/70 p-4 ${slot.height}`}
              >
                <img
                  src={podium}
                  className="absolute inset-0 h-full w-full object-cover opacity-15"
                />

                <Icon className="relative h-6 w-6 text-red-400" />

                <p className="relative mt-4 text-xs uppercase text-zinc-400">
                  {slot.title}
                </p>

                <p className="relative mt-2 text-2xl font-black text-white">
                  {slot.amount}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}