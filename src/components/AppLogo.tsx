import { InvoiIcon } from "@/components/InvoiIcon";
import { INVOI_SHADOW } from "@/lib/brand";

type Props = {
  size?: "sm" | "md";
};

const SIZES = { sm: 28, md: 32 } as const;

export function AppLogo({ size = "md" }: Props) {
  return (
    <div className="shrink-0" style={{ filter: `drop-shadow(${INVOI_SHADOW})` }}>
      <InvoiIcon size={SIZES[size]} />
    </div>
  );
}