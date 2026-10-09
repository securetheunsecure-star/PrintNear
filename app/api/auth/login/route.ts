import { NextResponse } from 'next/server';
import { printNearStore, validateLogin } from '@/lib/printnear-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Email and password are required.' }, { status: 400 });
    }

    const user = validateLogin(email, password);
    if (!user) {
      return NextResponse.json({ ok: false, error: 'Invalid email or password.' }, { status: 401 });
    }

    return NextResponse.json({ ok: true, user, redirectTo: user.role === 'provider' ? '/provider/dashboard' : '/customer/orders' });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to log in.' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, users: printNearStore.users });
}
