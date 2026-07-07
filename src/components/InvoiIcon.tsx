import { useId } from "react";
import { INVOI_GRADIENT } from "@/lib/brand";

type Props = {
  size?: number;
  className?: string;
  title?: string;
};

export function InvoiIcon({ size = 32, className, title = "Invoi" }: Props) {
  const uid = useId().replace(/:/g, "");
  const gradId = `invoi-grad-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor={INVOI_GRADIENT.from} />
          <stop offset="0.5" stopColor={INVOI_GRADIENT.via} />
          <stop offset="1" stopColor={INVOI_GRADIENT.to} />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradId})`} />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fill="white"
        fontSize="13.5"
        fontWeight="900"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        letterSpacing="-0.04em"
      >
        in
      </text>
    </svg>
  );
}