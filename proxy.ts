import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en']; // الـ لـغـات ديـالـك بـالـظَّـبـط
const defaultLocale = 'fr';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ⚡ شـرْط سِّـحـري بـاش الـ Localhost مـا يـقـيـسـش مـلـفّـات الـ كـاش د الـ دِيـفـلـوپـمـنـت
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('.') || 
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // واش الـ مـسـار فـيـه ديـجـا الـ لـغـة؟
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // إيـلا مـا كـانـتـش الـ لـغـة، كـايـدِيـر تـوجـيـه لـ الـ لـغـة الـإفـتـراضـيـة
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // كـايـطـبّـق عـلـى كـاع الـ مـسـارات بـاش يـقـبـط الـ تَّـوجـيـه نـيـشـان
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};