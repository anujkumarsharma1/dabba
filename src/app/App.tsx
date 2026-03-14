import React, { useState } from "react";
import { Toaster } from "sonner";
import "../index.css";
import "../styles/fonts.css";
// import { Navbar } from './components/Navbar'; // Navigation is integrated in ThreeHero
import { ThreeHero } from "./components/ThreeHero";
import { EventsTimeline } from "./components/EventsTimeline";
import { Tracks } from "./components/Tracks";
// import { RacingJourney } from "./components/RacingJourney";
import { SponsorshipRequest } from "./components/SponsorshipRequest";
import { FAQ } from "./components/FAQ";
import TestimonialSection from "../components/TestimonialSection";
import PrizePoolExperience from "../components/prizepool/PrizePoolExperience";
import Footer from "../components/Footer";

// F1-themed racing separator
const Separator = () => (
  <div className="relative flex items-center justify-center py-6">
    {/* Left line */}
    <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-red-600/60 to-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)]" />
    {/* Checkered center */}
    <div className="mx-4 flex gap-[2px]">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col gap-[2px]">
          <div className={`h-[6px] w-[6px] ${i % 2 === 0 ? 'bg-red-600' : 'bg-zinc-800'}`} />
          <div className={`h-[6px] w-[6px] ${i % 2 === 0 ? 'bg-zinc-800' : 'bg-red-600'}`} />
        </div>
      ))}
    </div>
    {/* Right line */}
    <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-red-600/60 to-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)]" />
  </div>
);

function App() {
  const [showFaq, setShowFaq] = useState(false);
  const [showSponsorForm, setShowSponsorForm] = useState(false);

  const handleFaqClick = () => {
    if (!showFaq) {
      setShowFaq(true);
      window.setTimeout(() => {
        document.getElementById("faq-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
      return;
    }

    document.getElementById("faq-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSponsorClick = () => {
    if (!showSponsorForm) {
      setShowSponsorForm(true);
      window.setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
      return;
    }

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="bg-black min-h-screen text-white font-poppins selection:bg-red-500 selection:text-white overflow-x-hidden">
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            backdropFilter: "blur(10px)",
          },
        }}
      />

      <main>
        {/* Hero Section */}
        <div id="hero">
          <ThreeHero
            onFaqClick={handleFaqClick}
            onSponsorClick={handleSponsorClick}
          />
        </div>

        <Separator />
        <div id="circuit-roadmap">
          <EventsTimeline />
        </div>

        <Separator />
        <Tracks />

        {/* <RacingJourney /> */}

        <Separator />

        <div id="testimonial-garage">
          <TestimonialSection />
        </div>

        {showFaq && (
          <section id="faq-section" className="scroll-mt-24">
            <FAQ />
          </section>
        )}

        <div id="prizepool">
          <PrizePoolExperience />
        </div>

        {showSponsorForm && (
          <>
            <Separator />
            <SponsorshipRequest />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
