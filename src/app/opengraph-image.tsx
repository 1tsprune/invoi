import { ImageResponse } from "next/og";
import { INVOI_GRADIENT } from "@/lib/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Invoi — invoice satset, gaperlu login";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: INVOI_GRADIENT.css,
              borderRadius: 32,
              color: "white",
              fontSize: 52,
              fontWeight: 900,
              letterSpacing: "-0.04em",
            }}
          >
            in
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                letterSpacing: "-0.06em",
                color: "#18181b",
              }}
            >
              invoi
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: "#71717a",
              }}
            >
              invoice satset · gaperlu login
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}