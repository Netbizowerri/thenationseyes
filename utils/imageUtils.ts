const FIRESTORE_DOC_LIMIT_BYTES = 1_000_000; // 1MB
const MAX_BASE64_IMAGE_BYTES = 500_000; // 500KB — leave room for other fields
const COMPRESSION_MAX_DIMENSION = 1200;
const COMPRESSION_QUALITY = 0.75;

/**
 * Converts a File to a Base64 data URI string.
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses an image file using Canvas API.
 * Resizes to max dimension and applies JPEG quality reduction.
 * Returns a Base64 data URI string.
 */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      if (width > COMPRESSION_MAX_DIMENSION || height > COMPRESSION_MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height / width) * COMPRESSION_MAX_DIMENSION);
          width = COMPRESSION_MAX_DIMENSION;
        } else {
          width = Math.round((width / height) * COMPRESSION_MAX_DIMENSION);
          height = COMPRESSION_MAX_DIMENSION;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Try progressively lower quality if still too large
      let quality = COMPRESSION_QUALITY;
      let result = canvas.toDataURL('image/jpeg', quality);

      while (estimateBase64SizeBytes(result) > MAX_BASE64_IMAGE_BYTES && quality > 0.2) {
        quality -= 0.1;
        result = canvas.toDataURL('image/jpeg', quality);
      }

      resolve(result);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Estimates the byte size of a Base64 data URI string.
 */
export function estimateBase64SizeBytes(base64: string): number {
  // Remove the data URI prefix to get raw base64
  const raw = base64.split(',')[1] || base64;
  // Base64 encoding increases size by ~33%, so decoded size = (length * 3/4)
  return Math.round((raw.length * 3) / 4);
}

/**
 * Processes an image file: validates, compresses, converts to Base64.
 * Returns the Base64 data URI string.
 * Throws if the image cannot be compressed under the size limit.
 */
export async function processImageForUpload(file: File): Promise<string> {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid image type. Please upload a JPG, PNG, WebP, or GIF.');
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image is too large. Please upload a file smaller than 10MB.');
  }

  // For very small files (< 100KB), just convert directly without compression
  if (file.size < 100 * 1024) {
    const base64 = await fileToBase64(file);
    if (estimateBase64SizeBytes(base64) <= MAX_BASE64_IMAGE_BYTES) {
      return base64;
    }
  }

  const compressed = await compressImage(file);

  if (estimateBase64SizeBytes(compressed) > MAX_BASE64_IMAGE_BYTES) {
    throw new Error('Image could not be compressed enough. Please use a smaller image or paste an external URL.');
  }

  return compressed;
}

/**
 * Checks if a string is a Base64 data URI.
 */
export function isBase64Image(str: string): boolean {
  return str.startsWith('data:image/');
}

/**
 * Formats byte size for display.
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
