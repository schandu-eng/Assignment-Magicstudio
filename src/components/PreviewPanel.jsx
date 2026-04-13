import { useEffect, useRef } from "react";

export default function PreviewPanel({ imageRef, cropRect, onDownload, onDiscard, busyState }) {
  const previewRef = useRef(null);

  useEffect(() => {
    if (!previewRef.current || !imageRef.current || !cropRect) {
      return;
    }

    const canvas = previewRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const image = imageRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const sourceX = cropRect.x * scaleX;
    const sourceY = cropRect.y * scaleY;
    const sourceWidth = cropRect.width * scaleX;
    const sourceHeight = cropRect.height * scaleY;

    canvas.width = Math.max(1, Math.floor(sourceWidth));
    canvas.height = Math.max(1, Math.floor(sourceHeight));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
  }, [cropRect, imageRef]);

  return (
    <aside className="rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-3 text-lg font-semibold">Live Preview</h3>
      <div className="rounded-xl border border-border bg-[#12162a] p-3">
        <canvas ref={previewRef} className="w-full rounded-lg" aria-label="Live crop preview" />
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onDownload}
          disabled={busyState === "exporting"}
          className="flex-1 rounded-full bg-cta-gradient px-4 py-2 text-sm font-semibold"
          aria-label="Download cropped image"
        >
          {busyState === "exporting" ? "Preparing..." : "Download"}
        </button>
        <button
          type="button"
          onClick={onDiscard}
          disabled={busyState === "exporting"}
          className="rounded-full border border-slate-500 px-4 py-2 text-sm"
          aria-label="Discard image"
        >
          Discard
        </button>
      </div>
    </aside>
  );
}
