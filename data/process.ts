export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    title: "Understand",
    description:
      "The story, the footage and the objective. What the video has to do before a single clip is placed on the timeline.",
  },
  {
    id: "02",
    title: "Craft",
    description:
      "Structure, pacing, transitions, sound and visual language — built as one decision rather than layered effects.",
  },
  {
    id: "03",
    title: "Refine",
    description:
      "Detail work. Frame-level timing, colour continuity and audio balance, reviewed against the original intent.",
  },
  {
    id: "04",
    title: "Deliver",
    description:
      "Final review, formats for every destination, and source files handed over clean.",
  },
];
