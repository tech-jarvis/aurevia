/** Proof-point statistics shown across the site (from the company profile). */

export type Stat = { value: string; label: string; sub: string };

export const stats: Stat[] = [
  { value: "10+", label: "Years of Experience", sub: "Delivering excellence in apparel manufacturing." },
  { value: "200+", label: "Skilled Professionals", sub: "Our strength lies in our people and their expertise." },
  { value: "500+", label: "Advanced Machines", sub: "Modern technology for precision and efficiency." },
  { value: "1M+", label: "Pieces Monthly", sub: "Scalable capacity to meet growing demand." },
  { value: "30+", label: "Countries Served", sub: "Supplying quality apparel to clients worldwide." },
];

/** "Commitment to excellence" pillars (About page). */
export const commitments: { title: string; text: string }[] = [
  { title: "Quality", text: "We maintain the highest standards in every order and process." },
  { title: "Innovation", text: "We embrace modern technology and continuous improvement." },
  { title: "Reliability", text: "We deliver on our promises with consistency and transparency." },
  { title: "Partnership", text: "We grow together with our clients as a trusted manufacturing partner." },
  { title: "Global Focus", text: "We serve clients worldwide with a strong export capability." },
  { title: "Integrity", text: "We conduct business with honesty, ethics and professionalism." },
];
