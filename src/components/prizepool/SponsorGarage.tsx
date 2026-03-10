import { motion } from "framer-motion";

type SponsorGarageProps = {
  raceFinished: boolean;
};

const sponsorPrizes = [
  {
    title: "BEST LEDGER",
    amount: "$20,000",
    brand: "aws",
    color: "from-orange-500/20",
    borderColor: "border-orange-500/50"
  },
  {
    title: "MOTEL",
    amount: "$1,500",
    brand: "polygon",
    color: "from-blue-500/20",
    borderColor: "border-blue-500/50"
  },
  {
    title: "SECTION",
    amount: "$1,000",
    brand: "HIRE MORNINGSTAR",
    color: "from-red-600/20",
    borderColor: "border-red-600/50"
  },
];

export default function SponsorGarage({ raceFinished }: SponsorGarageProps) {
  return (
    <motion.section
      className="mt-20 px-4"
      initial={{ opacity: 0 }}
      animate={raceFinished ? { opacity: 1 } : { opacity: 0.5 }}
    >
      {/* SECTION HEADER WITH LINES */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-red-600" />
        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white sm:text-4xl">
          Sponsor Garage
        </h3>
        <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-red-600" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {sponsorPrizes.map((sponsor, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative group overflow-hidden rounded-lg border-b-2 border-r-2 ${sponsor.borderColor} bg-black p-1`}
          >
            {/* The "Glass" Inner Container */}
            <div className={`relative flex items-center justify-between bg-gradient-to-br ${sponsor.color} to-zinc-900/90 p-6 rounded-md border border-white/10`}>

              {/* Left Side: Brand/Logo Placeholder */}
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tighter text-white opacity-80 italic uppercase">
                  {sponsor.brand}
                </span>
              </div>

              {/* Right Side: Title & Amount */}
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {sponsor.title}
                </p>
                <p className="text-3xl font-black tracking-tight text-white drop-shadow-md">
                  {sponsor.amount}
                </p>
              </div>

              {/* Red Detail Accent (F1 Style) */}
              <div className="absolute top-0 right-0 h-1 w-12 bg-red-600" />
            </div>

            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 -z-10 bg-red-600/0 blur-xl transition-all group-hover:bg-red-600/10" />
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}