import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

// 定义不需要添加语言前缀的路径
const PUBLIC_FILE = /\.(.*)$/   // 匹配所有带后缀的文件

let locales = ['en', 'zh']
 
function getLocale(request: NextRequest) {
  // 获取请求头中的 "accept-language" 字段
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) {
    // 如果没有 "accept-language" 字段，返回默认语言
    return 'en';
  }
  // 将 "accept-language" 字段按逗号分隔，并提取语言代码
  const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0]);

  // 遍历支持的语言列表，找到第一个匹配的语言
  for (const locale of locales) {
    if (languages.includes(locale)) {
      return locale;
    }
  }
  // 如果没有匹配的语言，返回默认语言
  return 'en';
}
 
export function middleware(request: NextRequest) {
  // 如果是静态资源，直接返回，不做处理
  if (
    PUBLIC_FILE.test(request.nextUrl.pathname) ||    // 所有静态文件
    request.nextUrl.pathname.startsWith('/images/') ||
    request.nextUrl.pathname.startsWith('/fonts/') ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.includes('/api/')
  ) {
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // 排除静态文件和特定路径
    '/((?!api|_next|images|fonts|favicon.ico).*)',
  ]
}