import manImage from "../assets/man.svg";
import barImage from "../assets/bar.svg";
import f1Logo from "../assets/f1.svg";

type TestimonialCardProps = {
  name: string;
  quote: string;
};

export default function TestimonialCard({ name, quote }: TestimonialCardProps) {
  return (
    <article className="relative h-[420px] w-[280px] overflow-hidden rounded-2xl border border-red-500/50 bg-[linear-gradient(145deg,#0b0b0b,#151515,#0a0a0a)] p-5 pb-8 shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_30px_rgba(239,68,68,0.22)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_60%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(255,90,90,0.16),transparent_48%),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.08),transparent_36%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[120%] h-full w-[120%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_6s_linear_infinite]" />
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 bg-[linear-gradient(135deg,transparent_0%,transparent_45%,rgba(239,68,68,0.42)_45%,rgba(239,68,68,0.42)_53%,transparent_53%,transparent_60%,rgba(220,38,38,0.5)_60%,rgba(220,38,38,0.5)_68%,transparent_68%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex flex-col items-start gap-2">
          <img
            src={f1Logo}
            alt="F1 logo"
            className="h-10 w-auto object-contain"
            loading="lazy"
            decoding="async"
          />
          <p className="text-xs font-bold uppercase tracking-wide text-white">
            Testimonials
          </p>
        </header>

        <div className="mt-4 grid flex-1 grid-cols-[108px_1fr] gap-4">
          <div className="flex items-center justify-center">
            <img
              src={manImage}
              alt={`${name} portrait`}
              className="h-[200px] w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                Name
              </p>
              <p className="mt-1 text-lg font-bold uppercase leading-tight text-white">
                {name}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">"{quote}"</p>
          </div>
        </div>

        <div className="relative mt-4 border-t border-white/10 pt-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-300">
            Participant
          </p>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em]">
            <span className="text-white">Solutions - </span>
            <span className="text-red-500">2k25</span>
          </p>
        </div>

        <div className="mt-6 pb-8">
          <div className="rounded-md border border-zinc-300/70 bg-zinc-100/95 px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_16px_rgba(0,0,0,0.28)]">
            <img
              src={barImage}
              alt="Barcode"
              className="h-[60px] w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
