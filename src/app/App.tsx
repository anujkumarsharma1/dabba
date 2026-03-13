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

// Neon separator component
const Separator = () => (
  <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent my-8 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
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

        <PrizePoolExperience />

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
