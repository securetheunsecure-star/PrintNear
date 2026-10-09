import { NextResponse } from 'next/server';
import { validatePdfFile, estimatePageCountFromPdfText } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'Please attach a PDF file.' }, { status: 400 });
    }

    const validation = validatePdfFile(file);
    if (!validation.valid) {
      return NextResponse.json({ ok: false, error: validation.error }, { status: 400 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const text = new TextDecoder('latin1').decode(bytes);
    const pageCount = estimatePageCountFromPdfText(text);

    return NextResponse.json({
      ok: true,
      fileName: file.name,
      pageCount,
      uploadMessage: 'PDF validated successfully. You can continue to checkout.',
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Upload failed.' }, { status: 400 });
  }
}
