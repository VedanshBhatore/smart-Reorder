import { useState } from "react";

interface ScreenshotSlotProps {
  /** Path under /public, e.g. "/screens/01-account-tab.png" */
  src: string;
  caption: string;
  annotation: string;
}

export function ScreenshotSlot({ src, caption, annotation }: ScreenshotSlotProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="rounded-2xl bg-white p-3 shadow-sm">
      {failed ? (
        <div className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-300 bg-ink-100 p-4 text-center">
          <span className="text-2xl">📷</span>
          <p className="text-xs font-medium text-ink-500">
            Add your screenshot at<br />
            <code className="text-[11px]">public{src}</code>
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={caption}
          className="aspect-[9/16] w-full rounded-xl object-cover"
          onError={() => setFailed(true)}
        />
      )}
      <figcaption className="mt-2 text-xs text-ink-700">
        <span className="font-semibold text-ink-900">{caption}.</span> {annotation}
      </figcaption>
    </figure>
  );
}
