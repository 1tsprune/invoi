"use client";

import { useState } from "react";
import { SOCIAL } from "@/lib/config";

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
  rounded?: "square" | "full";
};

const SIZES = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
} as const;

export function DevAvatar({ size = "md", className = "", rounded = "square" }: Props) {
  const [failed, setFailed] = useState(false);
  const radius = rounded === "full" ? "rounded-full" : "rounded-[10px]";

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden border border-zinc-200/60 bg-zinc-900 text-sm font-black text-white shadow-inner ${SIZES[size]} ${radius} ${className}`}
      >
        {SOCIAL.twitter.name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={SOCIAL.twitter.avatarUrl}
      alt={SOCIAL.twitter.name}
      onError={() => setFailed(true)}
      className={`shrink-0 object-cover ${SIZES[size]} ${radius} border border-zinc-200/60 shadow-inner ${className}`}
    />
  );
}