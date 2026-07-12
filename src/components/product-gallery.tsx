"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryImage = { url: string; alt: string };

/** Main product photo with a clickable thumbnail rail. */
export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 sm:gap-4">
      <div className="flex flex-row gap-3 sm:flex-col">
        {images.map((img, i) => (
          <button
            key={img.url + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition-colors sm:h-20 sm:w-20",
              i === active ? "border-gold" : "border-line hover:border-gold/50",
            )}
          >
            <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface-2">
        {current && (
          <Image
            src={current.url}
            alt={current.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
