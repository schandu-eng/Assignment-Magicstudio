import { useEffect, useMemo, useState } from "react";
import { clampRect } from "../utils/clampRect";

function isSameRect(a, b) {
  if (!a || !b) return false;

  return (
    Math.round(a.x) === Math.round(b.x) &&
    Math.round(a.y) === Math.round(b.y) &&
    Math.round(a.width) === Math.round(b.width) &&
    Math.round(a.height) === Math.round(b.height)
  );
}

export function useCropInteraction({ cropRect, imageRef, dispatch }) {
  const [aspectLocked, setAspectLocked] = useState(true);
  const [aspectOption, setAspectOption] = useState("3:4");

  const aspectValue = useMemo(() => {
    if (!aspectLocked) {
      return undefined;
    }

    const [w, h] = aspectOption.split(":").map(Number);
    return w / h;
  }, [aspectLocked, aspectOption]);

  const onCropChange = (nextCrop) => {
    if (!imageRef.current || !nextCrop.width || !nextCrop.height) {
      return;
    }

    const clamped = clampRect(nextCrop, imageRef.current.width, imageRef.current.height);
    dispatch({ type: "SET_CROP", payload: clamped });
  };

  useEffect(() => {
    if (!aspectLocked || !aspectValue || !cropRect || !imageRef.current) {
      return;
    }

    const { width: imageWidth, height: imageHeight } = imageRef.current;
    const currentCenterX = cropRect.x + cropRect.width / 2;
    const currentCenterY = cropRect.y + cropRect.height / 2;

    let nextWidth = cropRect.width;
    let nextHeight = nextWidth / aspectValue;

    if (nextHeight > imageHeight) {
      nextHeight = imageHeight;
      nextWidth = nextHeight * aspectValue;
    }

    if (nextWidth > imageWidth) {
      nextWidth = imageWidth;
      nextHeight = nextWidth / aspectValue;
    }

    const nextRect = clampRect(
      {
        unit: "px",
        x: currentCenterX - nextWidth / 2,
        y: currentCenterY - nextHeight / 2,
        width: nextWidth,
        height: nextHeight,
      },
      imageWidth,
      imageHeight,
    );

    if (!isSameRect(cropRect, nextRect)) {
      dispatch({ type: "SET_CROP", payload: nextRect });
    }
  }, [aspectLocked, aspectValue, cropRect, imageRef, dispatch]);

  return {
    aspectLocked,
    aspectOption,
    aspectValue,
    setAspectLocked,
    setAspectOption,
    onCropChange,
    resetToSuggestion: (cachedSuggestion) => {
      if (cachedSuggestion) {
        dispatch({ type: "SET_CROP", payload: cachedSuggestion });
      }
    },
  };
}
