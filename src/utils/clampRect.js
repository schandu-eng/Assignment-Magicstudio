export function clampRect(rect, imageWidth, imageHeight) {
  if (!rect) return null;

  const width = Math.max(32, Math.min(rect.width, imageWidth));
  const height = Math.max(32, Math.min(rect.height, imageHeight));
  const x = Math.max(0, Math.min(rect.x, imageWidth - width));
  const y = Math.max(0, Math.min(rect.y, imageHeight - height));

  return {
    ...rect,
    unit: "px",
    width,
    height,
    x,
    y,
  };
}
