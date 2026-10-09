export function isPdfMimeType(mimeType?: string) {
  if (!mimeType) return false;

  const normalized = mimeType.toLowerCase();
  return normalized === 'application/pdf' || normalized === 'application/x-pdf';
}

export function isLikelyPdfSignature(bytes: Uint8Array) {
  if (bytes.length < 4) return false;
  return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
}

export function validatePdfFile(file: File) {
  const maxSizeBytes = 20 * 1024 * 1024;

  if (!isPdfMimeType(file.type)) {
    return { valid: false, error: 'Only PDF files are allowed.' };
  }

  if (file.size > maxSizeBytes) {
    return { valid: false, error: 'PDF must be 20 MB or smaller.' };
  }

  return { valid: true, error: null };
}

export function estimatePageCountFromPdfText(pdfText: string) {
  const matches = pdfText.match(/\/Type\s*\/Page\b/g) ?? [];
  return matches.length > 0 ? matches.length : 1;
}
