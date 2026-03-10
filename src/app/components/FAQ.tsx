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
        question: "How do I join the league?",
        answer:
          "Simply click the 'Register Now' button on the homepage, fill out your profile, and complete the qualifying lap time submission.",
      },
      {
        question: "Is there an entry fee?",
        answer:
          "The base league is free to enter. Pro tiers and championship series may have entry fees contributing to the prize pool.",
      },
    ],
  },
  {
    category: "Rules & Regulations",
    icon: Shield,
    items: [
      {
        question: "What platforms are supported?",
        answer:
          "We support PC, PS5, and Xbox Series X/S. Cross-play is enabled for all major events.",
      },
      {
        question: "Are assists allowed?",
        answer:
          "Qualifiers are strict (no assists). Lower tier leagues allow ABS and Traction Control.",
      },
    ],
  },
  {
    category: "Prizes",
    icon: Trophy,
    items: [
      {
        question: "How is the prize pool distributed?",
        answer:
          "Prizes are distributed via bank transfer or crypto within 30 days of the season finale. See the Prize Pool section for breakdown.",
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
