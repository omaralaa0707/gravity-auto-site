import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";
import type { FleetId } from "./media";

export type SpecRow = {
  label: "motor" | "power" | "mileage" | "range" | "warranty" | "status";
  value: string;
};

export type FleetCopy = {
  figures: SpecRow[];
};

/**
 * Gravity Auto's own name is the one thing every other dealership in this
 * series lacks: a literal physics concept to build the signature piece
 * around. The shared schema has no vocabulary for that, or for an account
 * this small — 207 followers, the smallest sourced for this series — or
 * for the fact that every one of their four listings was posted three
 * times over with slightly different photos each time.
 */
export type GravityContent = SiteContent & {
  hero: SiteContent["hero"] & {
    followersLabel: string;
    postsLabel: string;
    wellAlt: string;
  };
  fleet: {
    eyebrow: string;
    heading: string;
    intro: string;
    figuresLabel: string;
    viewPost: string;
    specLabels: Record<SpecRow["label"], string>;
    cars: Record<FleetId, FleetCopy>;
  };
  account: {
    eyebrow: string;
    heading: string;
    body: string[];
  };
  contact: SiteContent["contact"];
};

export function useGravity() {
  return useContent() as GravityContent;
}
