import { NextRequest, NextResponse } from 'next/server';
import { validatePdfFile } from '@/lib/validators';
import { estimatePageCountFromPdfText } from '@/lib/validators';

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

    const bytes = new Uint8Array(await file.arrayBuffer());
    const sampleBytes = bytes.slice(0, Math.min(bytes.length, 4096));
    const pdfPreview = new TextDecoder('latin1').decode(sampleBytes);
    const pageCount = estimatePageCountFromPdfText(pdfPreview);

    return NextResponse.json({
      ok: true,
      fileName: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
      pageCount,
      uploadMessage: 'PDF accepted for server-side validation.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to process upload.' }, { status: 500 });
  }
}
