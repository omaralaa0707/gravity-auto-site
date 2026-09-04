import type { GravityContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: GravityContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Gravity Auto",
    shortName: "GA",
    tagline: "Drive The Future — Today",
  },

  nav: [
    { label: "Fleet", href: "#fleet" },
    { label: "The account", href: "#account" },
    { label: "Visit", href: "#contact" },
  ],

  hero: {
    eyebrow: "Sheikh Zayed · Giza",
    headline: "Drive The Future — Today",
    sub: "Gravity Auto's own name is a physics term, so this page takes it literally: a real gravity well, warping a grid the way mass warps space. Their actual fleet is four cars — a BYD, a Volvo, a BMW and a Mercedes — every one under a year old or newly imported, each posted three separate times on an account with 207 followers.",
    primaryCta: "Call the showroom",
    secondaryCta: "See the fleet",
    followersLabel: "Followers",
    postsLabel: "Posts",
    wellAlt: "A real gravity well: a grid warped downward around a mass, the way spacetime curves — built to match the dealer's own name.",
  },

  about: { heading: "Gravity Auto", body: [] },
  services: { heading: "Fleet", items: [] },
  gallery: { heading: "Fleet", items: [] },

  fleet: {
    eyebrow: "The fleet",
    heading: "Four cars, each posted three times over",
    intro: "Every listing here was published three separate times with different frames each time — twelve posts sourced, four cars found. Figures are exactly what each caption states, nothing carried over between listings.",
    figuresLabel: "Published figures",
    viewPost: "See a post",
    specLabels: {
      motor: "Motor",
      power: "Power",
      mileage: "Mileage",
      range: "Range",
      warranty: "Warranty",
      status: "Status",
    },
    cars: {
      sealion: {
        figures: [
          { label: "status", value: "Brand new, import" },
          { label: "range", value: "605 km" },
        ],
      },
      xc60: {
        figures: [
          { label: "motor", value: "2000 cc" },
          { label: "power", value: "250 hp" },
          { label: "mileage", value: "5,000 km" },
        ],
      },
      bmw235: {
        figures: [
          { label: "motor", value: "2000 cc" },
          { label: "power", value: "300 hp" },
          { label: "mileage", value: "400 km" },
          { label: "warranty", value: "Local warranty" },
        ],
      },
      c180: {
        figures: [
          { label: "motor", value: "1500 cc" },
          { label: "power", value: "156 hp" },
          { label: "mileage", value: "1,700 km" },
        ],
      },
    },
  },

  account: {
    eyebrow: "The account",
    heading: "The smallest audience sourced for this series",
    body: [
      "207 followers, 375 posts — the smallest account behind any site built so far in this series, smaller even than a 516-follower dealer sourced earlier. Small doesn't mean thin: every listing carries a real spec line, and every car in the sample is a 2024 or later model with under 5,000 km on it.",
      "Their Volvo caption spells the same word \"Mototr\" in all three of its posts — a typo repeated exactly, not corrected here, because it's their own words verbatim.",
    ],
  },

  contact: {
    heading: "Visit",
    addressLabel: "Address",
    address: PROFILE.address,
    phoneLabel: "Phone",
    phones: [PROFILE.mainPhone],
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "Call the showroom",
  },

  footer: {
    disclaimer: "A concept design, built as a demonstration. Not an official Gravity Auto site, and not affiliated with them. All photography, marks and quoted copy belong to Gravity Auto.",
    rights: "Concept by Claude",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
