import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // 💥 زدنا هنا |logos|posters فـ القائمة باش الـ Middleware ما يقيسش تصاور السلايدرات نهائياً 💥
    '/((?!api|_next/static|_next/image|images|logos|posters|payment-icons|videos|favicon.ico|all-devices.webp|Interface-VF.svg).*)',
  ],
};