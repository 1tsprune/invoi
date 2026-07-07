import { ImageResponse } from "next/og";
import { INVOI_GRADIENT } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 9,
          color: "white",
          fontSize: 14,
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