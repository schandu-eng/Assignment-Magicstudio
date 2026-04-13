import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import CropControls from "./CropControls";

export default function CropEditor({
  imageDataURL,
  imageRef,
  cropRect,
  onCropChange,
  aspectValue,
  controls,
  disabled,
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4" aria-live="polite">
      <h2 className="mb-4 text-xl font-semibold">Crop Editor</h2>
      <div className="overflow-hidden rounded-xl border border-border bg-[#101427] p-3">
        {imageDataURL ? (
          <ReactCrop crop={cropRect || undefined} onChange={onCropChange} aspect={aspectValue} keepSelection>
            <img ref={imageRef} src={imageDataURL} alt="Uploaded portrait for editing" className="max-h-[520px] w-full object-contain" />
          </ReactCrop>
        ) : null}
      </div>

      <CropControls
        aspectLocked={controls.aspectLocked}
        setAspectLocked={controls.setAspectLocked}
        aspectOption={controls.aspectOption}
        setAspectOption={controls.setAspectOption}
        onReset={controls.onReset}
        disabled={disabled}
      />
    </section>
  );
}
