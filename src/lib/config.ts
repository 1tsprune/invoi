export const APP = {
  name: "Invoi",
  slug: "invoi",
  initials: "in",
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://invoi.1tsprune.com";

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

