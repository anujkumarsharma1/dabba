import { motion } from "framer-motion";

type SponsorGarageProps = {
  raceFinished: boolean;
};

const sponsors = [
  {
    name: "Rovu",
    tagline: "Innovation Partner",
    accent: "#ef4444",
    gradient: "from-red-600/25 via-red-900/10 to-transparent",
    borderGlow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]",
    corner: "bg-red-600",
  },
  {
    name: "Unstop",
    tagline: "Platform Partner",
    accent: "#3b82f6",
    gradient: "from-blue-600/25 via-blue-900/10 to-transparent",
    borderGlow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    corner: "bg-blue-500",
  },
  {
    name: "Budhani Bros",
    tagline: "Title Sponsor",
    accent: "#f59e0b",
    gradient: "from-amber-500/25 via-amber-900/10 to-transparent",
    borderGlow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    corner: "bg-amber-500",
  },
  {
    name: "Campus Times Pune",
    tagline: "Media Partner",
    accent: "#a855f7",
    gradient: "from-purple-600/25 via-purple-900/10 to-transparent",
    borderGlow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    corner: "bg-purple-500",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
      ease: "easeOut" as const,
    },
  }),
};

export default function SponsorGarage({ raceFinished }: SponsorGarageProps) {
  return (
    <motion.section
      className="mt-20 px-4"
      initial={{ opacity: 0 }}
      animate={raceFinished ? { opacity: 1 } : { opacity: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-red-600 sm:w-24" />
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-red-400 sm:text-xs">
            Powered By
          </p>
          <h3 className="mt-1 font-rajdhani text-2xl font-black italic uppercase tracking-tighter text-white sm:text-4xl">
            Sponsor Garage
          </h3>
        </div>
        <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-red-600 sm:w-24" />
      </div>

      {/* Sponsor Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
        {sponsors.map((sponsor, index) => (
          <motion.article
            key={sponsor.name}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              y: -8,
              scale: 1.03,
              transition: { duration: 0.28, ease: "easeOut" },
            }}
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(145deg,#0e1015,#080a0e)] p-[1px] shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition-shadow duration-500 ${sponsor.borderGlow}`}
          >
            {/* Animated border glow */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-0 blur-[1px] transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${sponsor.accent}44, transparent 40%, transparent 60%, ${sponsor.accent}44)`,
              }}
            />

            {/* Inner card */}
            <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#0e1015,#0a0c10)] p-6 sm:p-8">
              {/* Top gradient glow */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${sponsor.gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Grid pattern overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:20px_20px]" />

              {/* Animated shine sweep */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-[200%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:animate-[shine_1.8s_ease-in-out_forwards] group-hover:opacity-100" />
              </div>

              {/* Corner accent stripe */}
              <div
                className={`absolute right-0 top-0 h-1 w-16 ${sponsor.corner} transition-all duration-500 group-hover:w-24`}
              />
              <div
                className={`absolute right-0 top-0 h-16 w-1 ${sponsor.corner} transition-all duration-500 group-hover:h-24`}
              />

              {/* Racing stripes bottom-left */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 opacity-20">
                <div
                  className="absolute h-full w-full"
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, transparent 42%, ${sponsor.accent}88 42%, ${sponsor.accent}88 48%, transparent 48%, transparent 56%, ${sponsor.accent}66 56%, ${sponsor.accent}66 62%, transparent 62%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
                {/* Sponsor number badge */}
                <div
                  className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black"
                  style={{
                    borderColor: `${sponsor.accent}66`,
                    color: sponsor.accent,
                    backgroundColor: `${sponsor.accent}11`,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Sponsor name */}
                <h4 className="font-rajdhani text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
                  {sponsor.name}
                </h4>

                {/* Tagline */}
                <p
                  className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: sponsor.accent }}
                >
                  {sponsor.tagline}
                </p>

                {/* Decorative line */}
                <div className="mt-4 flex items-center gap-2">
                  <div
                    className="h-[2px] w-8 transition-all duration-500 group-hover:w-14"
                    style={{ backgroundColor: sponsor.accent }}
                  />
                  <div
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: sponsor.accent }}
                  />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}