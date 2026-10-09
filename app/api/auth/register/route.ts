import { NextResponse } from 'next/server';
import { printNearStore, registerUser } from '@/lib/printnear-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = typeof body?.firstName === 'string' ? body.firstName.trim() : '';
    const lastName = typeof body?.lastName === 'string' ? body.lastName.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const role = typeof body?.role === 'string' ? body.role : 'customer';

    if (!firstName || !lastName || !email || password.length < 6) {
      return NextResponse.json({ ok: false, error: 'Please provide a valid name, email, and password (6+ characters).' }, { status: 400 });
    }

    const user = registerUser({ firstName, lastName, email, password, role });
    return NextResponse.json({ ok: true, user });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to create account.' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, users: printNearStore.users });
}
