import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const validRoles = new Set(['customer', 'provider', 'admin']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName || '').trim();
    const lastName = String(body.lastName || '').trim();
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const role = validRoles.has(String(body.role || 'customer')) ? String(body.role) : 'customer';

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ ok: false, error: 'Email and a password with at least 6 characters are required.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ ok: true, mode: 'sandbox', user: { email, role, full_name: fullName } });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    const { data: authUser, error: createUserError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role,
      },
    });

    if (createUserError) {
      return NextResponse.json({ ok: false, error: createUserError.message }, { status: 409 });
    }

    if (authUser.user) {
      const { error: profileError } = await supabase.from('profiles').upsert(
        {
          id: authUser.user.id,
          email,
          full_name: fullName,
          role,
        },
        { onConflict: 'id' },
      );

      if (profileError) {
        return NextResponse.json({ ok: false, error: profileError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true, user: { id: authUser.user?.id, email, role }, mode: 'supabase' });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Unable to create account.' }, { status: 500 });
  }
}
