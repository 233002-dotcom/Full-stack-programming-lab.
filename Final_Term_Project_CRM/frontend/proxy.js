import { NextResponse } from 'next/server';

const protectedPaths = ['/dashboard', '/customers', '/invoices'];
const authPaths = ['/login', '/register'];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('crm_token')?.value;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
