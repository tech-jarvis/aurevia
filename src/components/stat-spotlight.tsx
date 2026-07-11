"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { stats } from "@/content/stats";
import { Reveal } from "./ui/reveal";

/** Single-stat spotlight panel with prev/next controls, cycling through `stats`. */
export function StatSpotlight() {
  const [index, setIndex] = useState(0);
  const stat = stats[index];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + stats.length) % stats.length);
  };

  return (
    <Reveal className="flex flex-col justify-between rounded-2xl border border-line bg-surface-2/60 p-8">
      <div>
        <div className="heading text-5xl text-gold-gradient sm:text-6xl">
          {stat.value}
        </div>
        <div className="mt-2 heading text-base tracking-wide text-cream">
          {stat.label}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{stat.sub}</p>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous stat"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next stat"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </Reveal>
  );
}
