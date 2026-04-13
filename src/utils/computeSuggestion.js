export function computeSuggestion(imageWidth, imageHeight, aspectRatio = 3 / 4) {
  const targetWidth = imageWidth * 0.6;
  const maxHeightFromRatio = targetWidth / aspectRatio;
  const heightCap = imageHeight * 0.7;
  const targetHeight = Math.min(maxHeightFromRatio, heightCap);
  const finalWidth = targetHeight * aspectRatio;
  const x = (imageWidth - finalWidth) / 2;
  const y = imageHeight * 0.15;

  return {
    unit: "px",
    x: Math.max(0, Math.round(x)),
    y: Math.max(0, Math.round(y)),
    width: Math.round(finalWidth),
    height: Math.round(Math.min(targetHeight, imageHeight - y)),
  };
}
