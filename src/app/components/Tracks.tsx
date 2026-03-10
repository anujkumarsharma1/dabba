import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Zap, Flag, Timer } from "lucide-react";

const tracks = [
  {
    id: 1,
    name: "Neon Marina",
    category: "Street Circuit",
    length: "5.06 km",
    turns: 23,
    cover: "https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg",
    titleImg: "https://ggayane.github.io/css-experiments/cards/dark_rider-title.png",
    character: "https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp",
  },
  {
    id: 2,
    name: "Cyber Dunes",
    category: "Endurance",
    length: "7.12 km",
    turns: 18,
    cover: "https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg",
    titleImg: "https://ggayane.github.io/css-experiments/cards/force_mage-title.png",
    character: "https://ggayane.github.io/css-experiments/cards/force_mage-character.webp",
  },
  {
    id: 3,
    name: "Orbital Ring",
    category: "Speed",
    length: "4.30 km",
    turns: 12,
    cover: "https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg",
    titleImg: "https://ggayane.github.io/css-experiments/cards/dark_rider-title.png",
    character: "https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp",
  },
  {
    id: 4,
    name: "Midnight Tokyo",
    category: "Drift",
    length: "3.80 km",
    turns: 28,
    cover: "https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg",
    titleImg: "https://ggayane.github.io/css-experiments/cards/force_mage-title.png",
    character: "https://ggayane.github.io/css-experiments/cards/force_mage-character.webp",
  },
  {
    id: 5,
    name: "Skyline Ridge",
    category: "Sprint",
    length: "2.45 km",
    turns: 10,
    cover: "https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg",
    titleImg: "https://ggayane.github.io/css-experiments/cards/dark_rider-title.png",
    character: "https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp",
  },
  {
    id: 6,
    name: "Azure Coast",
    category: "Classic",
    length: "6.20 km",
    turns: 15,
    cover: "https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg",
    titleImg: "https://ggayane.github.io/css-experiments/cards/force_mage-title.png",
    character: "https://ggayane.github.io/css-experiments/cards/force_mage-character.webp",
  },
];

export const Tracks = () => {
  // Track which card is currently active (for mobile clicks)
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section id="tracks" className="relative py-24 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
            Legendary <span className="text-red-600">Circuits</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-red-600 skew-x-[-20deg]"></div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 gap-y-24 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => {
            const isActive = activeCard === track.id;

            return (
              <div
                key={track.id}
                onClick={() => toggleCard(track.id)}
                className={`group relative flex h-[400px] w-full items-end justify-center px-9 [perspective:2500px] cursor-pointer`}
              >
                {/* WRAPPER (Tilt Logic) */}
                <div className={`absolute inset-0 z-[-1] transition-all duration-500 [transform-style:preserve-3d] 
                  ${isActive ? '[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)_translateZ(0)] shadow-[2px_35px_32px_-8px_rgba(0,0,0,0.75)]' : ''}
                  group-hover:[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)_translateZ(0)]
                  group-hover:shadow-[2px_35px_32px_-8px_rgba(0,0,0,0.75)]`}>

                  <img
                    src={track.cover}
                    className="h-full w-full object-cover rounded-lg"
                    alt="cover"
                  />

                  {/* Overlays */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-t from-[#0c0d13] via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`} />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-transparent to-[#0c0d13] opacity-100" />
                </div>

                {/* TITLE IMAGE (Float Forward) */}
                <img
                  src={track.titleImg}
                  className={`relative w-full transition-transform duration-500 ${isActive ? '[transform:translate3d(0%,-50px,100px)]' : ''} group-hover:[transform:translate3d(0%,-50px,100px)]`}
                  alt="title"
                />

                {/* CHARACTER IMAGE (Pop Out) */}
                <img
                  src={track.character}
                  className={`absolute z-[-1] w-full transition-all duration-500 
                    ${isActive ? 'opacity-100 [transform:translate3d(0%,-30%,100px)]' : 'opacity-0'}
                    group-hover:opacity-100 group-hover:[transform:translate3d(0%,-30%,100px)] pointer-events-none`}
                  alt="character"
                />

                {/* Stats revealed on hover/active */}
                <div className={`absolute bottom-[-60px] flex w-full justify-between border-t border-white/10 pt-4 transition-all duration-500 
                  ${isActive ? 'bottom-[-40px] opacity-100' : 'opacity-0'} 
                  group-hover:bottom-[-40px] group-hover:opacity-100`}>
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-400">
                    <MapPin className="h-3 w-3 text-red-600" /> {track.length}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-400">
                    <Timer className="h-3 w-3 text-red-600" /> {track.turns} Turns
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};