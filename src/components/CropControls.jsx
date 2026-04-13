export default function CropControls({
  aspectLocked,
  setAspectLocked,
  aspectOption,
  setAspectOption,
  onReset,
  disabled,
}) {
  return (
    <div className="mt-4 rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={aspectLocked}
            onChange={(event) => setAspectLocked(event.target.checked)}
            aria-label="Lock aspect ratio"
          />
          Lock aspect ratio
        </label>

        <select
          value={aspectOption}
          onChange={(event) => setAspectOption(event.target.value)}
          aria-label="Aspect ratio options"
          disabled={!aspectLocked}
          className="rounded-lg border border-border bg-[#13172a] px-3 py-2 text-sm"
        >
          <option value="1:1">1:1</option>
          <option value="3:4">3:4</option>
          <option value="4:5">4:5</option>
        </select>

        <button
          type="button"
          onClick={onReset}
          disabled={disabled}
          aria-label="Reset to AI suggestion"
          className="rounded-full border border-slate-500 px-4 py-2 text-sm"
        >
          Reset to AI Suggestion
        </button>
      </div>
    </div>
  );
}
