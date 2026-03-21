import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/verify-secret
 * Verifies the admin secret code against the server-side environment variable.
 */
export async function POST(request: NextRequest) {
  try {
    const { secretCode } = await request.json();

    if (!secretCode) {
      return NextResponse.json(
        { error: 'Secret code is required' },
        { status: 400 }
      );
    }

    const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'GRABIFY_ADMIN_2025';

    if (secretCode === ADMIN_SECRET_KEY) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid admin secret code' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Verify secret error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
