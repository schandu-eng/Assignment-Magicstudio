export async function canvasExport(imageElement, cropRect, fileName = "autocrop-result.jpg") {
  if (!imageElement || !cropRect) {
    throw new Error("Image and crop data are required for export.");
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is unavailable.");
  }

  const scaleX = imageElement.naturalWidth / imageElement.width;
  const scaleY = imageElement.naturalHeight / imageElement.height;

  const sourceX = cropRect.x * scaleX;
  const sourceY = cropRect.y * scaleY;
  const sourceWidth = cropRect.width * scaleX;
  const sourceHeight = cropRect.height * scaleY;

  canvas.width = Math.max(1, Math.floor(sourceWidth));
  canvas.height = Math.max(1, Math.floor(sourceHeight));

  ctx.drawImage(
    imageElement,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", 0.95);
  });

  if (!blob) {
    throw new Error("Unable to generate export image.");
  }

  const blobURL = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = blobURL;
  anchor.download = fileName;
  anchor.click();

  setTimeout(() => URL.revokeObjectURL(blobURL), 1000);

  return blob;
}
