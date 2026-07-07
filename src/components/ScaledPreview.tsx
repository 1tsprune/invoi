"use client";

import { useEffect, useRef } from "react";
import { DocumentPreview } from "@/components/DocumentPreview";

type Props = {
  scale?: number;
  exportRef?: React.RefObject<HTMLDivElement | null>;
};

export function ScaledPreview({ scale = 0.72, exportRef }: Props) {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resize = () => {
      if (innerRef.current && outerRef.current) {
        outerRef.current.style.height = `${Math.ceil(innerRef.current.getBoundingClientRect().height)}px`;
      }
    };
    const frame = requestAnimationFrame(resize);
    const observer = new ResizeObserver(resize);
    if (innerRef.current) observer.observe(innerRef.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [scale]);

  return (
    <>
      <div ref={outerRef} className="relative w-full overflow-hidden">
        <div
          ref={innerRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${Math.round(100 / scale)}%`,
          }}
        >
          <DocumentPreview panelMode />
        </div>
      </div>

      {exportRef ? (
        <div className="pointer-events-none fixed -left-[9999px] top-0 opacity-0" aria-hidden>
          <DocumentPreview ref={exportRef} forExport />
        </div>
      ) : null}
    </>
  );
}