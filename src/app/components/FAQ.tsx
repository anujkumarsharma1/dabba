import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "motion/react";
import {
  ChevronDown,
  HelpCircle,
  FileText,
  Trophy,
  Shield,
} from "lucide-react";
import { cn } from "../../lib/utils";

const faqCategories = [
  {
    category: "Registration",
    icon: FileText,
    items: [
      {
        question: "How do I register for Solutions 2K26?",
        answer: (
          <span>
            You can register online through{" "}
            <a
              href="https://unstop.com/college-fests/solutions-2k26-army-institute-of-technology-ait-pune-433506"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 underline transition-colors"
            >
              Click Here
            </a>
            .
          </span>
        ),
      },
      {
        question: "Is there a registration fee? Can I participate in multiple events?",
        answer:
          "Registration fees vary depending on the specific event. Yes, you can absolutely participate in multiple events! Just ensure the schedules of your chosen events do not clash.",
      },
      {
        question: "Who is eligible to participate?",
        answer:
          "Solutions is open to all college and university students. You must carry a valid physical student ID card from your respective institution on the days of the event.",
      },
    ],
  },
  {
    category: "Event Details",
    icon: HelpCircle,
    items: [
      {
        question: "What do I need to bring on the day of the event?",
        answer:
          "Bring your college ID card and any specific equipment required for your registered events (e.g., your own laptop for coding events, robots for Robo Sumo).",
      },
    ],
  },
  {
    category: "Prizes & Venue",
    icon: Trophy,
    items: [
      {
        question: "What is the total prize pool?",
        answer:
          "We offer a massive total prize pool of over ₹8L+ distributed across all categories, including Tech Events, Gaming, Robotics, EV Events, and Creative competitions!",
      },
      {
        question: "Where is the event located?",
        answer:
          "Solutions offers a mix of Online and Offline events. Offline events are hosted at the Army Institute of Technology (AIT), Dighi Hills, Pune.",
      },
    ],
  },
];

export const FAQ = () => {
  return (
    <section className="relative bg-zinc-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="mb-10 text-center font-orbitron text-3xl font-bold uppercase text-white sm:text-4xl md:mb-12 md:text-5xl">
          Frequently Asked <span className="text-red-600">Questions</span>
        </h2>

        <div className="space-y-8">
          {faqCategories.map((cat, i) => (
            <div key={i} className="mb-8">
              <div className="flex items-center gap-3 mb-4 text-red-500 border-b border-red-900/30 pb-2">
                <cat.icon className="w-6 h-6" />
                <h3 className="font-orbitron font-bold text-xl uppercase tracking-wider">
                  {cat.category}
                </h3>
              </div>

              <Accordion.Root type="single" collapsible className="space-y-4">
                {cat.items.map((item, j) => (
                  <Accordion.Item
                    key={j}
                    value={`item-${i}-${j}`}
                    className="bg-zinc-900/40 border border-white/5 rounded-lg overflow-hidden data-[state=open]:border-red-500/30 transition-colors"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex justify-between items-center p-6 text-left group">
                        <span className="font-orbitron font-medium text-white group-hover:text-red-400 transition-colors">
                          {item.question}
                        </span>
                        <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="accordion-content overflow-hidden">
                      <div className="p-6 pt-0 text-gray-400 font-poppins leading-relaxed border-t border-white/5">
                        {item.answer}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
