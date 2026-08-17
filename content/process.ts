export type ProcessStage = {
  index: string;
  title: string;
  description: string;
};

export const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Discover",
    description:
      "We start with the business, not the brief — who it's for, what's actually broken, what success looks like in numbers.",
  },
  {
    index: "02",
    title: "Design",
    description:
      "Structure and interface built around real content and real user journeys, not a generic template.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "Engineered for the specifics of the problem — custom logic where it's needed, off-the-shelf where it isn't.",
  },
  {
    index: "04",
    title: "Grow",
    description:
      "Launch is the start of measurement, not the finish line — SEO, campaigns and iteration from real data.",
  },
];
