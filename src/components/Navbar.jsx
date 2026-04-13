export default function Navbar({ onUploadClick, disabled }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-[#0b0e1a]/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-cta-gradient shadow-glow" aria-hidden="true" />
          <p className="text-lg font-semibold tracking-wide">Autocrop</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-slate-300 md:block">Try it out for yourself</p>
          <button
            type="button"
            onClick={onUploadClick}
            aria-label="Upload image"
            disabled={disabled}
            className="rounded-full bg-cta-gradient px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
          >
            Upload
          </button>
        </div>
      </div>
    </header>
  );
}
