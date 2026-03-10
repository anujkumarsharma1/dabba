import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import TestimonialCard from "./TestimonialCard";

type Testimonial = {
  name: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Shashank Tiwari",
    quote:
      "Solution isn't just a tech fest - it's where IT students' innovative ideas come alive.",
  },
  {
    name: "Participant 2",
    quote:
      "The atmosphere felt like race day in a paddock: high intensity, real teamwork, and endless learning.",
  },
  {
    name: "Participant 3",
    quote:
      "From brainstorming to final execution, every round pushed us to build faster and think sharper.",
  },
  {
    name: "Participant 4",
    quote:
      "Solution gave us the perfect platform to turn raw concepts into polished, real-world prototypes.",
  },
  {
    name: "Participant 5",
    quote:
      "Competing with top minds and mentors made this one of the most energizing events of the year.",
  },
];

function getCircularDistance(
  index: number,
  centerIndex: number,
  total: number,
) {
  const rawDistance = index - centerIndex;
  const half = Math.floor(total / 2);

  if (rawDistance > half) {
    return rawDistance - total;
  }

  if (rawDistance < -half) {
    return rawDistance + total;
  }

  return rawDistance;
}

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsCompact(window.innerWidth < 1024);
      setIsMobile(window.innerWidth < 640);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 3300);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const spacing = isMobile ? 132 : isCompact ? 185 : 320;

  const cards = useMemo(
    () =>
      testimonials.map((testimonial, cardIndex) => {
        const distance = getCircularDistance(
          cardIndex,
          activeIndex,
          testimonials.length,
        );

        const absDistance = Math.abs(distance);
        const translateX = distance * spacing;
        const translateZ =
          absDistance === 0 ? 0 : absDistance === 1 ? -120 : -220;
        const rotateY = distance * -20;
        const scale = absDistance === 0 ? 1 : absDistance === 1 ? 0.92 : 0.82;
        const blur = absDistance >= 2 ? 1.4 : absDistance === 1 ? 0.25 : 0;
        const zIndex = testimonials.length - absDistance;

        return {
          key: `${testimonial.name}-${cardIndex}`,
          testimonial,
          translateX,
          translateZ,
          rotateY,
          scale,
          blur,
          zIndex,
          distance,
        };
      }),
    [activeIndex, spacing],
  );

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#050506_0%,#090a0d_45%,#040405_100%)] py-16 sm:py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.18),transparent_72%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-8 bottom-16 h-16 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_68%)] blur-xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-400">
            Student Voices
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-5xl">
            Testimonial Garage
          </h2>
          <p className="mt-5 text-sm text-gray-400 sm:text-base">
            Formula 1 inspired participant cards floating on a premium curved 3D
            stage.
          </p>
        </div>

        <motion.div
          className="relative mt-12 h-[390px] w-full sm:mt-16 sm:h-[430px] lg:mt-20 lg:h-[500px]"
          style={{ perspective: "1600px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.06}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) {
              setActiveIndex((current) => (current + 1) % testimonials.length);
            } else if (info.offset.x > 70) {
              setActiveIndex(
                (current) =>
                  (current - 1 + testimonials.length) % testimonials.length,
              );
            }

            setIsPaused(false);
          }}
        >
          <div className="relative h-full w-full [transform-style:preserve-3d]">
            {cards.map(({ key, translateX, distance }) => (
              <motion.div
                key={`trail-${key}`}
                className="pointer-events-none absolute left-1/2 top-1/2"
                initial={false}
                animate={{
                  x: translateX,
                  y: "-50%",
                  opacity: Math.abs(distance) > 2 ? 0.1 : 0.26,
                  scaleX: Math.abs(distance) === 0 ? 1.18 : 0.92,
                }}
                transition={{ type: "spring", stiffness: 110, damping: 22 }}
                style={{
                  marginLeft: isMobile ? "-110px" : "-170px",
                  zIndex: 0,
                }}
              >
                <div className="h-[3px] w-[220px] bg-gradient-to-r from-transparent via-red-500/35 to-transparent blur-md animate-[trailFlow_2.8s_ease-in-out_infinite] sm:w-[340px]" />
              </motion.div>
            ))}

            {cards.map(
              ({
                key,
                testimonial,
                translateX,
                translateZ,
                rotateY,
                scale,
                blur,
                zIndex,
                distance,
              }) => (
                <motion.div
                  key={key}
                  className={`absolute left-1/2 top-1/2 ${Math.abs(distance) === 0 ? "after:pointer-events-none after:absolute after:-inset-6 after:-z-10 after:rounded-[2rem] after:bg-red-500/10 after:blur-2xl" : ""}`}
                  initial={false}
                  animate={{
                    x: translateX,
                    y: "-50%",
                    z: translateZ,
                    rotateY,
                    scale,
                    filter: `blur(${blur}px)`,
                    opacity: Math.abs(distance) > 2 ? 0.46 : 1,
                  }}
                  whileHover={{
                    rotateX: 6,
                    rotateY: -6,
                    scale: Math.abs(distance) === 0 ? 1.07 : 1.03,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.68,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex,
                    marginLeft: isMobile ? "-120px" : "-140px",
                    willChange: "transform, filter, opacity",
                  }}
                >
                  <div className="animate-[floatCard_6s_ease-in-out_infinite]">
                    <TestimonialCard
                      name={testimonial.name}
                      quote={testimonial.quote}
                    />
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
