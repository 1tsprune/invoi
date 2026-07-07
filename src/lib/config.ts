export const APP = {
  name: "Invoi",
  slug: "invoi",
  initials: "in",
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const DONATION = {
  url: "https://trakteer.id/prunepruneprune/gift",
  goalPercent: 66.1,
} as const;

export const SOCIAL = {
  twitter: {
    url: "https://x.com/itsprune",
    handle: "@itsprune",
    name: "Prune",
    avatarUrl: "/dev-prune.jpg",
  },
} as const;

export const WELCOME_KEY = "invoi:welcome-seen";

export const LEGACY_WELCOME_KEY = "kwitansi-cepat:welcome-seen";