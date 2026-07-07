import { ImageResponse } from "next/og";
import { INVOI_GRADIENT } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INVOI_GRADIENT.css,
          borderRadius: 40,
          color: "white",
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        in
      </div>
    ),
    { ...size },
  );
}