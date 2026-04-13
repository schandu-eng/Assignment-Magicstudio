import UploadCard from "./UploadCard";

export default function Hero({
  upload,
  disabled,
  busyState,
  hasImage,
  onPreviewEdit,
  onDiscard,
  error,
}) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-10 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6 rounded-2xl border border-border bg-card p-8 lg:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-300">Autocrop</p>
        <h1 className="text-4xl font-semibold leading-tight text-slate-100 md:text-5xl lg:text-6xl">
          Get your perfect headshot within minutes
        </h1>
        <p className="bg-cta-gradient bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          Drag, customise, download.
        </p>
        <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
          Upload any portrait, use our smart crop suggestion, fine-tune it in seconds, and export a polished headshot
          ready for resumes, profiles, and portfolios.
        </p>
      </div>

      <UploadCard
        getRootProps={upload.dropzone.getRootProps}
        getInputProps={upload.dropzone.getInputProps}
        isDragActive={upload.dropzone.isDragActive}
        onManualUpload={upload.openFileDialog}
        disabled={disabled}
        busyState={busyState}
        uploadComplete={hasImage}
        onPreviewEdit={onPreviewEdit}
        onDiscard={onDiscard}
        error={error}
      />
    </section>
  );
}
