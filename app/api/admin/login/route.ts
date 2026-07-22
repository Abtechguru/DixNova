import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Configured Admin Credentials
    const ADMIN_USERNAME = 'dixnova@admin';
    const ADMIN_PASSWORD = 'dixnova';

    if (
      (username && username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase()) &&
      (password && password === ADMIN_PASSWORD)
    ) {
      const response = NextResponse.json({
        success: true,
        message: 'Admin authentication successful',
        user: {
          username: ADMIN_USERNAME,
          role: 'Super Administrator'
        }
      });

      // Set auth cookie
      response.cookies.set({
        name: 'dixnova_admin_session',
        value: 'authenticated_dixnova_admin_' + Date.now(),
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password. Use dixnova@admin / dixnova' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
