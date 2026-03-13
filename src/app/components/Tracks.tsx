import { useState } from "react";
import { Zap, Gauge } from "lucide-react";

import arcadeImg from "../../assets/events/AR-CADE.png";
import bPlanImg from "../../assets/events/B PLAN.png";
import bgmiImg from "../../assets/events/BGMI.png";
import codeRedImg from "../../assets/events/CODE RED.png";
import crackHuntImg from "../../assets/events/CRACK HUNT.png";
import cssBattleImg from "../../assets/events/CSS BATTLE.png";
import currentClashImg from "../../assets/events/CURRENT CLASH.png";
import cyberSecQuizImg from "../../assets/events/CYBER SEC QUIZ.png";
import datavizImg from "../../assets/events/DATAVIZ.png";
import driveLinkImg from "../../assets/events/DRIVE LINK.png";
import ethonImg from "../../assets/events/ETHON.png";
import freeFireImg from "../../assets/events/Free Fire.png";
import gateronicsImg from "../../assets/events/GATERONICS.png";
import imaginateImg from "../../assets/events/IMAGINATE.png";
import photographyImg from "../../assets/events/PHOTOGRAPHY.png";
import placementAptiImg from "../../assets/events/PLACEMENT APTI.png";
import projectJupyterImg from "../../assets/events/PROJECT JUPYTER.png";
import sheCodeImg from "../../assets/events/SHE CODE.png";
import solidWorksImg from "../../assets/events/SOLID WORKS.png";
import valorantImg from "../../assets/events/Valorant.png";

const tracks = [
  { id: 1, name: "AR-CADE", category: "Event", length: "TBD", turns: "TBD", cover: arcadeImg, character: arcadeImg },
  { id: 2, name: "B PLAN", category: "Event", length: "TBD", turns: "TBD", cover: bPlanImg, character: bPlanImg },
  { id: 3, name: "BGMI", category: "Esports", length: "TBD", turns: "TBD", cover: bgmiImg, character: bgmiImg },
  { id: 4, name: "CODE RED", category: "Event", length: "TBD", turns: "TBD", cover: codeRedImg, character: codeRedImg },
  { id: 5, name: "CRACK HUNT", category: "Event", length: "TBD", turns: "TBD", cover: crackHuntImg, character: crackHuntImg },
  { id: 6, name: "CSS BATTLE", category: "Event", length: "TBD", turns: "TBD", cover: cssBattleImg, character: cssBattleImg },
  { id: 7, name: "CURRENT CLASH", category: "Event", length: "TBD", turns: "TBD", cover: currentClashImg, character: currentClashImg },
  { id: 8, name: "CYBER SEC QUIZ", category: "Event", length: "TBD", turns: "TBD", cover: cyberSecQuizImg, character: cyberSecQuizImg },
  { id: 9, name: "DATAVIZ", category: "Event", length: "TBD", turns: "TBD", cover: datavizImg, character: datavizImg },
  { id: 10, name: "DRIVE LINK", category: "Event", length: "TBD", turns: "TBD", cover: driveLinkImg, character: driveLinkImg },
  { id: 11, name: "ETHON", category: "Event", length: "TBD", turns: "TBD", cover: ethonImg, character: ethonImg },
  { id: 12, name: "Free Fire", category: "Esports", length: "TBD", turns: "TBD", cover: freeFireImg, character: freeFireImg },
  { id: 13, name: "GATERONICS", category: "Event", length: "TBD", turns: "TBD", cover: gateronicsImg, character: gateronicsImg },
  { id: 14, name: "IMAGINATE", category: "Event", length: "TBD", turns: "TBD", cover: imaginateImg, character: imaginateImg },
  { id: 15, name: "PHOTOGRAPHY", category: "Event", length: "TBD", turns: "TBD", cover: photographyImg, character: photographyImg },
  { id: 16, name: "PLACEMENT APTI", category: "Event", length: "TBD", turns: "TBD", cover: placementAptiImg, character: placementAptiImg },
  { id: 17, name: "PROJECT JUPYTER", category: "Event", length: "TBD", turns: "TBD", cover: projectJupyterImg, character: projectJupyterImg },
  { id: 18, name: "SHE CODE", category: "Event", length: "TBD", turns: "TBD", cover: sheCodeImg, character: sheCodeImg },
  { id: 19, name: "SOLID WORKS", category: "Event", length: "TBD", turns: "TBD", cover: solidWorksImg, character: solidWorksImg },
  { id: 20, name: "Valorant", category: "Esports", length: "TBD", turns: "TBD", cover: valorantImg, character: valorantImg },
];

export const Tracks = () => {
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
            Featured <span className="text-red-600">Events</span>
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

                  {/* Cover photo - real supercar image */}
                  <img
                    src={track.cover}
                    className="h-full w-full object-cover rounded-lg"
                    alt={track.name}
                  />

                  {/* Overlays */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-t from-[#0c0d13] via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`} />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-transparent to-[#0c0d13] opacity-100" />
                </div>

                {/* CAR NAME (Float Forward) - replaces titleImg with styled text */}
                <div
                  className={`relative w-full text-center transition-transform duration-500 pb-2 ${isActive ? '[transform:translate3d(0%,-50px,100px)]' : ''} group-hover:[transform:translate3d(0%,-50px,100px)]`}
                >
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    {track.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-red-500">
                    {track.category}
                  </p>
                </div>

                {/* CHARACTER IMAGE (Pop Out) - real supercar photo pops out */}
                <img
                  src={track.character}
                  className={`absolute z-[-1] w-full rounded-md transition-all duration-500 
                    ${isActive ? 'opacity-100 [transform:translate3d(0%,-30%,100px)]' : 'opacity-0'}
                    group-hover:opacity-100 group-hover:[transform:translate3d(0%,-30%,100px)] pointer-events-none`}
                  alt={track.name}
                />

                {/* Stats revealed on hover/active */}
                <div className={`absolute bottom-[-60px] flex w-full justify-between border-t border-white/10 pt-4 transition-all duration-500 
                  ${isActive ? 'bottom-[-40px] opacity-100' : 'opacity-0'} 
                  group-hover:bottom-[-40px] group-hover:opacity-100`}>
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-400">
                    <Gauge className="h-3 w-3 text-red-600" /> {track.length}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-400">
                    <Zap className="h-3 w-3 text-red-600" /> {track.turns}
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