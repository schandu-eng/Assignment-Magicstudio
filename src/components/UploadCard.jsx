export default function UploadCard({
  getRootProps,
  getInputProps,
  isDragActive,
  onManualUpload,
  disabled,
  busyState,
  uploadComplete,
  onPreviewEdit,
  onDiscard,
  error,
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
      <div
        {...getRootProps({
          className: `relative min-h-[320px] rounded-2xl border border-dashed border-border p-6 text-center transition ${
            isDragActive ? "border-fuchsia-400" : ""
          }`,
          role: "button",
          "aria-label": "Drag and drop image upload",
        })}
      >
        <input {...getInputProps()} />

        {busyState === "uploading" ? (
          <div className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-2xl">
            <div className="h-52 animate-pulse bg-cta-gradient/60" />
          </div>
        ) : null}

        <p className="text-sm text-slate-300">Drag image to upload</p>

        {!uploadComplete ? (
          <div className="mt-24 flex justify-center">
            <button
              type="button"
              onClick={onManualUpload}
              disabled={disabled}
              aria-label="Manual upload"
              className="rounded-full border border-slate-500 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-fuchsia-400"
            >
              Manual Upload
            </button>
          </div>
        ) : (
          <div className="mt-16 space-y-3">
            <p className="text-sm text-emerald-300">Image uploaded successfully.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onPreviewEdit}
                className="rounded-full bg-cta-gradient px-4 py-2 text-sm font-semibold text-white"
              >
                Preview and Edit
              </button>
              <button
                type="button"
                onClick={onDiscard}
                className="rounded-full border border-slate-500 px-4 py-2 text-sm"
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </div>

      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
