import { createContext, useContext, useMemo, useReducer } from "react";

const initialState = {
  imageFile: null,
  imageDataURL: "",
  cropRect: null,
  cachedSuggestion: null,
  editorVisible: false,
  busyState: "idle",
  previewBlob: null,
  error: "",
  toast: "",
};

const AppContext = createContext(null);

function appReducer(state, action) {
  switch (action.type) {
    case "SET_BUSY_STATE":
      return { ...state, busyState: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_TOAST":
      return { ...state, toast: action.payload };
    case "SET_IMAGE":
      return {
        ...state,
        imageFile: action.payload.file,
        imageDataURL: action.payload.dataURL,
        busyState: "ready",
        error: "",
        toast: "",
      };
    case "SHOW_EDITOR":
      return { ...state, editorVisible: true };
    case "SET_CROP":
      return { ...state, cropRect: action.payload };
    case "SET_CACHED_SUGGESTION":
      return {
        ...state,
        cachedSuggestion: action.payload,
        cropRect: action.payload,
      };
    case "SET_PREVIEW_BLOB":
      return { ...state, previewBlob: action.payload };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
