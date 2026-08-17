export type ResultStat = {
  label: string;
  value: string;
  /** false = qualitative/directional outcome, rendered understated rather than as a big counter. */
  verified: boolean;
};

export type ProjectImage = {
  src: string;
  alt: string;
  kind: "hero" | "mockup" | "detail";
  /** Curated stock placeholder, not a real product screenshot — swap for real work when available. */
  isPlaceholder?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  projectSlug?: string;
};

export type Project = {
  slug: string;
  title: string;
  year: number;
  client: string;
  category: string[];
  summary: string;
  challenge?: string;
  solution?: string;
  results: ResultStat[];
  testimonial?: Testimonial;
  themeColor: string;
  themeColorSoft: string;
  logo?: string;
  images: ProjectImage[];
  stack: string[];
  liveUrl?: string;
};
