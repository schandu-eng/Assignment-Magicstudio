import { useEffect } from "react";
import { computeSuggestion } from "../utils/computeSuggestion";

export function useCropSuggestion({ imageRef, editorVisible, cachedSuggestion, dispatch }) {
  useEffect(() => {
    if (!editorVisible || cachedSuggestion || !imageRef.current) {
      return;
    }

    const image = imageRef.current;

    const setSuggestion = () => {
      const suggestion = computeSuggestion(image.width, image.height);
      dispatch({ type: "SET_CACHED_SUGGESTION", payload: suggestion });
    };

    if (image.complete) {
      setSuggestion();
    } else {
      image.addEventListener("load", setSuggestion, { once: true });
      return () => image.removeEventListener("load", setSuggestion);
    }
  }, [editorVisible, cachedSuggestion, imageRef, dispatch]);
}
