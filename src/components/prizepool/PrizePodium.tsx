import { motion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";
import podium from "../../public/images/f1-podium.jpg";

type PrizePodiumProps = {
  raceFinished: boolean;
};

const podiumSlots = [
  {
    title: "Tech + Gaming",
    amount: "₹150K",
    icon: Medal,
    position: "2nd",
    accent: "#3b82f6",
    gradientFrom: "from-blue-600/20",
    borderAccent: "border-blue-500/30",
    glowColor: "rgba(59,130,246,0.3)",
    heightClass: "sm:mt-10",
    mobileOrder: "order-2 sm:order-1",
  },
  {
    title: "Robo + EV",
    amount: "₹130K",
    icon: Crown,
    position: "1st",
    accent: "#ef4444",
    gradientFrom: "from-red-600/20",
    borderAccent: "border-red-500/30",
    glowColor: "rgba(239,68,68,0.35)",
    heightClass: "sm:mt-0",
    mobileOrder: "order-1 sm:order-2",
  },
  {
    title: "Open + Creative",
    amount: "₹120K",
    icon: Trophy,
    position: "3rd",
    accent: "#f59e0b",
    gradientFrom: "from-amber-500/20",
    borderAccent: "border-amber-500/30",
    glowColor: "rgba(245,158,11,0.3)",
    heightClass: "sm:mt-14",
    mobileOrder: "order-3",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: "easeOut" as const,
    },
  }),
};

export default function PrizePodium({ raceFinished }: PrizePodiumProps) {
  return (
    <motion.section className="mt-6 sm:mt-8">
      {/* Section header */}
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-400 sm:text-xs sm:tracking-[0.35em]">
            Final Standings
          </p>
          <h3 className="mt-2 font-rajdhani text-2xl font-black uppercase tracking-tight text-white sm:text-4xl">
            Prize <span className="text-red-500">Podium</span>
          </h3>
          <div className="mx-auto mt-3 h-1 w-16 bg-red-600 skew-x-[-20deg]" />
        </div>

        {/* Podium grid */}
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-start sm:gap-6"
          style={{ perspective: "1200px" }}
        >
          {podiumSlots.map((slot, index) => {
            const Icon = slot.icon;

            return (
              <motion.article
                key={slot.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{
                  y: -12,
                  rotateX: 5,
                  rotateY: index === 0 ? 6 : index === 2 ? -6 : 0,
                  scale: 1.04,
                  transition: { duration: 0.35, ease: "easeOut" },
                }}
                className={`group relative overflow-hidden rounded-xl border ${slot.borderAccent} bg-[linear-gradient(145deg,#0e1015,#080a0e)] p-[1px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 sm:rounded-2xl ${slot.heightClass} ${slot.mobileOrder}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Animated border glow on hover */}
                <div
                  className="absolute -inset-[1px] rounded-xl opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100 sm:rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${slot.accent}55, transparent 40%, transparent 60%, ${slot.accent}55)`,
                  }}
                />

                {/* Inner card */}
                <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(145deg,#0c0e13,#0a0b0f)] p-5 sm:rounded-2xl sm:p-7">
                  {/* Background podium image */}
                  <img
                    src={podium}
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.16]"
                    alt=""
                  />

                  {/* Gradient overlay */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${slot.gradientFrom} to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-80`}
                  />

                  {/* Grid pattern */}
                  <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:18px_18px]" />

                  {/* Shine sweep */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-[200%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:animate-[shine_1.5s_ease-in-out_forwards] group-hover:opacity-100" />
                  </div>

                  {/* Corner accent stripes */}
                  <div
                    className="absolute right-0 top-0 h-[3px] w-12 transition-all duration-500 group-hover:w-20"
                    style={{ backgroundColor: slot.accent }}
                  />
                  <div
                    className="absolute right-0 top-0 h-12 w-[3px] transition-all duration-500 group-hover:h-20"
                    style={{ backgroundColor: slot.accent }}
                  />

                  {/* Racing stripes bottom-left */}
                  <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 opacity-15">
                    <div
                      className="absolute h-full w-full"
                      style={{
                        background: `linear-gradient(135deg, transparent 0%, transparent 40%, ${slot.accent}99 40%, ${slot.accent}99 47%, transparent 47%, transparent 55%, ${slot.accent}77 55%, ${slot.accent}77 62%, transparent 62%)`,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Position badge + Icon */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-sm sm:h-10 sm:w-10 sm:rounded-xl"
                        style={{
                          borderColor: `${slot.accent}44`,
                          backgroundColor: `${slot.accent}15`,
                          boxShadow: `0 0 20px ${slot.accent}20`,
                        }}
                      >
                        <Icon
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          style={{ color: slot.accent }}
                        />
                      </div>
                      <span
                        className="font-rajdhani text-[11px] font-bold uppercase tracking-[0.15em] sm:text-xs sm:tracking-[0.2em]"
                        style={{ color: slot.accent }}
                      >
                        {slot.position}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="mt-4 font-rajdhani text-base font-bold uppercase tracking-[0.08em] text-white sm:mt-5 sm:text-xl sm:tracking-wider">
                      {slot.title}
                    </h4>

                    {/* Divider */}
                    <div className="mt-3 flex items-center gap-2">
                      <div
                        className="h-[2px] w-6 transition-all duration-500 group-hover:w-12"
                        style={{ backgroundColor: slot.accent }}
                      />
                      <div
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: slot.accent }}
                      />
                    </div>

                    {/* Amount */}
                    <motion.p
                      className="mt-3 font-rajdhani text-3xl font-black tracking-tight text-white sm:mt-4 sm:text-5xl"
                      style={{
                        textShadow: `0 0 25px ${slot.glowColor}`,
                      }}
                    >
                      {slot.amount}
                    </motion.p>

                    {/* Bottom label */}
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 sm:tracking-[0.18em]">
                      Combined Prize Pool
                    </p>
                  </div>
                </div>

                {/* Bottom glow on hover */}
                <div
                  className="absolute inset-x-4 -bottom-2 h-8 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                  style={{ backgroundColor: slot.accent }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
