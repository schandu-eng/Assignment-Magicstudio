const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

export function validateFile(file) {
  if (!file) {
    return {
      ok: false,
      code: "NO_FILE",
      message: "Please choose an image file.",
    };
  }

  if (!SUPPORTED_TYPES.includes(file.type)) {
    return {
      ok: false,
      code: "INVALID_TYPE",
      message: "Only JPEG, PNG, and WebP files are supported.",
    };
  }

  if (file.size > MAX_BYTES) {
    return {
      ok: false,
      code: "FILE_TOO_LARGE",
      message: "File size must be 10 MB or less.",
    };
  }

  return { ok: true };
}
