import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CropEditor from "./components/CropEditor";
import PreviewPanel from "./components/PreviewPanel";
import { AppProvider, useAppContext } from "./context/AppContext";
import { useUpload } from "./hooks/useUpload";
import { useCropSuggestion } from "./hooks/useCropSuggestion";
import { useCropInteraction } from "./hooks/useCropInteraction";
import { useExport } from "./hooks/useExport";

function AppContent() {
  const { state, dispatch } = useAppContext();
  const upload = useUpload();
  const editorRef = useRef(null);
  const imageRef = useRef(null);
  const runExport = useExport({ dispatch });

  const cropControls = useCropInteraction({
    cropRect: state.cropRect,
    imageRef,
    dispatch,
  });

  useCropSuggestion({
    imageRef,
    editorVisible: state.editorVisible,
    cachedSuggestion: state.cachedSuggestion,
    dispatch,
  });

  useEffect(() => {
    if (!state.toast) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      dispatch({ type: "SET_TOAST", payload: "" });
    }, 2400);

    return () => clearTimeout(timeout);
  }, [state.toast, dispatch]);

  const globalBusy = state.busyState === "uploading" || state.busyState === "exporting";
  const uploadDisabled = globalBusy || Boolean(state.imageDataURL);

  const showEditor = () => {
    dispatch({ type: "SHOW_EDITOR" });
    editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const discardAll = () => {
    dispatch({ type: "RESET" });
  };

  const handleDownload = async () => {
    await runExport({ imageRef, cropRect: state.cropRect });
  };

  return (
    <div className="min-h-screen pb-12 text-slate-100">
      <Navbar onUploadClick={upload.openFileDialog} disabled={uploadDisabled} />

      <Hero
        upload={upload}
        disabled={globalBusy}
        busyState={state.busyState}
        hasImage={Boolean(state.imageDataURL)}
        onPreviewEdit={showEditor}
        onDiscard={discardAll}
        error={state.error}
      />

      <input
        ref={upload.inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={upload.onInputChange}
      />

      {state.toast ? (
        <div className="fixed bottom-6 right-6 rounded-lg border border-emerald-400/50 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {state.toast}
        </div>
      ) : null}

      {state.editorVisible && state.imageDataURL ? (
        <section ref={editorRef} className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-2">
          <CropEditor
            imageDataURL={state.imageDataURL}
            imageRef={imageRef}
            cropRect={state.cropRect}
            onCropChange={cropControls.onCropChange}
            aspectValue={cropControls.aspectValue}
            controls={{
              aspectLocked: cropControls.aspectLocked,
              setAspectLocked: cropControls.setAspectLocked,
              aspectOption: cropControls.aspectOption,
              setAspectOption: cropControls.setAspectOption,
              onReset: () => cropControls.resetToSuggestion(state.cachedSuggestion),
            }}
            disabled={globalBusy}
          />

          <PreviewPanel
            imageRef={imageRef}
            cropRect={state.cropRect}
            onDownload={handleDownload}
            onDiscard={discardAll}
            busyState={state.busyState}
          />
        </section>
      ) : null}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
