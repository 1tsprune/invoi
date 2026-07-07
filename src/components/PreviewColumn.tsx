"use client";

import { LivePreviewPanel } from "@/components/LivePreviewPanel";
import { DataBrowserPanel } from "@/components/DataBrowserPanel";

type Props = {
  exportRef?: React.RefObject<HTMLDivElement | null>;
  showDataBrowser?: boolean;
};

export function PreviewColumn({ exportRef, showDataBrowser = true }: Props) {
  return (
    <div className="flex min-h-0 flex-col">
      <div className="min-h-0 flex-1">
        <LivePreviewPanel exportRef={exportRef} />
      </div>
      {showDataBrowser ? (
        <div className="mt-4 shrink-0">
          <DataBrowserPanel />
        </div>
      ) : null}
    </div>
  );
}