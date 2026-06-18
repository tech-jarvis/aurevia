/** Global reach — regions served (from the company profile world map). */

export type Region = { name: string; note: string };

export const regions: Region[] = [
  { name: "North America", note: "Delivering quality and reliable apparel solutions across the region." },
  { name: "South America", note: "Expanding partnerships and supporting growing brands." },
  { name: "Europe", note: "Trusted by brands seeking premium standards." },
  { name: "Middle East", note: "Building strong relationships and delivering excellence." },
  { name: "Asia Pacific", note: "Strong manufacturing and sourcing network." },
  { name: "Africa", note: "Supporting growth and development across emerging markets." },
];

/** Our promise — global reach commitments. */
export const globalPromise: string[] = [
  "Committed to quality, consistency and sustainability.",
  "Our goal is to exceed expectations and grow together with clients across the world.",
];
