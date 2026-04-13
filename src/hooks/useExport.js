import { useCallback } from "react";
import { canvasExport } from "../utils/canvasExport";

export function useExport({ dispatch }) {
  return useCallback(
    async ({ imageRef, cropRect }) => {
      if (!imageRef.current || !cropRect) {
        dispatch({ type: "SET_ERROR", payload: "Create a crop before exporting." });
        return;
      }

      try {
        dispatch({ type: "SET_BUSY_STATE", payload: "exporting" });
        dispatch({ type: "SET_ERROR", payload: "" });
        const blob = await canvasExport(imageRef.current, cropRect);
        dispatch({ type: "SET_PREVIEW_BLOB", payload: blob });
        dispatch({ type: "SET_TOAST", payload: "Export complete. Download started." });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : "Export failed." });
      } finally {
        dispatch({ type: "SET_BUSY_STATE", payload: "ready" });
      }
    },
    [dispatch],
  );
}
