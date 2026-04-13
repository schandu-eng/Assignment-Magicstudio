import { useCallback, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { validateFile } from "../utils/validateFile";
import { useAppContext } from "../context/AppContext";

export function useUpload() {
  const inputRef = useRef(null);
  const { state, dispatch } = useAppContext();

  const processFile = useCallback(
    (file) => {
      const result = validateFile(file);

      if (!result.ok) {
        dispatch({ type: "SET_ERROR", payload: result.message });
        return;
      }

      dispatch({ type: "SET_BUSY_STATE", payload: "uploading" });
      dispatch({ type: "SET_ERROR", payload: "" });

      const reader = new FileReader();
      reader.onload = () => {
        dispatch({
          type: "SET_IMAGE",
          payload: { file, dataURL: typeof reader.result === "string" ? reader.result : "" },
        });
      };
      reader.onerror = () => {
        dispatch({ type: "SET_BUSY_STATE", payload: "idle" });
        dispatch({ type: "SET_ERROR", payload: "Unable to read this image file." });
      };
      reader.readAsDataURL(file);
    },
    [dispatch],
  );

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0 && fileRejections[0].file) {
        processFile(fileRejections[0].file);
        return;
      }

      if (acceptedFiles.length > 0) {
        processFile(acceptedFiles[0]);
      }
    },
    [processFile],
  );

  const dropzone = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    multiple: false,
    disabled: state.busyState === "uploading" || state.busyState === "exporting",
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 10 * 1024 * 1024,
  });

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onInputChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      processFile(file);
      event.target.value = "";
    },
    [processFile],
  );

  return useMemo(
    () => ({
      inputRef,
      openFileDialog,
      onInputChange,
      dropzone,
    }),
    [dropzone, onInputChange, openFileDialog],
  );
}
