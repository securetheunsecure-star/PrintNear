import { NextRequest, NextResponse } from 'next/server';
import { estimatePageCountFromPdfText, isLikelyPdfSignature, validatePdfFile } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'A PDF file is required.' }, { status: 400 });
    }

    const validation = validatePdfFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const rawBytes = new Uint8Array(await file.arrayBuffer());
    const leadingBytes = rawBytes.slice(0, Math.min(rawBytes.length, 4096));

    if (!isLikelyPdfSignature(leadingBytes)) {
      return NextResponse.json({ error: 'The uploaded file does not look like a valid PDF.' }, { status: 400 });
    }

    const pdfPreview = new TextDecoder('latin1').decode(leadingBytes);
    const pageCount = estimatePageCountFromPdfText(pdfPreview);

    return NextResponse.json({
      ok: true,
      fileName: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
      pageCount,
      uploadMessage: 'PDF accepted for secure validation and print count estimation.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to process upload.' }, { status: 500 });
  }
}
