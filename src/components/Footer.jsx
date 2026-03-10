import React from "react";
import helmetImage from "../assets/helmet.svg";
import contourSvg from "../assets/contour.svg";

const navLinks = [
  { label: "HOME", href: "#" },
  { label: "ABOUT US", href: "#" },
  { label: "TIMELINE", href: "#" },
];

const socialLinks = [
  { label: "INSTAGRAM", href: "#" },
  { label: "LINKED IN", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-black px-2 sm:px-3">
      <div
        className="relative mx-auto my-4 w-full max-w-[1400px] overflow-hidden rounded-[22px] border-[5px] border-[#d42020] sm:my-6 sm:rounded-[30px] sm:border-[8px]"
        style={{
          backgroundColor: "#020202",
        }}
      >
        {/* Dedicated background layers keep the footer dark while preserving contour visibility. */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.68), rgba(0,0,0,0.9))",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${contourSvg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.62,
              mixBlendMode: "screen",
              filter: "saturate(1.25) contrast(1.08)",
            }}
          />
        </div>

        {/* MAIN GRID */}
        <div className="relative z-10 grid min-h-[430px] grid-cols-1 items-center px-4 py-8 sm:min-h-[500px] sm:px-6 lg:min-h-[560px] lg:grid-cols-[1fr_3fr_1fr] lg:px-16">
          {/* LEFT NAV */}
          <nav className="hidden lg:flex flex-col gap-4">
            <p
              className="mb-3 text-sm tracking-[0.3em] text-[#a34bff]"
              style={{ fontFamily: "Cinzel" }}
            >
              PAGES
            </p>

            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[2rem] leading-[1.1] tracking-[0.06em] text-white transition-all duration-300 hover:text-[#ff3a3a] hover:tracking-[0.08em]"
                style={{
                  fontFamily: "Oswald",
                  fontWeight: 700,
                  textShadow: "0 0 18px rgba(255,255,255,0.18)",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CENTER SECTION */}
          <div className="relative flex flex-col items-center justify-center py-6 sm:py-10 lg:py-16">
            {/* TITLE */}
            <div className="text-center leading-[0.9] select-none">
              {/* FIRST ROW */}
              <div className="flex justify-center items-baseline gap-3 lg:gap-5">
                <span
                  className="text-[clamp(2rem,10vw,5.6rem)] text-white font-black"
                  style={{ fontFamily: "Archivo Black" }}
                >
                  ALWAYS
                </span>

                <span
                  className="text-[clamp(2.2rem,10vw,6rem)] text-[#e02020]"
                  style={{
                    fontFamily: "Cormorant Garamond",
                    fontStyle: "italic",
                    fontWeight: 700,
                  }}
                >
                  BUILDING
                </span>
              </div>

              {/* SECOND ROW */}
              <div className="flex justify-center items-baseline gap-3 lg:gap-5">
                <span
                  className="text-[clamp(2rem,10vw,5.6rem)] text-white font-black"
                  style={{ fontFamily: "Archivo Black" }}
                >
                  THE
                </span>

                <span
                  className="text-[clamp(2.2rem,10vw,6rem)] text-[#e02020]"
                  style={{
                    fontFamily: "Cormorant Garamond",
                    fontStyle: "italic",
                    fontWeight: 700,
                  }}
                >
                  FUTURE
                </span>
              </div>
            </div>

            {/* HELMET + GLOW */}
            <div className="relative -mt-8 flex w-full justify-center pointer-events-none sm:-mt-12 lg:-mt-24">
              {/* RED GLOW */}
              <div
                className="absolute h-[240px] w-[240px] rounded-full sm:h-[330px] sm:w-[330px] lg:h-[430px] lg:w-[430px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,32,32,0.55) 0%, rgba(212,32,32,0.25) 40%, transparent 70%)",
                  filter: "blur(95px)",
                }}
              />

              {/* HELMET */}
              <img
                src={helmetImage}
                alt="Racing helmet"
                className="relative w-[250px] sm:w-[320px] lg:w-[420px] xl:w-[500px] drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)]"
                loading="lazy"
              />
            </div>

            {/* MOBILE QUICK LINKS */}
            <div className="mt-6 grid w-full grid-cols-2 gap-4 rounded-xl border border-white/10 bg-black/35 p-3 lg:hidden">
              <div>
                <p
                  className="mb-2 text-[10px] tracking-[0.24em] text-[#a34bff]"
                  style={{ fontFamily: "Cinzel" }}
                >
                  PAGES
                </p>
                <div className="space-y-1.5">
                  {navLinks.map((item) => (
                    <a
                      key={`mobile-${item.label}`}
                      href={item.href}
                      className="block text-base uppercase tracking-[0.03em] text-white transition hover:text-[#ff3a3a]"
                      style={{ fontFamily: "Oswald", fontWeight: 700 }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p
                  className="mb-2 text-[10px] tracking-[0.24em] text-[#74ff8b]"
                  style={{ fontFamily: "Cinzel" }}
                >
                  FOLLOW
                </p>
                <div className="space-y-1.5">
                  {socialLinks.map((item) => (
                    <a
                      key={`mobile-social-${item.label}`}
                      href={item.href}
                      className="block text-base uppercase tracking-[0.03em] text-white transition hover:text-[#74ff8b]"
                      style={{ fontFamily: "Oswald", fontWeight: 700 }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SOCIAL */}
          <nav className="hidden lg:flex flex-col items-end gap-4">
            <p
              className="mb-3 text-sm tracking-[0.3em] text-[#74ff8b]"
              style={{ fontFamily: "Cinzel" }}
            >
              FOLLOW ON
            </p>

            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[1.85rem] leading-[1.1] tracking-[0.05em] text-white transition-all duration-300 hover:text-[#74ff8b] hover:tracking-[0.08em]"
                style={{
                  fontFamily: "Oswald",
                  fontWeight: 700,
                  textShadow: "0 0 18px rgba(255,255,255,0.14)",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="relative z-10 grid grid-cols-1 gap-1 bg-[#d42020] px-4 py-2 text-[11px] tracking-[0.12em] text-black sm:grid-cols-[1fr_auto_1fr] sm:px-6 sm:text-sm sm:tracking-[0.15em]"
          style={{ fontFamily: "Orbitron" }}
        >
          <span className="text-center sm:text-left">ENGINEERED</span>
          <span className="text-center">BY THE TECHNICAL BOARD</span>
          <span className="text-center sm:text-right">DEVELOPED</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
