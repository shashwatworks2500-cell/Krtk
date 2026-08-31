export type Service = {
  id: string;
  title: string;
  description: string;
  /** Deliverables listed as small metadata under the row. */
  includes: string[];
};

export const services: Service[] = [
  {
    id: "01",
    title: "Short Form Editing",
    description:
      "Cuts built for feeds — hooks that land immediately, pacing that never stalls, captions and sound treated as part of the edit rather than an afterthought.",
    includes: ["Hook structure", "Captions", "Sound design"],
  },
  {
    id: "02",
    title: "Reels & Social Content",
    description:
      "Vertical-native editing with a consistent visual language, so a feed of separate posts still reads as one brand.",
    includes: ["9:16 native", "Series consistency", "Platform delivery"],
  },
  {
    id: "03",
    title: "Long Form Video Editing",
    description:
      "Structure first. Story order, redundancy removed, retention shaped across the full runtime before a single transition is placed.",
    includes: ["Story structure", "Retention pacing", "Chaptering"],
  },
  {
    id: "04",
    title: "Commercial / Brand Videos",
    description:
      "Brand work where the edit carries the message — clean, deliberate, and cut to a defined objective rather than a trend.",
    includes: ["Concept to cut", "Versioning", "Broadcast-safe delivery"],
  },
  {
    id: "05",
    title: "Cinematic Editing",
    description:
      "Narrative pacing, colour continuity and sound working together. Restraint where it matters and impact where it counts.",
    includes: ["Colour continuity", "Sound layering", "Narrative pacing"],
  },
  {
    id: "06",
    title: "YouTube / Creator Editing",
    description:
      "Long-term creator partnerships with a repeatable process, predictable turnaround and an edit style that stays recognisably yours.",
    includes: ["Repeatable process", "Turnaround windows", "Style continuity"],
  },
];
